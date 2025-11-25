// ====== PORTFOLIO ======

// Données du portfolio
const portfolioData = [{
    category: "filter-app",
    image: "img/img-projet/1.png",
    title: "Design Project 1",
    link: "https://softimad.com"
  },
  {
    category: "filter-product",
    image: "img/img-projet/Group 10.png",
    title: "Development Project 1",
    link: "https://masovia-madagascar.com/"
  },
  {
    category: "filter-product",
    image: "img/img-projet/Annonce.png",
    title: "Development Project 2",
    link: "https://annonce-legale-officielle.fr"
  },
  {
    category: "filter-product",
    image: "img/img-projet/00.png",
    title: "Development Project 3",
    link: "https://app.dynamikmood.com/login"
  },
  {
    category: "filter-product",
    image: "img/img-projet/portfolio.PNG",
    title: "Development Project 4",
    link: "#"
  },
  {
    category: "filter-product",
    image: "img/img-projet/img-g3.png",
    title: "Development Project 5",
    link: "https://rh-muriel.netlify.app/"
  },
  {
    category: "filter-product",
    image: "img/img-projet/app.dynamikmood.com 1.png",
    title: "Development Project 6",
    link: "https://app.dynamikmood.com/our_offers"
  },
  {
    category: "filter-app",
    image: "img/img-projet/group-9.png",
    title: "Design Project 2",
    link: "https://www.figma.com"
  },
  {
    category: "filter-app",
    image: "img/img-projet/SitSoftimad.png",
    title: "Design Project 3",
    link: "https://www.figma.com/design/xA0RmMEelSvskNM5PQS5PL/Untitled?node-id=92-666&t=YqQR67v9jK02xevr-0"
  },
  {
    category: "filter-app",
    image: "img/img-projet/group-3.png",
    title: "Design Project 4",
    link: "https://www.figma.com/design/saeth76IYou0L4ZYE8FnEZ/Untitled?node-id=0-1&t=O9lRfsrSpegnp6Sg-0"
  },
  {
    category: "filter-app",
    image: "img/img-projet/C-4.png",
    title: "Design Project 5",
    link: "https://www.figma.com/design/saeth76IYou0L4ZYE8FnEZ/Untitled?node-id=0-1&t=O9lRfsrSpegnp6Sg-0"
  },
  {
    category: "filter-app",
    image: "img/img-projet/Group.png",
    title: "Design Project 6",
    link: "https://www.figma.com/design/ROHT0uuvpLkLpfH3d7x8aj/Untitled?node-id=0-1&p=f&t=3wOT98pRWiqxKVoB-0"
  },
  {
    category: "filter-app",
    image: "img/img-projet/Accueil0.png",
    title: "Design Project 7",
    link: "https://www.figma.com/design/PG8AMLQ6UGNAAyzgC9g5tl/Untitled?t=Gi1nlSVS5jLuHgL0-0"
  },
  {
    category: "filter-product",
    image: "img/img-projet/Alo-1.png",
    title: "Development Project 7",
    link: "https://creation-societe-alo.web.app"
  }
];

// État global
let portfolioState = {
  allItems: portfolioData,
  currentFilter: '*',
  isModalOpen: false
};

// Variables globales pour les éléments modaux
let modalBackdrop, modalIframe, modalTitle, modalInfoTitle, modalLink, modalInfoDesc;
let openNewTabBtn, modalClose, modalCloseFooter;

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Initialisation du portfolio...');

  // Initialiser les éléments modaux
  initializeModalElements();

  // Créer la mise en page
  createPortfolioLayout();

  // Configurer les filtres
  setupFilters();

  // Configurer les événements de la modal
  setupModalEvents();

  // Configurer le redimensionnement
  setTimeout(handleResize, 200);
  window.addEventListener('resize', debounce(handleResize, 200));

  console.log('✅ Portfolio initialisé avec succès');
});

function initializeModalElements() {
  modalBackdrop = document.getElementById('modalBackdrop');
  modalIframe = document.getElementById('modalIframe');
  modalTitle = document.getElementById('modalTitle');
  modalInfoTitle = document.getElementById('modalInfoTitle');
  modalLink = document.getElementById('modalLink');
  modalInfoDesc = document.getElementById('modalInfoDesc');
  openNewTabBtn = document.getElementById('openNewTab');
  modalClose = document.getElementById('modalClose');
  modalCloseFooter = document.getElementById('modalCloseFooter');

  console.log('🔧 Éléments modaux initialisés');
}

function setupModalEvents() {
  // Fermer la modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalCloseFooter) {
    modalCloseFooter.addEventListener('click', closeModal);
  }

  // Fermer en cliquant sur le backdrop
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Ouvrir dans un nouvel onglet
  if (openNewTabBtn) {
    openNewTabBtn.addEventListener('click', function () {
      const href = modalLink ? modalLink.href : '#';
      if (href && href !== '#' && href !== window.location.href) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Fermer avec la touche Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && portfolioState.isModalOpen) {
      closeModal();
    }
  });

  console.log('🔧 Événements modaux configurés');
}

function setupFilters() {
  document.querySelectorAll('.portfolio-flters li').forEach(li => {
    li.addEventListener('click', function () {
      // Retirer la classe active de tous les filtres
      document.querySelectorAll('.portfolio-flters li').forEach(item => {
        item.classList.remove('filter-active');
      });

      // Ajouter la classe active au filtre cliqué
      this.classList.add('filter-active');

      // Mettre à jour le filtre courant
      portfolioState.currentFilter = this.getAttribute('data-filter');
      console.log(`🎯 Filtre changé pour: ${portfolioState.currentFilter}`);

      // Recréer la mise en page
      createPortfolioLayout();
    });
  });

  console.log('🔧 Filtres configurés');
}

function createPortfolioLayout() {
  const container = document.getElementById('auto-scroll-wrapper');
  if (!container) {
    console.error('❌ Conteneur auto-scroll-wrapper non trouvé');
    return;
  }

  // Vider le conteneur
  container.innerHTML = '';

  // Filtrer les éléments
  const filteredItems = portfolioState.currentFilter === '*' ?
    [...portfolioState.allItems] :
    portfolioState.allItems.filter(item => item.category === portfolioState.currentFilter.replace('.', ''));

  console.log(`📁 Éléments filtrés: ${filteredItems.length} projets`);

  // Message si aucun élément
  if (filteredItems.length === 0) {
    container.innerHTML = `
      <div style="color: #ccc; padding: 40px 20px; text-align: center; font-size: 1.1rem;">
        Aucun projet trouvé pour cette catégorie.
      </div>
    `;
    return;
  }

  // Organiser en colonnes (2 éléments par colonne)
  const itemsPerColumn = 2;
  const columns = [];

  for (let i = 0; i < filteredItems.length; i += itemsPerColumn) {
    const columnItems = filteredItems.slice(i, i + itemsPerColumn);
    columns.push(columnItems);
  }

  console.log(`📊 ${columns.length} colonnes créées`);

  // Dupliquer les colonnes pour l'effet infini
  const duplicatedColumns = [...columns, ...columns, ...columns];

  // Créer et ajouter les colonnes
  duplicatedColumns.forEach(columnItems => {
    const columnElement = createColumn(columnItems);
    if (columnElement) {
      container.appendChild(columnElement);
    }
  });

  // Recalculer les animations
  setTimeout(() => {
    handleResize();
  }, 100);
}

function createColumn(items) {
  const template = document.getElementById('portfolio-column-template');
  if (!template) {
    console.error('❌ Template de colonne non trouvé');
    return null;
  }

  const clone = template.content.cloneNode(true);
  const column = clone.querySelector('.portfolio-grid-column');

  if (!column) {
    console.error('❌ Colonne non trouvée dans le template');
    return null;
  }

  // Ajouter chaque élément à la colonne
  items.forEach(item => {
    const itemElement = createPortfolioItem(item);
    if (itemElement) {
      column.appendChild(itemElement);
    }
  });

  return clone;
}

function createPortfolioItem(data) {
  const template = document.getElementById('portfolio-item-template');
  if (!template) {
    console.error('❌ Template d\'élément non trouvé');
    return null;
  }

  const clone = template.content.cloneNode(true);

  // Récupérer les éléments
  const img = clone.querySelector('img');
  const titleEl = clone.querySelector('.title');
  const viewBtn = clone.querySelector('.view-btn');
  const previewLink = clone.querySelector('.preview-link');

  if (!img || !titleEl || !viewBtn || !previewLink) {
    console.error('❌ Éléments manquants dans le template');
    return null;
  }

  // Configurer l'image
  img.alt = data.title || 'Projet portfolio';
  img.src = data.image;

  // Gestion des erreurs d'image
  img.onerror = function () {
    console.warn(`⚠️ Image non trouvée: ${data.image}`);
    img.style.display = 'none';

    const imgFrame = clone.querySelector('.img-frame');
    if (imgFrame) {
      if (!imgFrame.querySelector('.image-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder ph';
        placeholder.textContent = 'Image non disponible';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.width = '100%';
        placeholder.style.height = '100%';
        imgFrame.appendChild(placeholder);
      }
    }
  };

  img.onload = function () {
    console.log(`✅ Image chargée: ${data.image}`);
  };

  // Configurer le titre
  titleEl.textContent = data.title;

  // Configurer les événements
  viewBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(`👁️ Ouverture modal pour: ${data.title}`);
    openModalFor(data);
  });

  previewLink.href = data.link || '#';
  previewLink.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(`👁️ Ouverture modal pour: ${data.title}`);
    openModalFor(data);
  });

  return clone;
}

function openModalFor(item) {
  if (!modalBackdrop || !modalIframe) {
    console.error('❌ Éléments modaux non disponibles');
    return;
  }

  const url = item.link || '#';

  console.log(`🔄 Ouverture modal: ${item.title} - ${url}`);

  // Mettre à jour les informations
  if (modalTitle) modalTitle.textContent = item.title || 'Aperçu du projet';
  if (modalInfoTitle) modalInfoTitle.textContent = item.title || 'Projet sans titre';
  if (modalLink) {
    modalLink.href = url;
    modalLink.textContent = url;
  }

  // Configurer l'iframe
  if (!url || url === '#') {
    modalIframe.style.display = 'none';
    if (modalInfoDesc) {
      modalInfoDesc.textContent = 'Aucun lien disponible pour ce projet.';
    }
  } else {
    modalIframe.style.display = 'block';

    // Gérer les liens Figma
    if (url.includes('figma.com')) {
      const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
      modalIframe.src = embedUrl;
      if (modalInfoDesc) {
        modalInfoDesc.textContent = 'Aperçu du design Figma. Chargement en cours...';
      }
    } else {
      modalIframe.src = url;
      if (modalInfoDesc) {
        modalInfoDesc.textContent = 'Chargement de la page en cours...';
      }
    }

    // Gérer les erreurs
    modalIframe.onload = function () {
      console.log('✅ Iframe chargée avec succès');
    };

    modalIframe.onerror = function () {
      console.error('❌ Erreur de chargement iframe');
      if (modalInfoDesc) {
        modalInfoDesc.textContent = 'Impossible de charger l\'aperçu. Le site peut bloquer l\'affichage en iframe. Utilisez le bouton "Ouvrir dans un nouvel onglet".';
      }
    };
  }

  // Afficher la modal
  modalBackdrop.style.display = 'flex';
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  portfolioState.isModalOpen = true;

  console.log('✅ Modal ouverte avec succès');
}

function closeModal() {
  if (!modalBackdrop) return;

  console.log('🔒 Fermeture modal');

  modalBackdrop.style.display = 'none';
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (modalIframe) {
    modalIframe.src = 'about:blank';
  }

  portfolioState.isModalOpen = false;
}

function handleResize() {
  const wrapper = document.getElementById('auto-scroll-wrapper');
  if (!wrapper) return;

  const columns = wrapper.querySelectorAll('.portfolio-grid-column');
  if (columns.length === 0) return;

  const columnWidth = columns[0].offsetWidth;
  const gap = 20;
  const singleColumnTotalWidth = columnWidth + gap;
  const uniqueColumnsCount = Math.max(1, Math.round(columns.length / 3));
  const totalTranslateDistance = singleColumnTotalWidth * uniqueColumnsCount;
  const animationDuration = Math.max(20, Math.min(60, uniqueColumnsCount * 4));

  console.log(`📏 Calculs: ${uniqueColumnsCount} colonnes, ${totalTranslateDistance}px, ${animationDuration}s`);

  let styleElement = document.getElementById('auto-scroll-style');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'auto-scroll-style';
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = `
    @keyframes autoScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${totalTranslateDistance}px); }
    }
    .auto-scroll-wrapper {
      animation: autoScroll ${animationDuration}s linear infinite;
    }
    .auto-scroll-wrapper:hover {
      animation-play-state: paused;
    }
  `;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debug
window.portfolioDebug = {
  state: portfolioState,
  openModalFor: openModalFor,
  closeModal: closeModal,
  recreateLayout: createPortfolioLayout
};
// ====== NAVIGATION SMOOTH SCROLL ======
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
  else navbar.classList.remove('navbar-scrolled');
});
(function () {
  const collapseEl = document.getElementById('navbarNav');
  if (!collapseEl) return;

  collapseEl.addEventListener('show.bs.collapse', function () {
    document.body.classList.add('no-scroll');
  });

  collapseEl.addEventListener('hidden.bs.collapse', function () {
    document.body.classList.remove('no-scroll');
  });

  const allNavbarAnchors = document.querySelectorAll('.navbar a[href^="#"]');

  allNavbarAnchors.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 56;

      const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth'
      });

      if (collapseEl.classList.contains('show')) {
        const bs = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, {
          toggle: false
        });
        bs.hide();
      }

      document.querySelectorAll('.navbar-nav .nav-link').forEach(n => n.classList.remove('active'));
      if (this.classList.contains('nav-link')) this.classList.add('active');
      else {
        const related = document.querySelector('.navbar-nav .nav-link[href="#' + id + '"]');
        if (related) related.classList.add('active');
      }

      const newPath = '/' + id;
      history.replaceState({}, '', newPath);
    });
  });
})();

// ====== End navigation =======
// section hero rotatif

//========== Initialisation des animations=========
new WOW().init();

// Effet de texte tapé
const typedTextSpan = document.querySelector(".typed-text");
if (typedTextSpan) {
  const typedItems = typedTextSpan.getAttribute("data-typed-items").split(",");
  const typedCursor = document.querySelector(".typed-cursor");

  let itemIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let erasingDelay = 50;
  let newTextDelay = 1000;

  function type() {
    if (itemIndex === typedItems.length) {
      itemIndex = 0;
    }

    const currentItem = typedItems[itemIndex].replaceAll('"', '').trim();

    if (!isDeleting && charIndex < currentItem.length) {
      typedTextSpan.textContent += currentItem.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else if (isDeleting && charIndex > 0) {
      typedTextSpan.textContent = currentItem.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingDelay);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        itemIndex++;
      }
      setTimeout(type, newTextDelay);
    }
  }

  // Démarrer l'effet de frappe
  setTimeout(type, 1000);
}

// Animation pause au survol, reprise quand la souris quitte
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const mobileLogo = document.querySelector('.logo-img-mobile');
  const desktopLogo = document.querySelector('.logo-img-desktop');

  function updateHeaderOnScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      header.classList.add('scrolled');

      // Desktop logo - afficher avec animation
      if (desktopLogo) {
        desktopLogo.style.opacity = '1';
        desktopLogo.style.visibility = 'visible';
      }

      // Mobile logo - changer si nécessaire
      if (mobileLogo) {
        mobileLogo.style.transform = 'scale(0.95)';
      }

    } else {
      header.classList.remove('scrolled');

      // Desktop logo - cacher
      if (desktopLogo) {
        desktopLogo.style.opacity = '0';
        desktopLogo.style.visibility = 'hidden';
      }

      // Mobile logo - revenir à la normale
      if (mobileLogo) {
        mobileLogo.style.transform = 'scale(1)';
      }
    }
  }

  // Écouter l'événement de scroll
  window.addEventListener('scroll', updateHeaderOnScroll);

  // Vérifier au chargement de la page
  updateHeaderOnScroll();
});
// WOW animations
new WOW({
  offset: 100,
  mobile: false,
}).init();

// Helpers d'animation et compteurs
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.12
  });
  revealEls.forEach(el => io.observe(el));

  // counters
  const nums = document.querySelectorAll('.stat .num');
  nums.forEach(el => {
    const target = +el.dataset.target || 0;
    let curr = 0;
    const step = Math.max(1, Math.round(target / 80));
    const timer = setInterval(() => {
      curr += step;
      if (curr >= target) {
        el.textContent = target;
        clearInterval(timer)
      } else el.textContent = curr;
    }, 12);
  });

  // progress fills
  const fills = document.querySelectorAll('.progress .fill');
  fills.forEach(fill => {
    const value = fill.dataset.value || fill.getAttribute('data-value') || 0;
    // reveal when visible
    const fobs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fill.style.width = value + '%';
          // insert percent label inside the colored fill
          if (!fill.querySelector('.percent')) {
            const span = document.createElement('span');
            span.className = 'percent';
            span.textContent = value + '%';
            fill.appendChild(span);
          } else {
            fill.querySelector('.percent').textContent = value + '%';
          }
          fill.classList.add('filled');
          fobs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25
    });
    fobs.observe(fill);
  });
});

// Back to top button
document.addEventListener("DOMContentLoaded", function () {
  let toTopBtn = document.getElementById("toTopBtn");

  if (!toTopBtn) {
    console.error("Erreur : #toTopBtn non trouvé dans le DOM !");
    return;
  }

  // Afficher ou masquer le bouton selon le scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      toTopBtn.style.display = "flex";
    } else {
      toTopBtn.style.display = "none";
    }
  });

  // Défilement fluide vers le haut
  toTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// EmailJS
function sendMail() {
  emailjs.init("IG7ctBcY-aKV-fJ1n");

  const submitBtn = document.getElementById("submitBtn");
  const spinner = document.getElementById("spinner");
  const buttonText = document.querySelector(".button-content");
  const statusMessage = document.getElementById("statusMessage");

  // Récupération des valeurs
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation
  if (!name || !email || !subject || !message) {
    showError("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  // Configuration de l'envoi
  submitBtn.disabled = true;
  spinner.classList.remove("d-none");
  buttonText.style.display = "none";

  const params = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    reply_to: email
  };

  emailjs.send("service_hrp1ha8", "template_37yph3d", params)
    .then(() => {
      showSuccess("Mail envoyé avec succès !");
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      console.error("Erreur d'envoi:", error);
      showError("Erreur lors de l'envoi du message");
    })
    .finally(() => resetButtonState());

  // Fonctions utilitaires
  function showError(text) {
    statusMessage.textContent = text;
    statusMessage.className = "text-danger";
    statusMessage.classList.remove("d-none");
  }

  function showSuccess(text) {
    statusMessage.textContent = text;
    statusMessage.className = "text-success";
    statusMessage.classList.remove("d-none");
  }

  function resetButtonState() {
    submitBtn.disabled = false;
    spinner.classList.add("d-none");
    buttonText.style.display = "inline";
    setTimeout(() => statusMessage.classList.add("d-none"), 5000);
  }
}

// Particules
document.addEventListener('DOMContentLoaded', () => {
  const colors = ['#8be9fd', '#b388ff', '#7ee787', '#ffd28b'];

  function getParticleCount() {
    const area = window.innerWidth * window.innerHeight;
    const base = Math.round(area / 22000);
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) ||
      Math.max(window.innerWidth, window.innerHeight) < 600;
    const count = isMobile ? Math.round(base * 0.5) : base;
    return Math.max(20, Math.min(120, count));
  }

  function destroyParticles() {
    if (window.pJSDom && window.pJSDom.length) {
      try {
        window.pJSDom.forEach(inst => inst && inst.pJS && inst.pJS.fn.vendors.destroypJS());
      } catch (e) {
        /* silent */
      }
      window.pJSDom = [];
    }
  }

  function initParticles() {
    destroyParticles();
    if (!document.getElementById('particles-js') || typeof particlesJS !== 'function') return;

    particlesJS('particles-js', {
      particles: {
        number: {
          value: getParticleCount(),
          density: {
            enable: false
          }
        },
        color: {
          value: colors
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.7,
          anim: {
            enable: true,
            speed: 0.6,
            opacity_min: 0.15
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2
          }
        },
        line_linked: {
          enable: true,
          distance: 120,
          opacity: 0.06,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.6,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false
          },
          onclick: {
            enable: false
          },
          resize: true
        },
        modes: {
          repulse: {
            distance: 90
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }

  initParticles();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initParticles, 200);
  });
});


// Isotope (si vous l'utilisez ailleurs)
$(document).ready(function () {
  if ($(".grid").length) {
    // init Isotope
    var $grid = $(".grid").isotope({
      itemSelector: ".element-item",
      layoutMode: "fitRows",
      percentPosition: true,
      transitionDuration: '0.7s'
    });

    // bind filter button click
    $(".filters-button-group").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({
        filter: filterValue
      });
    });

    // change is-checked class on buttons
    $(".button-group").each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on("click", "button", function () {
        $buttonGroup.find(".is-checked").removeClass("is-checked");
        $(this).addClass("is-checked");
      });
    });
  }
});