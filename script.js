/* ===================================
   VRUSHKET MORE - PORTFOLIO SCRIPTS
   Interactive Features & Animations
   =================================== */

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    initNeuralNetwork();
    initTypingEffect();
    initNavbar();
    initScrollAnimations();
    initProjectFilters();
    initSkillBars();
    initCounterAnimation();
    initCursorTrail();
    initMagneticButtons();
    initMobileMenu();
});

// ===== Neural Network Animation =====
function initNeuralNetwork() {
    const canvas = document.getElementById('neural-network');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    // Resize handler
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            // Mouse interaction
            if (mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let forceX = dx / distance;
                    let forceY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    
                    this.x -= forceX * force * 2;
                    this.y -= forceY * force * 2;
                }
            }
            
            // Floating animation
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
    }
    
    function initParticles() {
        particles = [];
        const numParticles = Math.min((canvas.width * canvas.height) / 15000, 150);
        
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        const maxDistance = 120;
        
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    let opacity = 1 - (distance / maxDistance);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Initialize
    resizeCanvas();
    animate();
}

// ===== Typing Effect =====
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const roles = [
        'Machine Learning Engineer',
        'Data Scientist',
        'AI Researcher',
        'Business Intelligence Pro',
        'GenAI Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .project-card, .timeline-item, ' +
        '.skill-category, .publication-card, .chatbot-card, .contact-card, .social-btn'
    );
    
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// ===== Project Filters =====
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ===== Skill Bars Animation =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                bar.style.setProperty('--skill-width', width + '%');
                bar.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== Cursor Trail Effect =====
function initCursorTrail() {
    const cursor = document.querySelector('.cursor-trail');
    if (!cursor || window.innerWidth < 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const speed = 0.15;
        
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== Magnetic Buttons =====
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        });
    });
}

// ===== Parallax Effect (Optional Enhancement) =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Easter Egg =====
console.log(`
%c
╔══════════════════════════════════════════╗
║                                          ║
║      👋 Hey there, curious one!          ║
║                                          ║
║   Looking for the code behind this?      ║
║   I love developers who explore!         ║
║                                          ║
║   Let's connect:                         ║
║   📧 vmore2@binghamton.edu               ║
║   💼 linkedin.com/in/vrushketmore        ║
║                                          ║
╚══════════════════════════════════════════╝
`, 'color: #00d4ff; font-size: 12px; font-family: monospace;');

// Power BI Modal Functions
function openPowerBIModal() {
    document.getElementById('powerbiModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePowerBIModal() {
    document.getElementById('powerbiModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePowerBIModal();
    }
});

// Floating Chatbot Widget
function toggleChatbot() {
    const widget = document.getElementById('chatbotWidget');
    widget.classList.toggle('open');
}

// Close chatbot when clicking outside
document.addEventListener('click', (e) => {
    const widget = document.getElementById('chatbotWidget');
    if (widget && widget.classList.contains('open')) {
        if (!widget.contains(e.target)) {
            widget.classList.remove('open');
        }
    }
});

// Close chatbot on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const widget = document.getElementById('chatbotWidget');
        if (widget) {
            widget.classList.remove('open');
        }
    }
});
