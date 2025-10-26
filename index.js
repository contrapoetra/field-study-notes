content = document.getElementById('content');
content.style.display = 'none';

main = document.getElementById('main');
notes = document.getElementById('notes');
progresses = document.getElementById('progresses');

async function loadMarkdown(file) {
  const res = await fetch(file);
  const text = await res.text();
  document.getElementById('content').innerHTML += marked.parse(text);
}

for (let i = 0; i < notes.children.length; i++) {
  notes.children[i].addEventListener('click', async () => {
    let file = notes.children[i].dataset.file;
    await loadMarkdown(`./notes/${file}.md`);
    main.style.display = 'none';
    content.style.display = 'block';
  });
}

for (let i = 0; i < progresses.children.length; i++) {
  progresses.children[i].addEventListener('click', async () => {
    let file = progresses.children[i].dataset.file;
    main.style.display = 'none';
    const res = await fetch(`./progresses/${file}.html`);
    content.innerHTML += await res.text();
    main.style.display = 'none';
    content.style.display = 'block';
  });
}

content.addEventListener('click', (e) => {
  if (e.target.id === 'content-back') {
    main.style.display = 'block';
    content.style.display = 'none';
    content.innerHTML = '<div id="content-back">back?</div>';
  }
});
