// ===== NAVEGACIÓN MÓVIL =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== FILTRO DE PORTAFOLIO =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterBtns.forEach(b => b.classList.remove('active'));
        // Agregar clase active al botón clickeado
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Construir mensaje para WhatsApp
        const mensaje = `¡Hola! Soy ${data.nombre}.

📧 Email: ${data.email}
🏢 Tipo de negocio: ${data.tipo}
💰 Presupuesto: ${data.presupuesto}

📝 Detalles del proyecto:
${data.contenido}

Me interesa una alianza comercial con Chelina HCL.`;

        // URL de WhatsApp con el número correcto
        const whatsappURL = `https://wa.me/584242095783?text=${encodeURIComponent(mensaje)}`;
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Te redirigiré a WhatsApp para completar la información.');
        
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Resetear formulario
        contactForm.reset();
    });
}

// ===== SCROLL SUAVE PARA NAVEGACIÓN =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar enlaces de WhatsApp y externos
        if (href.includes('wa.me') || href.includes('http')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CAMBIAR NAVBAR AL HACER SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'var(--color-white)';
        }
    }
});

// ===== ANIMACIÓN DE ENTRADA AL SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
}, observerOptions);

// Observar elementos para animar
const animatedElements = document.querySelectorAll(
    '.service-card, .pricing-card, .portfolio-item, .step, .feature, .comparison-box, .process-box'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== CONTADOR ANIMADO PARA ESTADÍSTICAS =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            if (isDecimal) {
                element.textContent = start.toFixed(1) + 'M';
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1) + 'M';
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    };
    
    updateCounter();
};

// Observer para contadores
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                
                // Detectar el formato del número
                if (text.includes('M')) {
                    const value = parseFloat(text);
                    animateCounter(stat, value, 2000);
                } else if (text.includes('K')) {
                    const value = parseInt(text.replace('K', '')) * 1000;
                    animateCounter(stat, value, 2000);
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 2100);
                } else if (text.includes('+')) {
                    const value = parseInt(text.replace('+', '').replace('.', ''));
                    animateCounter(stat, value, 2000);
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 2100);
                }
            });
            
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar secciones de estadísticas
const statsSections = document.querySelectorAll('.hero-stats, .stats-section');
statsSections.forEach(section => {
    counterObserver.observe(section);
});

// ===== EFECTO PARALLAX SUAVE EN HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== BOTÓN WHATSAPP FLOTANTE - MOSTRAR/OCULTAR =====
const whatsappFloat = document.querySelector('.whatsapp-float');

if (whatsappFloat) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.pointerEvents = 'auto';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.pointerEvents = 'none';
        }
    });
    
    // Inicialmente oculto
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.pointerEvents = 'none';
    whatsappFloat.style.transition = 'opacity 0.3s ease';
}

// ===== TRACKING DE CLICS EN BOTONES DE PLANES =====
const pricingButtons = document.querySelectorAll('.pricing-card .btn');

pricingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = button.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        const planPrice = card.querySelector('.amount').textContent;
        
        // Aquí puedes agregar tracking de analytics
        console.log(`Plan seleccionado: ${planName} - $${planPrice}`);
        
        // Construir mensaje personalizado para WhatsApp
        const mensaje = `¡Hola! Me interesa el plan "${planName}" por $${planPrice}.

¿Podrías enviarme más información?

Gracias!`;
        
        const whatsappURL = `https://wa.me/584242095783?text=${encodeURIComponent(mensaje)}`;
        
        // Pequeño delay para que el usuario vea el efecto
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 300);
    });
});

// ===== EFECTO HOVER EN TARJETAS DE PRECIOS =====
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// ===== VALIDACIÓN DE FORMULARIO EN TIEMPO REAL =====
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '#e0e0e0';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--color-primary)';
        });
    });
}

// ===== SMOOTH REVEAL AL CARGAR LA PÁGINA =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== DETECTAR SI EL USUARIO ESTÁ EN MÓVIL =====
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Ajustes específicos para móvil
    document.documentElement.style.setProperty('--font-size-base', '14px');
    
    // Desactivar parallax en móvil para mejor rendimiento
    window.removeEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroImage && scrolled < 800) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== LAZY LOADING PARA IMÁGENES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
    // Aquí puedes enviar el error a un servicio de monitoreo
});

// ===== PREVENIR SCROLL CUANDO EL MENÚ MÓVIL ESTÁ ABIERTO =====
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navLinks.classList.contains('active') && Math.abs(currentScroll - lastScroll) > 50) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== EFECTO TYPING EN HERO (OPCIONAL) =====
const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroSubtitle) {
    const text = heroSubtitle.innerHTML;
    heroSubtitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
        }
    };
    
    // Iniciar después de 1 segundo
    setTimeout(typeWriter, 1000);
}

// ===== COPY TO CLIPBOARD PARA NÚMERO DE WHATSAPP =====
const whatsappNumber = document.querySelector('.contact-item p');

if (whatsappNumber && whatsappNumber.textContent.includes('424')) {
    whatsappNumber.style.cursor = 'pointer';
    whatsappNumber.title = 'Click para copiar';
    
    whatsappNumber.addEventListener('click', () => {
        const number = whatsappNumber.textContent.replace(/\s/g, '');
        navigator.clipboard.writeText(number).then(() => {
            const originalText = whatsappNumber.textContent;
            whatsappNumber.textContent = '¡Copiado! ✓';
            whatsappNumber.style.color = 'var(--color-accent)';
            
            setTimeout(() => {
                whatsappNumber.textContent = originalText;
                whatsappNumber.style.color = '';
            }, 2000);
        });
    });
}

console.log('✅ HCL Digital - Script cargado correctamente');
console.log('📱 WhatsApp: +58 424-2095783');
console.log('🌐 Pinterest: 1.1M vistas/mes');
