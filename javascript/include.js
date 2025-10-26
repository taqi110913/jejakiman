$(document).ready(function() {
  document.querySelectorAll('[include-html]').forEach(el => {
    const file = el.getAttribute('include-html');
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        // Dispatch an event so other scripts know an include finished loading
        try {
          const ev = new CustomEvent('includeLoaded', { detail: { file, element: el } });
          document.dispatchEvent(ev);
        } catch (e) {
          // older browsers: fallback to simple event
          const ev = document.createEvent('Event');
          ev.initEvent('includeLoaded', true, true);
          document.dispatchEvent(ev);
        }
      });
  });
});
