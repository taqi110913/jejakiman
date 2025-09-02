document.querySelectorAll('[include-html]').forEach(el => {
  const file = el.getAttribute('include-html');
  fetch(file)
    .then(res => res.text())
    .then(data => {
      el.innerHTML = data;
    });
});