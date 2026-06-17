/* ==========================================================================
   LOADER CLOSING & FAILSAFE (Mengatasi Stuck Loading)
   ========================================================================== */
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});

// Backup pengaman jika proses load browser macet (Maksimal 3 detik)
setTimeout(() => {
    const loader = document.querySelector(".loader");
    if (loader && loader.style.display !== "none") {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
    }
}, 3000);

/* ==========================================================================
   MOBILE MENU DRAWER TOGGLE
   ========================================================================== */
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");

if (mobileMenuBtn && navbar) {
    mobileMenuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        });
    });
}

/* ==========================================================================
   EFFECT TYPING (VERSION STABIL & ROBUST)
   ========================================================================== */
const typingElement = document.getElementById("typing");
const professions = [
    "Human Capital Management",
    "HC / GA Administrator",
    "Certified Human Capital Management",
    "Ahli K3 Umum",
    "Administration Professional"
];

let professionIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;
    const currentText = professions[professionIndex];

    if (!deleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
        }
    }
    
    let delay = deleting ? 35 : 75;
    setTimeout(typeEffect, delay);
}

if (typingElement) {
    typeEffect();
}

/* ==========================================================================
   HIGHLIGHTING ACTIVE LINK & FIXED HEADER
   ========================================================================== */
const sections = document.querySelectorAll("section[id]");
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    if (header) {
        if (scrollY > 50) {
            header.style.boxShadow = "0 10px 30px rgba(0, 240, 255, 0.15)"; // Efek shadow biru neon halus
        } else {
            header.style.boxShadow = "none";
        }
    }

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 180;
        const sectionId = section.getAttribute("id");
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.navbar a[href*=${sectionId}]`);
            if (activeLink) {
                navLinks.forEach(link => link.classList.remove("active"));
                activeLink.classList.add("active");
            }
        }
    });
});

/* ==========================================================================
   ANIMASI COUNTER / ANGKA BERJALAN (INTERSECTION OBSERVER)
   ========================================================================== */
const counters = document.querySelectorAll(".counter");
let animatedCounters = false;

const startCounter = () => {
    counters.forEach(counter => {
        const target = Number(counter.getAttribute("data-target"));
        let count = 0;
        const speed = target / 50; 
        
        const updateCounter = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCounter();
    });
};

const statsSection = document.querySelector(".statistics");
if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedCounters) {
                startCounter();
                animatedCounters = true;
            }
        });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
} else {
    setTimeout(startCounter, 1000);
}

/* ==========================================================================
   BACK TO TOP
   ========================================================================== */
const backToTop = document.getElementById("backToTop");
if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================================================
   INTERSECTION ANIMATIONS (REVEAL ON SCROLL)
   ========================================================================== */
const revealElements = document.querySelectorAll(
    ".section-title, .about-text, .about-info, .skill-card, .timeline-item, .edu-card, .cert-card-3d, .ach-card, .contact-card-premium"
);

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        revealObserver.observe(el);
    });
}

/* ==========================================================================
   ANIMATED PARTICLES BACKGROUND INITIALIZATION (SINKRONISASI BIRU NEON)
   ========================================================================== */
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 60,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": "#00f0ff" }, // Diperbarui ke Biru Neon Berkilau
            "shape": {
                "type": "circle",
                "stroke": { "width": 0, "color": "#000000" }
            },
            "opacity": {
                "value": 0.25,
                "random": true,
                "anim": { "enable": false }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": { "enable": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f0ff", // Diperbarui ke jalinan garis Biru Neon
                "opacity": 0.15,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.4 } },
                "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                "repulse": { "distance": 200, "duration": 0.4 },
                "push": { "particles_nb": 4 },
                "remove": { "particles_nb": 2 }
            }
        },
        "retina_detect": true
    });
}

/* ==========================================================================
   INITIALIZATION INITIAL 3D TILT EFFECT (VANILLA-TILT)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi efek 3D melayang pada foto profil Hero
    if (document.querySelector("[data-tilt-hero]")) {
        VanillaTilt.init(document.querySelector("[data-tilt-hero]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.03
        });
    }

    // Inisialisasi efek 3D melayang pada seluruh kartu sertifikat baru
    const certCards = document.querySelectorAll("[data-tilt-cert]");
    if (certCards.length > 0) {
        VanillaTilt.init(certCards, {
            max: 12,
            speed: 300,
            glare: true,
            "max-glare": 0.15,
            perspective: 800
        });
    }
});