async function hash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const TARGET_HASH = "15b6ab82118416157d8bb383936b9389a56b51fc1918db858ec68630ba43218c";

document.getElementById('go').addEventListener('click', async () => {
  const input = document.getElementById('guess').value.trim().toLowerCase();
  const status = document.getElementById('status');

  const hashed = await hash(input);

  if (hashed === TARGET_HASH) {
    window.location.href = 'archive.html';
  } else {
    status.textContent = 'no route found.';
  }
});