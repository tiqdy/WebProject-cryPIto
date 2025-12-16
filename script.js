// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Get started button scroll down
const getStartedBtn = document.getElementById('get-started-btn');
if (getStartedBtn) {
  getStartedBtn.addEventListener('click', () => {
    const target = document.getElementById('leading-cryptos');
    if (target) {
      const offset = 145;
      const topPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      });
    }
  });
}

// News Widget Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.news-slideshow .slide');
const dots = document.querySelectorAll('.slide-dots .dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i;
    showSlide(i);
  });
});

setInterval(nextSlide, 5000);

// Buy/Sell/Trade Button Notifications
function showNotification(message) {
  let existingNotif = document.getElementById('notification-toast');
  if (existingNotif) {
    existingNotif.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'notification-toast';
  toast.className = 'notification-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

document.querySelectorAll('.crypto-item').forEach(item => {
  const coinName = item.querySelector('.crypto-name')?.textContent || 'Crypto';
  const buttons = item.querySelectorAll('.action-buttons button');

  buttons[0]?.addEventListener('click', () => showNotification(`Successfully bought ${coinName}`));
  buttons[1]?.addEventListener('click', () => showNotification(`Successfully sold ${coinName}`));
  buttons[2]?.addEventListener('click', () => showNotification(`Successfully traded ${coinName}`));
});

// Register Form Validation 
document.addEventListener("DOMContentLoaded", () => {
  const signupButtonLi = document.querySelector(".signup-button");
  const logoutButtonLi = document.getElementById("logout-button-li");
  const logoutButton = document.getElementById("logout-button");

  function showUserName(name) {
    if (!signupButtonLi) return;

    signupButtonLi.innerHTML = `<span id="user-name" style="cursor:pointer;">${name}</span>`;

    if (logoutButtonLi) {
      logoutButtonLi.style.display = "block";
      logoutButton.style.display = "none"; 
    }

    const userNameSpan = document.getElementById("user-name");
    if (userNameSpan && logoutButtonLi) {
      userNameSpan.addEventListener("click", () => {
        logoutButton.style.display = logoutButton.style.display === "none" ? "block" : "none";
      });
    }
  }

 
  function showSignUp() {
    if (signupButtonLi) {
      signupButtonLi.innerHTML = `<button class="signup-button" onclick="location.href='register.html'">Sign Up</button>`;
    }
    if (logoutButtonLi) logoutButtonLi.style.display = "none";
  }

  const savedName = localStorage.getItem("userName");

  if (savedName) {
    showUserName(savedName);
  } else {
    showSignUp();
  }

  logoutButton?.addEventListener("click", () => {
    localStorage.removeItem("userName");
    showSignUp();
    alert("You have been logged out.");
  });


  const form = document.getElementById("register-form");
  if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const termsCheckbox = document.getElementById("terms");
    const registerButton = document.querySelector(".register-button");

    function createMessage(input) {
      if (
        input.nextElementSibling &&
        input.nextElementSibling.classList.contains("error-msg")
      ) {
        return input.nextElementSibling;
      }
      const msg = document.createElement("div");
      msg.className = "error-msg";
      input.insertAdjacentElement("afterend", msg);
      return msg;
    }

    const nameMsg = createMessage(nameInput);
    const emailMsg = createMessage(emailInput);
    const passwordMsg = createMessage(passwordInput);
    const confirmPasswordMsg = createMessage(confirmPasswordInput);

    let termsMsg = termsCheckbox.parentElement.querySelector(".error-msg");
    if (!termsMsg) {
      termsMsg = document.createElement("div");
      termsMsg.className = "error-msg";
      termsCheckbox.parentElement.appendChild(termsMsg);
    }

    let isValid = {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
      terms: false,
    };

    const validateForm = () => {
      registerButton.disabled = !Object.values(isValid).every(Boolean);
    };

    // Name validation
    nameInput?.addEventListener("input", () => {
      if (nameInput.value.trim().length < 5) {
        nameMsg.textContent = "Please enter at least 5 characters";
        isValid.name = false;
      } else {
        nameMsg.textContent = "";
        isValid.name = true;
      }
      validateForm();
    });

    // Email validation
    emailInput?.addEventListener("input", () => {
      if (!emailInput.value.includes("@")) {
        emailMsg.textContent = "Email must contain '@'";
        isValid.email = false;
      } else {
        emailMsg.textContent = "";
        isValid.email = true;
      }
      validateForm();
    });

    // Password validation
    passwordInput?.addEventListener("input", () => {
      const pwd = passwordInput.value;
      const hasMinLength = pwd.length >= 5;
      const matches = pwd.match(/[\d\W]/g) || [];
      const hasSymbolsOrNumbers = matches.length >= 2;

      if (!hasMinLength || !hasSymbolsOrNumbers) {
        passwordMsg.textContent =
          "Password must be at least 5 characters long and include at least 2 numbers or symbols";
        isValid.password = false;
      } else {
        passwordMsg.textContent = "";
        isValid.password = true;
      }
      validateForm();
    });

    // Confirm password validation
    confirmPasswordInput?.addEventListener("input", () => {
      if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordMsg.textContent = "Passwords do not match. Please re-enter.";
        isValid.confirmPassword = false;
      } else {
        confirmPasswordMsg.textContent = "";
        isValid.confirmPassword = true;
      }
      validateForm();
    });

    // Terms checkbox validation
    termsCheckbox?.addEventListener("change", () => {
      if (!termsCheckbox.checked) {
        termsMsg.textContent = "You are required to accept the terms and conditions.";
        isValid.terms = false;
      } else {
        termsMsg.textContent = "";
        isValid.terms = true;
      }
      validateForm();
    });

    if (registerButton) registerButton.disabled = true;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (Object.values(isValid).every(Boolean)) {
        const userName = nameInput.value.trim();
        localStorage.setItem("userName", userName);

        showUserName(userName);

        form.reset();

        Object.keys(isValid).forEach((key) => (isValid[key] = false));
        validateForm();

        alert("Registration successful!");
      }
    });
  }
});

// Learn Page FAQ
document.addEventListener('DOMContentLoaded', () => {

  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');

      const isHidden = answer.hasAttribute('hidden');

      if (isHidden) {
        // Show answer
        answer.removeAttribute('hidden');
        button.setAttribute('aria-expanded', 'true');
        faqItem.classList.add('active');
      } else {
        // Hide answer
        answer.setAttribute('hidden', '');
        button.setAttribute('aria-expanded', 'false');
        faqItem.classList.remove('active');
      }
    });
  });
});
