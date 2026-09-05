const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.desktop-nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('mobile-open');
  });
}

// ArikCharge enquiry form: submit without leaving the page and show a success popup.
const enquiryForm = document.getElementById('enquiryForm');
const successModal = document.getElementById('successModal');
const closeSuccess = () => { if (successModal) { successModal.hidden = true; document.body.classList.remove('modal-open'); } };
if (successModal) { successModal.querySelectorAll('[data-close-success]').forEach(el => el.addEventListener('click', closeSuccess)); }
if (enquiryForm) {
  enquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = enquiryForm.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.disabled = true; button.textContent = 'Sending…';
    try {
      const response = await fetch(enquiryForm.action, {
        method: 'POST',
        body: new FormData(enquiryForm),
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      enquiryForm.reset();
      const params = new URLSearchParams(window.location.search);
      const type = params.get('enquiry');
      const select = document.getElementById('enquiryType');
      if (type && select) select.value = type;
      if (successModal) { successModal.hidden = false; document.body.classList.add('modal-open'); }
    } catch (error) {
      alert('We could not submit your enquiry right now. Please try again or contact us on WhatsApp.');
    } finally { button.disabled = false; button.textContent = original; }
  });
}

// Partner links preselect Partnership on the Contact page.
const params = new URLSearchParams(window.location.search);
const type = params.get('enquiry');
const select = document.getElementById('enquiryType');
if (type && select) select.value = type;
