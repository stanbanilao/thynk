/* Qualified enquiry form: handoff via the site's existing WhatsApp/email channels.
   No PII is sent to analytics or a website backend. A lead is received only after
   the visitor presses Send in WhatsApp or their email app. */
(function(){
  'use strict';
  var form=document.getElementById('tvLeadForm');
  if(!form)return;
  var feedback=document.getElementById('tvLeadFeedback');
  var emailButton=document.getElementById('tvLeadEmail');
  var interestField=form.elements.namedItem('interest');
  var requested=new URLSearchParams(window.location.search).get('interest');
  if(requested&&interestField&&Array.from(interestField.options).some(function(option){return option.value===requested;})){
    interestField.value=requested;
  }
  var interestLabels={
    'debt-review':'Debt review automation and RPA',
    'rpa':'RPA and data capture',
    'crm':'CRM and workflow visibility',
    'ithynk-meta':'iThynk Meta (assisted flagging)',
    'documents':'Document workflows and status checking',
    'whatsapp':'WhatsApp workflow automation',
    'other':'Another business workflow'
  };
  function enquiry(){
    var d=new FormData(form);
    function value(name){return String(d.get(name)||'').trim().replace(/\s+/g,' ').slice(0,800);}
    var interest=value('interest');
    return [
      'Hello Thynkverse, I would like to discuss a workflow or automation demo.',
      '',
      'Company: '+value('company'),
      'Contact: '+value('contact'),
      'Role: '+value('role'),
      'Email: '+value('email'),
      'Phone: '+value('phone'),
      'Team size: '+value('teamSize'),
      'Interested in: '+(interestLabels[interest]||'General business automation'),
      'Existing tools: '+(value('tools')||'Not specified'),
      'Our challenge: '+value('challenge'),
      '',
      'Optional product updates: '+(d.has('marketing')?'Yes, I opted in':'No')
    ].join('\n');
  }
  function valid(){return form.reportValidity();}
  form.addEventListener('submit',function(event){
    event.preventDefault();
    if(!valid())return;
    feedback.textContent='WhatsApp will open with your enquiry. Review it and press Send in WhatsApp to contact us.';
    window.location.assign('https://wa.me/27826836364?text='+encodeURIComponent(enquiry()));
  });
  if(emailButton){
    emailButton.addEventListener('click',function(){
      if(!valid())return;
      feedback.textContent='Your email app will open with a draft. Press Send there to contact us.';
      window.location.href='mailto:stan@thynkverse.co.za?subject='+encodeURIComponent('Thynkverse workflow demo enquiry')+'&body='+encodeURIComponent(enquiry());
    });
  }
})();
