async function hash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const output = document.getElementById('terminal-output');

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function type(text, speed = 30) {
  for (let c of text) {
    output.textContent += c;
    await delay(speed);
  }
  output.textContent += "\n";
}

async function runSequence() {
  await type("> Displaying final clue...");
  await delay(500);

  await type("> Fetching...");
  await delay(600);

  await type("> Fetching...");
  await delay(800);

  // switch to error styling
  output.classList.add("error");

  await type("> Error: final clue commented out.");
  await type("> Clue inaccessible.");
}

runSequence();

document.getElementById('go').addEventListener('click', () => {
  const input = document.getElementById('guess').value.trim().toLowerCase();

  if (!input) return;

  const hashed = await hash(input);

  window.location.href = `${hashed}.html`;
});