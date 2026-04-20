function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeLine(text, speed = 30, isError = false, keepCursor = false, outputID = 'terminal-output') {
  let output = document.getElementById(outputID);
  const line = document.createElement('div');
  if (isError) line.classList.add('error');

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '█';

  output.appendChild(line);
  line.appendChild(cursor);

  for (let c of text) {
    cursor.insertAdjacentText('beforebegin', c);
    await delay(speed);
  }

  await delay(600);
  if (!keepCursor) cursor.remove();
}

window.addEventListener('DOMContentLoaded', () => {
  if (typeof runSequence === 'function') {
    let output = document.getElementById('terminal-output');
    runSequence();
  }
});