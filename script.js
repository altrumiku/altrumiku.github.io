const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
   link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      smoothScroll(target);
   });
});

function smoothScroll(target) {
   const targetPosition = target.offsetTop;
   const startPosition = window.pageYOffset;
   const distance = targetPosition - startPosition;
   const duration = 500; // milliseconds
   let start = null;

   function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
   }

   function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
   }

   requestAnimationFrame(animation);
}