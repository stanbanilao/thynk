/* Thynkverse debt review CRM page: accessible mobile navigation only. */
(function(){
  'use strict';
  var button=document.getElementById('tvMenuButton');
  var menu=document.getElementById('tvMobileNav');
  if(!button||!menu)return;
  function setOpen(open){
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    menu.hidden=!open;
  }
  button.addEventListener('click',function(){
    setOpen(button.getAttribute('aria-expanded')!=='true');
  });
  menu.addEventListener('click',function(event){
    if(event.target.closest('a'))setOpen(false);
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'&&!menu.hidden){setOpen(false);button.focus();}
  });
  window.matchMedia('(min-width:1001px)').addEventListener('change',function(m){
    if(m.matches)setOpen(false);
  });
})();
