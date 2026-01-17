// Mobile Menu Toggle
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Reviews Slider
class ReviewsSlider {
    constructor() {
        this.slider = document.getElementById('reviewsSlider');
        this.reviews = this.slider.querySelectorAll('.review');
        this.currentIndex = 0;
        this.dotsContainer = document.getElementById('reviewsDots');

        this.init();
    }

    init() {
        // Show first review
        this.showReview(0);

        // Create dots
        this.createDots();

        // Add button listeners
        document.getElementById('prevReview').addEventListener('click', () => this.prevReview());
        document.getElementById('nextReview').addEventListener('click', () => this.nextReview());

        // Auto-play
        this.startAutoPlay();
    }

    createDots() {
        this.reviews.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('review-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.showReview(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.review-dot');
    }

    showReview(index) {
        // Hide all reviews
        this.reviews.forEach(review => review.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Show current review
        this.reviews[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentIndex = index;
    }

    nextReview() {
        const nextIndex = (this.currentIndex + 1) % this.reviews.length;
        this.showReview(nextIndex);
    }

    prevReview() {
        const prevIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
        this.showReview(prevIndex);
    }

    startAutoPlay() {
        setInterval(() => this.nextReview(), 5000);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsSlider();
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name') || contactForm.querySelector('input[type="text"]').value,
        phone: formData.get('phone') || contactForm.querySelector('input[type="tel"]').value,
        email: formData.get('email') || contactForm.querySelector('input[type="email"]').value,
        message: formData.get('message') || contactForm.querySelector('textarea').value
    };

    // Here you would send the data to your server
    console.log('Form data:', data);

    // Show success message
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');

    // Reset form
    contactForm.reset();

    // Example: Send to server (uncomment and modify for your needs)
    /*
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        } else {
            alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
    */
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.service-card, .process-step, .review');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Button actions
const buttons = document.querySelectorAll('.btn--secondary');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerOffset = 80;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Primary button in hero
const heroButton = document.querySelector('.hero .btn--primary');
if (heroButton) {
    heroButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerOffset = 80;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Form validation
const formInputs = document.querySelectorAll('.form__input, .form__textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#fcb040';
    });
});

// Phone number formatting
const phoneInput = contactForm.querySelector('input[type="tel"]');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value[0] === '8' || value[0] === '7') {
                value = '7' + value.slice(1);
            }

            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.slice(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.slice(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.slice(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.slice(9, 11);
            }

            e.target.value = formatted;
        }
    });
}

console.log('Geodesy Landing Page loaded successfully!');
