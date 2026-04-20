async function hash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('go').addEventListener('click', async () => {
  const input = document.getElementById('guess').value.trim().toLowerCase();

  if (!input) return;

  const hashed = await hash(input);

  window.location.href = `${hashed}.html`;
});

document.getElementById('guess').addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    document.getElementById('go').click();
  }
});