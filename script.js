// Navbar functionality
const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("theme-toggle");

// Show/Hide mobile menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
}

// Close mobile menu when clicking on a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");

    // Remove active class from all links
    navLinks.forEach((link) => link.classList.remove("nav-link--active"));

    // Add active class to clicked link
    link.classList.add("nav-link--active");
  });
});

// Change header background on scroll
function scrollHeader() {
  if (window.scrollY >= 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", scrollHeader);

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Update icon
    const icon = themeToggle.querySelector("i");
    if (document.body.classList.contains("dark-theme")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}

// Course category filtering
const categoryButtons = document.querySelectorAll(".category-btn");
const courseCards = document.querySelectorAll(".course-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => {
      btn.classList.remove("category-btn--active");
    });

    // Add active class to clicked button
    button.classList.add("category-btn--active");

    const category = button.getAttribute("data-category");

    courseCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
// Lightweight toast system to replace alerts
const toastContainer = document.createElement("div");
toastContainer.className = "toast-container";
document.body.appendChild(toastContainer);

function showToast(message, opts = {}) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerText = message;
  toastContainer.appendChild(el);
  const duration = opts.duration || 4000;
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  }, duration);
  return el;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Contact form handling (non-blocking)
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      showToast("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    // Simulate async submit
    showToast("Sending message...");
    setTimeout(() => {
      showToast("Thank you! We'll get back to you soon.");
      contactForm.reset();
    }, 900);
  });
}

// Newsletter handling
const newsletterForm = document.querySelector(".newsletter-signup form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    if (email === "") {
      showToast("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("Subscribing...");
    setTimeout(() => {
      showToast("Thanks — you're subscribed!");
      newsletterForm.reset();
    }, 700);
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Animate counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const originalText = counter.innerText;
    // Special handling for "24/7"
    if (originalText === "24/7") {
      counter.innerText = "24/7";
      return;
    }
    const target = parseInt(originalText.replace(/[^\d]/g, ""));
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.innerText =
          target.toLocaleString() +
          (originalText.includes("+")
            ? "+"
            : originalText.includes("%")
            ? "%"
            : "");
        clearInterval(timer);
      } else {
        counter.innerText =
          Math.floor(count).toLocaleString() +
          (originalText.includes("+")
            ? "+"
            : originalText.includes("%")
            ? "%"
            : "");
      }
    }, 20);
  });
}

// Header scroll effect
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }

  lastScrollY = currentScrollY;
});

// Active navigation link on scroll
const sections = document.querySelectorAll("section[id]");

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("nav-link--active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("nav-link--active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Fade in animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      if (entry.target.classList.contains("stats")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe all sections for fade-in
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Mobile navigation toggle (if needed in future)

// Signup modal behavior
const ctaSignup = document.getElementById("cta-signup");
let modalBackdrop = null;
function createSignupModal() {
  modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal-backdrop";
  modalBackdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Signup">
      <h3>Start your 7-day free trial</h3>
      <p>Enter your email to create your account and access the full course library.</p>
      <form class="modal-signup-form">
        <input type="email" name="trial-email" placeholder="you@company.com" required class="form-input">
        <div class="modal-actions">
          <button type="button" class="btn btn--ghost modal-cancel">Cancel</button>
          <button type="submit" class="btn btn--primary">Create Account</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  // handle close on backdrop click
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  const cancelBtn = modalBackdrop.querySelector(".modal-cancel");
  cancelBtn.addEventListener("click", closeModal);

  const modalForm = modalBackdrop.querySelector(".modal-signup-form");
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = modalForm.querySelector('input[type="email"]').value.trim();
    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("Creating account...");
    setTimeout(() => {
      showToast("Welcome! Your trial has started.");
      closeModal();
    }, 900);
  });
}

function openModal() {
  if (!modalBackdrop) createSignupModal();
  modalBackdrop.classList.add("open");
  const input = modalBackdrop.querySelector('input[type="email"]');
  if (input) input.focus();
}

function closeModal() {
  if (modalBackdrop) modalBackdrop.classList.remove("open");
}

if (ctaSignup) {
  ctaSignup.addEventListener("click", openModal);
}
