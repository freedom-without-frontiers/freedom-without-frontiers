const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
}
const form=document.getElementById('contact-form');
form?.addEventListener('submit', async e=>{
  e.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return;}

  const note=document.getElementById('form-note');
  const submit=form.querySelector('.form-submit');
  const originalText=submit?.textContent || 'SUBMIT';

  if(submit){ submit.disabled=true; submit.textContent='SENDING...'; }
  if(note) note.textContent='';

  try{
    const response=await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{'Accept':'application/json'}
    });

    if(response.ok){
      form.reset();
      if(note) note.textContent='Thank you! Your message has been sent successfully.';
    }else{
      const data=await response.json().catch(()=>({}));
      const message=data?.errors?.map(error=>error.message).join(', ');
      if(note) note.textContent=message || 'We could not send your message. Please try again.';
    }
  }catch(error){
    if(note) note.textContent='We could not send your message. Please try again.';
  }finally{
    if(submit){ submit.disabled=false; submit.textContent=originalText; }
  }
});
