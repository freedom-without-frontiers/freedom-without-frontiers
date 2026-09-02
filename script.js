const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const frequencyButtons = document.querySelectorAll('.donation-choice.frequency');
const amountButtons = document.querySelectorAll('.donation-choice.amount');
const donateButton = document.getElementById('donate-button');
const customWrap = document.querySelector('.custom-amount-wrap');
const customAmount = document.getElementById('custom-amount');
const donationNote = document.getElementById('donation-note');

let selectedFrequency = 'One time';
let selectedAmount = '10';

function updateDonateButton() {
  if (!donateButton) return;
  const amountText = selectedAmount === 'Other'
    ? (customAmount && customAmount.value ? `$${customAmount.value}` : 'CUSTOM AMOUNT')
    : `$${selectedAmount}`;

  donateButton.textContent = selectedFrequency === 'Monthly'
    ? `DONATE ${amountText} MONTHLY`
    : `DONATE ${amountText}`;
}

frequencyButtons.forEach(button => {
  button.addEventListener('click', () => {
    frequencyButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    selectedFrequency = button.dataset.frequency;
    updateDonateButton();
  });
});

amountButtons.forEach(button => {
  button.addEventListener('click', () => {
    amountButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    selectedAmount = button.dataset.amount;
    if (customWrap) customWrap.hidden = selectedAmount !== 'Other';
    if (selectedAmount === 'Other' && customAmount) customAmount.focus();
    updateDonateButton();
  });
});

if (customAmount) {
  customAmount.addEventListener('input', updateDonateButton);
}

if (donateButton) {
  donateButton.addEventListener('click', () => {
    if (donationNote) {
      donationNote.textContent = 'Donation checkout is not connected yet. We will connect your payment provider before moving the live domain.';
    }
  });
}

const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    if (formNote) {
      formNote.textContent = 'Your form is designed and ready. We still need to connect the delivery service before launch.';
    }
  });
}
