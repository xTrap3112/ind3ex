// Smooth scrolling animation for anchor links
const smoothScroll = function (target, duration) {
  const targetElement = document.querySelector(target);
  const targetPosition = targetElement.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = function (currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

// Smooth scroll when clicking on anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    const duration = 1000; // Set the duration of the scroll animation in milliseconds
    smoothScroll(target, duration);
  });
});

// Add active class to the navigation menu item corresponding to the current section
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (
      scrollPosition >= sectionTop - sectionHeight * 0.25 &&
      scrollPosition < sectionTop + sectionHeight - sectionHeight * 0.25
    ) {
      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach((link) => link.classList.remove('active'));
      const targetLink = document.querySelector(`nav a[href="#${section.id}"]`);
      targetLink.classList.add('active');
    }
  });
});