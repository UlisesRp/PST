const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");

window.addEventListener("scroll", function() {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

menuToggle.addEventListener("click", function() {
  navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navLinks.querySelectorAll("a").forEach(function(link) {
  link.addEventListener("click", function() {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16
});

revealElements.forEach(function(element) {
  revealObserver.observe(element);
});

function animateCounter(counter) {
  const target = Number(counter.dataset.count || 0);
  const duration = 1100;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * target);

    if (target === 100) {
      counter.textContent = value + "%";
    } else {
      counter.textContent = value + "+";
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.6
});

counters.forEach(function(counter) {
  counterObserver.observe(counter);
});
