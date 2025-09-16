// Advanced Landing Page JavaScript with Next-Level Features
class AdvancedPortfolio {
  constructor() {
    this.init();
    this.initEventListeners();
    this.setupAdvancedFeatures();
  }

  init() {
  // Initialize all components (counter animation removed)
  this.initLoader();
  this.initCustomCursor();
  this.initParticles();
  this.initTypewriter();
  this.initDarkMode();
  this.initScrollAnimations();
  // this.initCounterAnimations(); // removed
  this.init3DTiltEffects();
  this.initMagneticButtons();
  this.initEasterEggs();
  this.initSmartFeatures();
  }

  // Loading Screen with Progress
  initLoader() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loader-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      progressBar.style.width = progress + '%';
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = 'auto';
          this.animateOnLoad();
        }, 500);
      }
    }, 100);
  }

  // Custom Cursor with Advanced Effects
  initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    });

    // Smooth trail animation
    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;
      trail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;
      requestAnimationFrame(animateTrail);
    };
    animateTrail();

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .skill-card, .stat-card, .profile-image');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursor.style.mixBlendMode = 'difference';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursor.style.mixBlendMode = 'normal';
      });
    });
  }

  // Enhanced Particles.js Configuration
  initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: window.innerWidth < 768 ? 50 : 80,
            density: { enable: true, value_area: 800 }
          },
          color: { value: "#00f5d4" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" }
          },
          opacity: {
            value: 0.5,
            random: true,
            animation: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 2, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00f5d4",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    }
  }

  // Advanced Typewriter Effect
  initTypewriter() {
    const taglineElement = document.getElementById('tagline');
    const phrases = [
      "Aspiring AI/ML Engineer",
      "Problem Solver",
      "Full-Stack Developer", 
      "Data Science Enthusiast",
      "Code Craftsman ⚡"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        taglineElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        taglineElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      setTimeout(typeWriter, typingSpeed);
    };

    typeWriter();
  }

  // Smart Dark Mode with Time Detection
  initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Smart auto-detection based on time
    const now = new Date();
    const hour = now.getHours();
    const shouldBeDark = hour >= 18 || hour <= 6; // 6 PM to 6 AM
    
    // Load saved preference or use time-based default
    const savedMode = localStorage.getItem('darkMode');
    const isDark = savedMode ? savedMode === 'true' : shouldBeDark;
    
    if (!isDark) {
      body.classList.add('light-mode');
    }

    // Toggle functionality with smooth transition
    toggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLightMode = body.classList.contains('light-mode');
      localStorage.setItem('darkMode', !isLightMode);
      
      // Add ripple effect to toggle button
      this.createButtonRipple(toggle, event);
      
      // Refresh particles color for new theme
      setTimeout(() => this.initParticles(), 300);
    });
  }

  // Scroll-Triggered Animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Animate skill level bars
          if (entry.target.classList.contains('skill-card')) {
            const levelBar = entry.target.querySelector('.level-bar');
            const level = levelBar.dataset.level;
            setTimeout(() => {
              levelBar.style.width = level + '%';
            }, 500);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-card, .stat-card, .section-header');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Counter animation removed for static stats UI

  // 3D Tilt Effects for Cards
  init3DTiltEffects() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // Magnetic Button Effects
  initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px) scale(1)';
      });

      // Ripple effect on click
      btn.addEventListener('click', (e) => {
        this.createButtonRipple(btn, e);
      });
    });
  }

  // Button Ripple Effect
  createButtonRipple(button, event) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.className = 'btn-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Easter Eggs and Hidden Features
  initEasterEggs() {
    let clickCount = 0;
    let secretSequence = [];
    const targetSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    
    // Click easter egg on hero name
    const heroName = document.getElementById('heroName');
    heroName.addEventListener('click', () => {
      clickCount++;
      heroName.style.transform = `scale(${1 + clickCount * 0.05}) rotate(${clickCount * 2}deg)`;
      
      if (clickCount >= 5) {
        this.showEasterEgg();
        this.createCelebrationAnimation();
        clickCount = 0;
        setTimeout(() => {
          heroName.style.transform = 'scale(1) rotate(0deg)';
        }, 2000);
      }
    });

    // Konami code easter egg
    document.addEventListener('keydown', (e) => {
      secretSequence.push(e.key);
      if (secretSequence.length > targetSequence.length) {
        secretSequence.shift();
      }
      
      if (JSON.stringify(secretSequence) === JSON.stringify(targetSequence)) {
        this.showEasterEgg('🎮 Konami Code Activated!', 'You know the classics! Here\'s a special message for true gamers.');
        this.createAdvancedCelebration();
        secretSequence = [];
      }
    });

    // Secret typing easter egg
    let typedText = '';
    document.addEventListener('keypress', (e) => {
      typedText += e.key.toLowerCase();
      if (typedText.includes('sathwik')) {
        this.showEasterEgg('🚀 Developer Mode!', 'You found the secret command! Sathwik appreciates your curiosity.');
        this.createCelebrationAnimation();
        typedText = '';
      }
      if (typedText.length > 20) {
        typedText = typedText.slice(-10);
      }
    });
  }

  // Show Easter Egg Modal
  showEasterEgg(title = '🎉 Secret Unlocked!', message = 'You discovered the hidden feature! You have the curiosity of a true developer.') {
    const modal = document.getElementById('easterEggModal');
    modal.querySelector('h3').textContent = title;
    modal.querySelector('p').textContent = message;
    modal.classList.add('show');
  }

  // Close Easter Egg Modal
  closeEasterEgg() {
    document.getElementById('easterEggModal').classList.remove('show');
  }

  // Celebration Animation
  createCelebrationAnimation() {
    const container = document.getElementById('celebrationContainer');
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
      particle.style.animationDelay = Math.random() * 0.5 + 's';
      
      container.appendChild(particle);
      
      // Animate particle
      particle.animate([
        { transform: 'translateY(100vh) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(-100px) rotate(720deg)', opacity: 0 }
      ], {
        duration: 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      setTimeout(() => particle.remove(), 2000);
    }
  }

  // Advanced Celebration for Konami Code
  createAdvancedCelebration() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = Math.random() * 15 + 5 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.left = '50vw';
      particle.style.top = '50vh';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      
      document.body.appendChild(particle);
      
      const angle = (i / 100) * 2 * Math.PI;
      const velocity = Math.random() * 300 + 100;
      
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { 
          transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, 
          opacity: 0 
        }
      ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      setTimeout(() => particle.remove(), 1500);
    }
  }

  // Smart Features
  initSmartFeatures() {
    // Performance monitoring
    this.monitorPerformance();
    
    // Battery status (if supported)
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          // Reduce animations for low battery
          document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }
      });
    }
    
    // Network speed detection
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        // Disable heavy animations for slow connections
        this.reduceAnimations();
      }
    }
  }

  // Performance Monitoring
  monitorPerformance() {
    let lastTime = performance.now();
    let fps = 60;
    
    const checkFPS = () => {
      const currentTime = performance.now();
      fps = 1000 / (currentTime - lastTime);
      lastTime = currentTime;
      
      // If FPS drops below 30, reduce animations
      if (fps < 30) {
        this.reduceAnimations();
      }
      
      requestAnimationFrame(checkFPS);
    };
    
    requestAnimationFrame(checkFPS);
  }

  // Reduce Animations for Performance
  reduceAnimations() {
    document.documentElement.style.setProperty('--smooth-transition', 'all 0.1s ease');
    document.documentElement.style.setProperty('--spring-transition', 'all 0.2s ease');
    
    // Disable particles on low-end devices
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      particlesContainer.style.opacity = '0.3';
    }
  }

  // Animation on Load
  animateOnLoad() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }, index * 200);
    });
  }

  // Event Listeners Setup
  initEventListeners() {
    // Close modal on outside click
    document.getElementById('easterEggModal').addEventListener('click', (e) => {
      if (e.target.classList.contains('easter-egg-modal')) {
        this.closeEasterEgg();
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      // Reinitialize particles with new dimensions
      if (typeof particlesJS !== 'undefined') {
        setTimeout(() => this.initParticles(), 100);
      }
    });

    // Visibility change handler (pause animations when tab is not active)
    document.addEventListener('visibilitychange', () => {
      const particles = document.getElementById('particles-js');
      if (particles) {
        particles.style.animationPlayState = document.hidden ? 'paused' : 'running';
      }
    });
  }

  // Expose closeEasterEgg method globally
  setupGlobalMethods() {
    window.closeEasterEgg = () => this.closeEasterEgg();
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new AdvancedPortfolio();
  portfolio.setupGlobalMethods();
});

// Prevent right-click context menu (optional security feature)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// Console Easter Egg
console.log(`
🚀 Welcome to Sathwik's Portfolio!
═══════════════════════════════════════

Thanks for checking the console! 
Here are some hidden features to try:

1. Click on my name 5 times
2. Try the Konami Code: ↑↑↓↓←→←→
3. Type "sathwik" anywhere on the page

Made with ❤️ for Data Vedhi Club
Contact: sathwik@example.com
`);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}