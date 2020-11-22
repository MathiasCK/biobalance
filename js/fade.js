// Make elemenst fade in and out
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  };
  
  function observerCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.replace('fadeOut', 'fadeIn');
      } else {
        if (entry.target.classList.contains('fadeIn')) {
            entry.target.classList.replace('fadeIn', 'fadeOut');
        }
      }
    });
  }
  
  const fadeElms = document.querySelectorAll('.fade');
  fadeElms.forEach((elm) => elm.classList.add('fadeOut'));
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  fadeElms.forEach((el) => observer.observe(el));
  