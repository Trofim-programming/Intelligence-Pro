// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const contactForm = document.getElementById("contactForm")
const loadingOverlay = document.getElementById("loadingOverlay")
const successModal = document.getElementById("successModal")

// Mobile Navigation
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.9)"
  } else {
    header.style.background = "rgba(0, 0, 0, 0.2)"
  }
})

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")

      // Animate counters when about section is visible
      if (entry.target.classList.contains("about")) {
        animateCounters()
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".feature-card, .service-card, .about, .contact").forEach((el) => {
  observer.observe(el)
})

// Contact form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Show loading overlay
  loadingOverlay.style.display = "flex"

  // Get form data
  const formData = new FormData(contactForm)
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  try {
    // Send data to Python backend
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      // Hide loading overlay
      loadingOverlay.style.display = "none"

      // Show success modal
      successModal.style.display = "block"

      // Reset form
      contactForm.reset()
    } else {
      throw new Error("Network response was not ok")
    }
  } catch (error) {
    console.error("Error:", error)

    // Hide loading overlay
    loadingOverlay.style.display = "none"

    // For demo purposes, show success modal anyway
    successModal.style.display = "block"
    contactForm.reset()
  }
})

// Utility functions
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  })
}

function showExamples() {
  document.getElementById("Work").scrollIntoView({
    behavior: "smooth"
  });
}

function closeModal() {
  successModal.style.display = "none"
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === successModal) {
    closeModal()
  }
})

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && successModal.style.display === "block") {
    closeModal()
  }
})

// Page load animations
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Add stagger animation to hero elements
  const heroElements = document.querySelectorAll(".hero-title, .hero-description, .hero-buttons")
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("fade-in-up")
    }, index * 200)
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Form validation
function validateForm() {
  const name = document.getElementById("name").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const email = document.getElementById("email").value.trim()
  const message = document.getElementById("message").value.trim()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/

  if (!name || name.length < 2) {
    showError("Пожалуйста, введите корректное имя")
    return false
  }

  if (!phone || !phoneRegex.test(phone)) {
    showError("Пожалуйста, введите корректный номер телефона")
    return false
  }

  if (!email || !emailRegex.test(email)) {
    showError("Пожалуйста, введите корректный email")
    return false
  }

  if (!message || message.length < 10) {
    showError("Пожалуйста, опишите ваш проект подробнее (минимум 10 символов)")
    return false
  }

  return true
}

function showError(message) {
  // Create and show error message
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `

  document.body.appendChild(errorDiv)

  setTimeout(() => {
    errorDiv.remove()
  }, 5000)
}

// Add CSS for error animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)

console.log("Intelligence Pro website loaded successfully!")

// Конфигурация API
const API_KEY = "io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6Ijg2NTAyY2Q1LTJiYjEtNGUwOS05NDE4LTgyMGY3NmU0MDNiNiIsImV4cCI6NDkwNDk1NTk5NX0.ewq1ZHcwRYnq35nUA4nKBpBpUhBZQ-EMnxsm1zcD4hyl7TGWhd70ikdQGKnCmMsdOWunAgHFDX3878pLpT2QJw";
const API_URL = "https://api.intelligence.io.solutions/api/v1/chat/completions";

// История сообщений для контекста
let messageHistory = [
    {
        role: "system",
        content: ""
    }
];

// Отправка сообщения
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Добавляем сообщение пользователя в чат и историю
    addMessage(message, 'user');
    messageHistory.push({
        role: "user",
        content: message
    });
    
    chatInput.value = '';
    
    // Показываем индикатор набора
    const typingMessage = addTypingIndicator();
    
    try {
        // Отправляем запрос к API нейросети
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "meta-llama/Llama-3.3-70B-Instruct",
                "messages": messageHistory
            })
        });
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Удаляем индикатор набора
        typingMessage.remove();
        
        if (data.choices && data.choices.length > 0) {
            let botResponse = data.choices[0].message.content;
            
            // Очищаем ответ от служебных тегов, если они есть
            if (botResponse.includes('</think>\n\n')) {
                botResponse = botResponse.split('</think>\n\n')[1];
            }
            
            // Добавляем ответ в чат и историю
            addMessage(botResponse.trim(), 'bot');
            messageHistory.push({
                role: "assistant",
                content: botResponse.trim()
            });
            
        } else {
            addMessage("Не удалось получить ответ от нейросети. Пожалуйста, попробуйте позже.", 'bot');
        }
        
    } catch (error) {
        typingMessage.remove();
        addMessage("Произошла ошибка при запросе к нейросети. Пожалуйста, попробуйте позже.", 'bot');
        console.error("Ошибка API:", error);
        
        // Фолбэк: если API не работает, используем локальные ответы
        const fallbackResponses = [
            "Я временно испытываю технические трудности. Вы можете задать вопрос позже или связаться с нами через контакты на сайте.",
            "В данный момент сервис недоступен. Пожалуйста, попробуйте позже.",
            "Извините, я не могу обработать ваш запрос прямо сейчас. Наши контакты: @Intelligence_Studio"
        ];
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        addMessage(randomResponse, 'bot');
    }
}