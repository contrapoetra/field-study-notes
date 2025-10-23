content = document.getElementById('content');
content.style.display = 'none';

list = document.getElementById('list');

async function loadMarkdown(file) {
  const res = await fetch(file);
  const text = await res.text();
  document.getElementById('content').innerHTML = marked.parse(text);
}

// make sure you include marked.js
loadMarkdown('./notes/oct23.md');

for (let i = 0; i < list.children.length; i++) {
  list.children[i].addEventListener('click', async () => {
    let file = list.children[i].dataset.file;
    await loadMarkdown(`./notes/${file}.md`);
    list.style.display = 'none';
    content.style.display = 'block';
    console.log('Markdown loaded');
  });
}
