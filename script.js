// Dark mode: auto-detect and toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  darkModeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function getPreferredTheme() {
  return localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

darkModeToggle.addEventListener('click', toggleTheme);

// Set initial theme
setTheme(getPreferredTheme());

// Listen for system theme changes
prefersDark.addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Enhanced Parallax effect
document.addEventListener('DOMContentLoaded', () => {
  // Parallax for sections
  const parallaxElements = document.querySelectorAll('.parallax-section');
  
  // Parallax for text elements
  const parallaxText = document.querySelectorAll('.project-title, .project-category, h2, h3, p');
  
  // Parallax for images
  const parallaxImages = document.querySelectorAll('.project-image, .problem-image img, .solution-image img');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Section parallax
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Text parallax
    parallaxText.forEach(text => {
      const speed = 0.2;
      const yPos = -(scrolled * speed);
      const xPos = Math.sin(scrolled * 0.001) * 10; // Subtle horizontal movement
      text.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
    
    // Image parallax
    parallaxImages.forEach(image => {
      const speed = 0.3;
      const yPos = -(scrolled * speed);
      const scale = 1 + (scrolled * 0.0001); // Subtle scale effect
      image.style.transform = `translateY(${yPos}px) scale(${scale})`;
    });
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.project-card, .feature, .contact-content');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on index
        entry.target.style.animationDelay = `${index * 0.15}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });

  elements.forEach(element => {
    observer.observe(element);
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
} 