// Enhanced JavaScript for GazeGuard Landing Page

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initScrollEffects();
  initAnimations();
  initInteractions();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  // Mobile menu toggle
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    mobileNav.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close mobile menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });
}

// Smooth scrolling for anchor links
function initScrollEffects() {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Parallax effect for hero background
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Update floating icons based on scroll
    const floatingIcons = document.querySelectorAll(".floating-icon");
    floatingIcons.forEach((icon, index) => {
      const speed = 0.3 + index * 0.1;
      icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Intersection Observer for animations
function initAnimations() {
  // Create intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Add staggered animation for grid items
        if (
          entry.target.classList.contains("features-grid") ||
          entry.target.classList.contains("steps-container") ||
          entry.target.classList.contains("benefits-grid")
        ) {
          const items = entry.target.children;
          Array.from(items).forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("animate");
            }, index * 150);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all sections and grid containers
  document
    .querySelectorAll(
      "section, .features-grid, .steps-container, .benefits-grid"
    )
    .forEach((section) => {
      observer.observe(section);
    });

  // Animate hero elements on load
  setTimeout(() => {
    const heroElements = document.querySelectorAll(
      ".hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-stats"
    );
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate");
      }, index * 200);
    });
  }, 300);
}

// Interactive elements
function initInteractions() {
  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn, .download-btn, .download-button"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      createRipple(e, this);
    });
  });

  // Demo GIF interaction
  const demoContainer = document.querySelector(".demo-container");
  if (demoContainer) {
    demoContainer.addEventListener("click", function () {
      const gif = this.querySelector(".demo-gif");
      const overlay = this.querySelector(".demo-overlay");

      // Toggle play/pause effect (visual feedback)
      overlay.style.opacity = "1";
      setTimeout(() => {
        overlay.style.opacity = "0";
      }, 300);

      // Add a subtle scale animation
      gif.style.transform = "scale(1.02)";
      setTimeout(() => {
        gif.style.transform = "scale(1)";
      }, 200);
    });
  }

  // Add typing effect to hero title
  typeWriter();

  // Counter animation for stats
  animateCounters();

  // Add parallax effect to orbs
  initParallaxOrbs();
}

// Ripple effect function
function createRipple(event, element) {
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(255, 255, 255, 0.3)";
  ripple.style.transform = "scale(0)";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.pointerEvents = "none";
  ripple.style.animation = "ripple-animation 0.6s ease-out";

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    .animate {
        opacity: 0;
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title
function typeWriter() {
  const titleElement = document.querySelector(".hero-title");
  if (!titleElement) return;

  const text = titleElement.textContent;
  titleElement.textContent = "";
  titleElement.style.opacity = "1";

  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      titleElement.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, 50);
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;

        // Extract number if it exists
        const number = parseInt(text.replace(/\D/g, ""));
        if (!isNaN(number)) {
          animateCounter(target, 0, number, text);
        }

        observer.unobserve(target);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, start, end, originalText) {
  const duration = 2000;
  const increment = end / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = originalText;
      clearInterval(timer);
    } else {
      // Format based on original text
      if (originalText.includes("K+")) {
        element.textContent = Math.floor(current / 1000) + "K+";
      } else if (originalText.includes("★")) {
        element.textContent = (current / 1000).toFixed(1) + "★";
      } else {
        element.textContent = Math.floor(current);
      }
    }
  }, 16);
}

// Parallax effect for background orbs
function initParallaxOrbs() {
  const orbs = document.querySelectorAll(".gradient-orb");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    orbs.forEach((orb, index) => {
      const speed = 0.2 + index * 0.1;
      const yPos = scrolled * speed;
      const rotation = scrolled * (0.1 + index * 0.05);

      orb.style.transform = `translate(-50%, -50%) translateY(${yPos}px) rotate(${rotation}deg)`;
    });
  });
}

// Form validation (if contact form is added later)
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      validateForm(this);
    });
  });
}

function validateForm(form) {
  const inputs = form.querySelectorAll("input, textarea, select");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      showError(input, "This field is required");
      isValid = false;
    } else {
      hideError(input);
    }

    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        showError(input, "Please enter a valid email address");
        isValid = false;
      }
    }
  });

  if (isValid) {
    // Form is valid, submit it
    submitForm(form);
  }
}

function showError(input, message) {
  hideError(input);

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "#ef4444";
  errorDiv.style.fontSize = "0.875rem";
  errorDiv.style.marginTop = "0.25rem";

  input.parentNode.insertBefore(errorDiv, input.nextSibling);
  input.style.borderColor = "#ef4444";
}

function hideError(input) {
  const errorMessage = input.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
  input.style.borderColor = "";
}

function submitForm(form) {
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Show success message
    showNotification("Message sent successfully!", "success");
    form.reset();

    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;

  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = "translateX(0)";
  });

  // Close functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      closeNotification(notification);
    });

  // Auto close after 5 seconds
  setTimeout(() => {
    closeNotification(notification);
  }, 5000);
}

function closeNotification(notification) {
  notification.style.transform = "translateX(100%)";
  setTimeout(() => {
    notification.remove();
  }, 300);
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);

        img.addEventListener("load", () => {
          img.classList.add("loaded");
        });
      }
    });
  });

  images.forEach((img) => {
    img.classList.add("lazy");
    imageObserver.observe(img);
  });
}

// Performance optimization
function initPerformanceOptimizations() {
  // Debounce scroll events
  let scrollTimer = null;
  const originalScrollHandler = window.onscroll;

  window.addEventListener("scroll", () => {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      if (originalScrollHandler) {
        originalScrollHandler();
      }
    }, 10);
  });

  // Preload critical resources
  const criticalResources = ["assets/logo.webp", "GazeGuard.gif"];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as =
      resource.endsWith(".webp") || resource.endsWith(".gif")
        ? "image"
        : "fetch";
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Keyboard navigation support
function initAccessibility() {
  // Add keyboard navigation for mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      menuToggle.click();
    }
  });

  // Focus management for mobile menu
  const mobileNav = document.querySelector(".mobile-nav");
  mobileNav.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menuToggle.click();
      menuToggle.focus();
    }
  });

  // Add focus indicators
  const focusableElements = document.querySelectorAll(
    "a, button, input, textarea, select, [tabindex]"
  );
  focusableElements.forEach((element) => {
    element.addEventListener("focus", () => {
      element.style.outline = "2px solid #667eea";
      element.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", () => {
      element.style.outline = "";
      element.style.outlineOffset = "";
    });
  });
}

// Theme detection and handling
function initThemeHandling() {
  // Check for system dark mode preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function handleThemeChange(e) {
    if (e.matches) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }

  // Listen for changes
  prefersDark.addEventListener("change", handleThemeChange);

  // Set initial theme
  handleThemeChange(prefersDark);
}

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);

  // Show user-friendly error message for critical failures
  if (e.error && e.error.message.includes("critical")) {
    showNotification("Something went wrong. Please refresh the page.", "error");
  }
});

// Analytics integration (placeholder)
function initAnalytics() {
  // Track important user interactions
  const trackableElements = document.querySelectorAll(
    ".download-btn, .primary-btn, .secondary-btn"
  );

  trackableElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      // Send analytics event
      if (typeof gtag !== "undefined") {
        gtag("event", "click", {
          event_category: "engagement",
          event_label: element.textContent.trim(),
        });
      }

      // Console log for development
      console.log("User interaction:", {
        element: element.tagName,
        text: element.textContent.trim(),
        href: element.href || null,
      });
    });
  });
}

// Service worker registration (for PWA features)
function initServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
}

// Initialize all features when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Core functionality
  initNavigation();
  initScrollEffects();
  initAnimations();
  initInteractions();

  // Enhanced features
  initLazyLoading();
  initPerformanceOptimizations();
  initAccessibility();
  initThemeHandling();
  initAnalytics();

  // Optional features (uncomment if needed)
  // initFormValidation();
  // initServiceWorker();

  // Show page is ready
  document.body.classList.add("page-loaded");

  console.log("GazeGuard landing page initialized successfully!");
});
