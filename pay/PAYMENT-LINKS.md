# Thynkverse Payment Link Architecture

Customer payment pages live under `/pay/` and are intentionally:

- not linked from the public website navigation
- excluded from search indexing
- excluded from the sitemap
- configured with `noindex,nofollow,noarchive`
- created per client/payment request with hard-coded PayFast values

## URL pattern

Use category + unique reference, not the amount:

- `/pay/website/TV-WEB-2609-A7K4/`
- `/pay/automation/TV-AUTO-2609-B3Q8/`
- `/pay/support/TV-SUP-2609-C9M2/`
- `/pay/subscription/TV-SUB-2609-D4P7/`
- `/pay/software/TV-SW-2609-E8R5/`

The reference should be unique and not easily guessable. Avoid putting confidential client details or the amount in the URL.

## Required page values

Each payment page must hard-code:

- client / project display name
- category
- amount
- once-off or subscription
- PayFast receiver
- item name
- item description
- recurring amount / frequency / cycles where applicable

Do not read the payment amount from query-string parameters because customers can alter them.

## Hidden does not mean authenticated

These links are unlisted and noindex, but anyone with the exact URL can open them.

For genuinely private or access-controlled payments, use a signed/authenticated payment-request service or client portal later.

## Existing examples

- `/pay/libra-legal/` — once-off Libra Legal payment
- `/pay/libra-legal/subscription/` — recurring Libra Legal subscription

When a new payment request is needed, create a new unique page instead of editing an old client link.
