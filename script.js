const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
}
const frequencyButtons=document.querySelectorAll('.donation-choice.frequency');
const amountButtons=document.querySelectorAll('.donation-choice.amount');
const donateButton=document.getElementById('donate-button');
const customWrap=document.querySelector('.custom-amount-wrap');
const customAmount=document.getElementById('custom-amount');
let selectedFrequency='One time';
let selectedAmount='10';
function updateDonate(){
  if(!donateButton)return;
  const amount=selectedAmount==='Other'?(customAmount?.value?`$${customAmount.value}`:'CUSTOM AMOUNT'):`$${selectedAmount}`;
  donateButton.textContent=selectedFrequency==='Monthly'?`DONATE ${amount} MONTHLY`:`DONATE ${amount}`;
}
frequencyButtons.forEach(btn=>btn.addEventListener('click',()=>{
  frequencyButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  selectedFrequency=btn.dataset.frequency;updateDonate();
}));
amountButtons.forEach(btn=>btn.addEventListener('click',()=>{
  amountButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  selectedAmount=btn.dataset.amount;if(customWrap)customWrap.hidden=selectedAmount!=='Other';updateDonate();
}));
customAmount?.addEventListener('input',updateDonate);
document.getElementById('donate-button')?.addEventListener('click',()=>{
  const note=document.getElementById('donation-note');
  if(note)note.textContent='Donation checkout is not connected yet. We will connect it before launch.';
});
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
