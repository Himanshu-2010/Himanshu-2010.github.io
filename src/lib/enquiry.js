import DATA from '../data/info.json';

const EMAIL = DATA.contact.email;

export function mailto(subject, body) {
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function orderWebsiteMailto(w) {
  mailto(
    `Website order: ${w.title}`,
    `Hi Himanshu,\n\nI'd like to order the "${w.title}" website (${w.price}).\n\nMy details:\n- Name:\n- Email:\n- Notes:\n`
  );
}

export function orderElectronicsMailto(p, electronicNote) {
  mailto(
    `Electronics order: ${p.title}`,
    `Hi Himanshu,\n\nI'd like to order the "${p.title}" (${p.price}).\n${electronicNote}\n\nMy details:\n- Name:\n- Email:\n- Shipping address:\n- Sending my own components? (yes/no):\n`
  );
}

export function enquiryMailto({ name, email, type, budget, message }) {
  const subject = `Project enquiry (${type}) — ${name || 'anonymous'}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Type: ${type}`,
    `Budget: ${budget || 'not specified'}`,
    '',
    message,
  ].join('\n');
  mailto(subject, body);
}
