(function () {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var count = document.getElementById('lb-count');
  var thumbs = [], idx = 0;

  function show() {
    var t = thumbs[idx];
    var im = t.querySelector('img');
    img.src = im.src;
    img.alt = im.alt;
    count.textContent = (idx + 1) + ' / ' + thumbs.length;
  }
  function open(btn) {
    thumbs = Array.prototype.slice.call(document.querySelectorAll('.thumb[data-cat="' + btn.dataset.cat + '"]'));
    idx = thumbs.indexOf(btn);
    show();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.hidden = true; img.src = ''; document.body.style.overflow = ''; }
  function step(d) { idx = (idx + d + thumbs.length) % thumbs.length; show(); }

  document.querySelectorAll('.thumb').forEach(function (b) {
    b.addEventListener('click', function () { open(b); });
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
