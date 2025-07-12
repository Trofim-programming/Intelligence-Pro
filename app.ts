// TypeScript interfaces and types for the Intelligence Pro website

interface ContactFormData {
  name: string
  phone: string
  email: string
  message: string
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

interface ServiceFeature {
  title: string
  description: string
  features: string[]
  icon: string
}

interface CompanyStats {
  projects: number
  experience: number
  support: number
  quality: number
}

class ContactFormHandler {
  private form: HTMLFormElement
  private loadingOverlay: HTMLElement
  private successModal: HTMLElement

  constructor(formId: string, loadingId: string, modalId: string) {
    this.form = document.getElementById(formId) as HTMLFormElement
    this.loadingOverlay = document.getElementById(loadingId) as HTMLElement
    this.successModal = document.getElementById(modalId) as HTMLElement

    this.init()
  }

  private init(): void {
    if (this.form) {
      this.form.addEventListener("submit", this.handleSubmit.bind(this))
    }
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault()

    const formData = this.getFormData()

    if (!this.validateFormData(formData)) {
      return
    }

    this.showLoading()

    try {
      const response = await this.submitForm(formData)

      if (response.success) {
        this.showSuccess()
        this.resetForm()
      } else {
        this.showError(response.message)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      this.showError("Произошла ошибка при отправке формы")
    } finally {
      this.hideLoading()
    }
  }

  private getFormData(): ContactFormData {
    const formData = new FormData(this.form)

    return {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }
  }

  private validateFormData(data: ContactFormData): boolean {
    const validators = {
      name: (value: string) => value.trim().length >= 2,
      phone: (value: string) => /^[+]?[1-9][\d]{0,15}$/.test(value.trim()),
      email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: (value: string) => value.trim().length >= 10,
    }

    const errors: string[] = []

    if (!validators.name(data.name)) {
      errors.push("Введите корректное имя (минимум 2 символа)")
    }

    if (!validators.phone(data.phone)) {
      errors.push("Введите корректный номер телефона")
    }

    if (!validators.email(data.email)) {
      errors.push("Введите корректный email адрес")
    }

    if (!validators.message(data.message)) {
      errors.push("Опишите проект подробнее (минимум 10 символов)")
    }

    if (errors.length > 0) {
      this.showValidationErrors(errors)
      return false
    }

    return true
  }

  private async submitForm(data: ContactFormData): Promise<ApiResponse> {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    return await response.json()
  }

  private showLoading(): void {
    if (this.loadingOverlay) {
      this.loadingOverlay.style.display = "flex"
    }
  }

  private hideLoading(): void {
    if (this.loadingOverlay) {
      this.loadingOverlay.style.display = "none"
    }
  }

  private showSuccess(): void {
    if (this.successModal) {
      this.successModal.style.display = "block"
    }
  }

  private showError(message: string): void {
    this.createNotification(message, "error")
  }

  private showValidationErrors(errors: string[]): void {
    errors.forEach((error) => {
      this.createNotification(error, "error")
    })
  }

  private createNotification(message: string, type: "success" | "error"): void {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    const styles = {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "3000",
      animation: "slideInRight 0.3s ease",
      maxWidth: "400px",
      wordWrap: "break-word",
    }

    const colors = {
      success: "#10b981",
      error: "#ef4444",
    }

    Object.assign(notification.style, styles, {
      backgroundColor: colors[type],
    })

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }, 5000)
  }

  private resetForm(): void {
    this.form.reset()
  }
}

class AnimationController {
  private observers: IntersectionObserver[] = []

  constructor() {
    this.initScrollAnimations()
    this.initCounterAnimations()
    this.initParallaxEffects()
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    document.querySelectorAll(".feature-card, .service-card, .about-feature").forEach((el) => observer.observe(el))

    this.observers.push(observer)
  }

  private initCounterAnimations(): void {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounters()
            counterObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    const aboutSection = document.querySelector(".about")
    if (aboutSection) {
      counterObserver.observe(aboutSection)
    }

    this.observers.push(counterObserver)
  }

  private animateCounters(): void {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target") || "0")
      const duration = 2000 // 2 seconds
      const increment = target / (duration / 16) // 60fps
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current).toString()
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target.toString()
        }
      }

      updateCounter()
    })
  }

  private initParallaxEffects(): void {
    let ticking = false

    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector(".hero") as HTMLElement

      if (hero) {
        const rate = scrolled * -0.3
        hero.style.transform = `translateY(${rate}px)`
      }

      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    })
  }

  public destroy(): void {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers = []
  }
}

class NavigationController {
  private hamburger: HTMLElement
  private navMenu: HTMLElement
  private header: HTMLElement

  constructor() {
    this.hamburger = document.getElementById("hamburger") as HTMLElement
    this.navMenu = document.getElementById("navMenu") as HTMLElement
    this.header = document.querySelector(".header") as HTMLElement

    this.init()
  }

  private init(): void {
    this.initMobileMenu()
    this.initSmoothScrolling()
    this.initHeaderScroll()
  }

  private initMobileMenu(): void {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", () => {
        this.navMenu.classList.toggle("active")
        this.hamburger.classList.toggle("active")
      })

      // Close menu when clicking on links
      this.navMenu.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          this.navMenu.classList.remove("active")
          this.hamburger.classList.remove("active")
        })
      })
    }
  }

  private initSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const href = anchor.getAttribute("href")
        if (href) {
          const target = document.querySelector(href)
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      })
    })
  }

  private initHeaderScroll(): void {
    let ticking = false

    const updateHeader = () => {
      if (this.header) {
        const scrollY = window.scrollY
        const opacity = scrollY > 100 ? 0.95 : 0.2
        this.header.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`
      }
      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader)
        ticking = true
      }
    })
  }
}

// Initialize application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize controllers
  const contactForm = new ContactFormHandler("contactForm", "loadingOverlay", "successModal")
  const animations = new AnimationController()
  const navigation = new NavigationController()

  // Global utility functions
  ;(window as any).scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }
  ;(window as any).showExamples = () => {
    alert("Раздел с примерами в разработке. Свяжитесь с нами для получения портфолио!")
  }
  ;(window as any).closeModal = () => {
    const modal = document.getElementById("successModal")
    if (modal) {
      modal.style.display = "none"
    }
  }

  console.log("Intelligence Pro TypeScript application initialized successfully!")
})

// Export types for use in other modules
export {
  type ContactFormData,
  type ApiResponse,
  type ServiceFeature,
  type CompanyStats,
  ContactFormHandler,
  AnimationController,
  NavigationController,
}
