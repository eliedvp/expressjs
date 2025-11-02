// === Script pour l'interactivité du site de voyage ===

// Navigation avec effet au scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Gestion du formulaire de recherche
const searchForm = document.getElementById('searchForm');
if (searchForm) {
  // Définir la date minimale à aujourd'hui
  const departureDateInput = document.getElementById('departureDate');
  if (departureDateInput) {
    const today = new Date().toISOString().split('T')[0];
    departureDateInput.setAttribute('min', today);
  }
  
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('departureDate').value;
    const duration = document.getElementById('duration').value;
    
    if (destination && date && duration) {
      // Animation de chargement
      const button = searchForm.querySelector('button');
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="search-icon">⏳</span> Recherche...';
      button.disabled = true;
      
      // Simulation d'une recherche (remplacer par une vraie requête API)
      setTimeout(() => {
        alert(`Recherche effectuée !\n\nDestination: ${destination}\nDate: ${date}\nDurée: ${duration} jours\n\n(En développement - Fonctionnalité à venir)`);
        button.innerHTML = originalText;
        button.disabled = false;
      }, 1500);
    }
  });
  
  // Amélioration de l'UX : focus automatique sur le premier champ
  const firstInput = searchForm.querySelector('input[type="text"]');
  if (firstInput) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        firstInput.focus();
      }, 500);
    });
  }
}

// Animation des cartes au scroll (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, observerOptions);

// Observer les cartes de destinations
document.querySelectorAll('.card').forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Observer les témoignages
document.querySelectorAll('.testimonial').forEach((testimonial) => {
  testimonial.style.opacity = '0';
  testimonial.style.transform = 'translateY(30px)';
  testimonial.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(testimonial);
});

// Animation au survol des cartes (effet parallaxe léger)
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Smooth scroll pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Amélioration de l'accessibilité : navigation au clavier
document.addEventListener('keydown', (e) => {
  // ESC pour fermer les modals (si ajoutés plus tard)
  if (e.key === 'Escape') {
    // Logique pour fermer les modals
  }
});

// Préchargement des images pour de meilleures performances
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('.submit-btn');
    const originalContent = button.innerHTML;
    
    // Animation de chargement
    button.innerHTML = '<span>Envoi en cours...</span>';
    button.disabled = true;
    
    // Simulation d'envoi (remplacer par une vraie requête API)
    setTimeout(() => {
      alert('Message envoyé avec succès !\n\nNous vous répondrons dans les plus brefs délais.\n\n(En développement - Fonctionnalité à venir)');
      contactForm.reset();
      button.innerHTML = originalContent;
      button.disabled = false;
    }, 1500);
  });
}

// Animation des éléments au scroll pour les pages services et contact
document.querySelectorAll('.service-card, .feature-item, .contact-method').forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// Console message pour les développeurs
console.log('%c🌍 TravelGo CI - Site de Voyage Moderne', 'color: #40E0D0; font-size: 20px; font-weight: bold;');
console.log('%cDesign moderne et immersif - 2025', 'color: #FF8C42; font-size: 14px;');

