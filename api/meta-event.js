'use strict';

const DATASET_ID = '1855466265797087';
const GRAPH_API_VERSION = 'v24.0';

function parseCookies(cookieHeader) {
  return String(cookieHeader || '').split(';').reduce((cookies, part) => {
    const separator = part.indexOf('=');
    if (separator < 1) return cookies;
    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (key) cookies[key] = value;
    return cookies;
  }, {});
}

function firstForwardedIp(value) {
  return String(value || '').split(',')[0].trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({error: 'Method not allowed'});
  }

  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    return res.status(503).json({error: 'Meta Conversions API is not configured'});
  }

  const {eventName, eventId, sourceUrl} = req.body || {};
  if (eventName !== 'PageView' || typeof eventId !== 'string' ||
      !/^[A-Za-z0-9._:-]{8,128}$/.test(eventId) || typeof sourceUrl !== 'string') {
    return res.status(400).json({error: 'Invalid event'});
  }

  let source;
  try {
    source = new URL(sourceUrl);
  } catch {
    return res.status(400).json({error: 'Invalid source URL'});
  }

  const requestHost = String(req.headers.host || '').toLowerCase();
  if (source.protocol !== 'https:' || source.host.toLowerCase() !== requestHost) {
    return res.status(403).json({error: 'Source URL does not match this site'});
  }

  const cookies = parseCookies(req.headers.cookie);
  const userData = {
    client_ip_address: firstForwardedIp(req.headers['x-forwarded-for']) || req.socket?.remoteAddress,
    client_user_agent: req.headers['user-agent']
  };
  if (cookies._fbp) userData.fbp = cookies._fbp;
  if (cookies._fbc) userData.fbc = cookies._fbc;

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: source.href,
      action_source: 'website',
      user_data: userData
    }]
  };

  if (process.env.META_CAPI_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
  }

  const endpoint = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${DATASET_ID}/events`);
  endpoint.searchParams.set('access_token', accessToken);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Meta CAPI rejected event', {
        status: response.status,
        code: result?.error?.code,
        type: result?.error?.type
      });
      return res.status(502).json({error: 'Meta rejected the event'});
    }

    return res.status(200).json({
      accepted: true,
      eventsReceived: result.events_received ?? null,
      eventId
    });
  } catch (error) {
    console.error('Meta CAPI request failed', {name: error?.name});
    return res.status(502).json({error: 'Meta request failed'});
  }
};

module.exports.parseCookies = parseCookies;
module.exports.firstForwardedIp = firstForwardedIp;
