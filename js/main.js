// Navbar
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  window.scrollY > 100
    ? header.classList.add("scrolled")
    : header.classList.remove("scrolled");
});

// Fermeture menu mobile
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbar = document.querySelector(".navbar-collapse");
    const toggler = document.querySelector(".custom-toggler");

    if (navbar.classList.contains("show")) {
      new bootstrap.Collapse(navbar).hide();
      toggler.setAttribute("aria-expanded", "false");
    }
  });
});

// Animation du toggle
document
  .querySelector(".custom-toggler")
  .addEventListener("click", function () {
    this.classList.toggle("active");
  });
// wooo
new WOW({
  offset: 100,
  mobile: false,
}).init();

// delay
$(document).ready(function () {
  $(".counter-count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 2500,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
});

// progress bar
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      const percent = entry.target.querySelector(".skill-percent");
      percent.textContent = `${percent.dataset.value}%`;
    }
  });
});

document.querySelectorAll(".skill-card").forEach((card) => {
  const fill = card.querySelector(".progress-fill");
  fill.style.setProperty("--width", `${fill.dataset.width}%`);
  observer.observe(card);
});
$(document).ready(function () {
  // init Isotope
  var $grid = $(".grid").isotope({
    itemSelector: ".element-item",
    layoutMode: "fitRows",
  });

  // bind filter button click
  $(".filters-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons
  $(".button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  let toTopBtn = document.getElementById("toTopBtn");

  if (!toTopBtn) {
    console.error("Erreur : #toTopBtn non trouvé dans le DOM !");
    return;
  }

  // Afficher ou masquer le bouton selon le scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      // Se déclenche après 200px
      toTopBtn.style.display = "flex";
    } else {
      toTopBtn.style.display = "none";
    }
  });

  // Défilement fluide vers le haut
  toTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Send mail
// function sendMail() {
//   emailjs.init("IG7ctBcY-aKV-fJ1n");

//   var params = {
//     name: document.querySelector("#name").value,
//     email: document.querySelector("#email").value,
//     object: document.querySelector("#object").value,
//     message: document.querySelector("#message").value,
//   };

//   var serviceID = "service_hrp1ha8";
//   var templateID = "template_37yph3d";

//   emailjs
//     .send(serviceID, templateID, params)
//     .then((res) => {
//       alert("Mail envoyé avec succès !");
//     })
//     .catch((err) => {
//       console.error(err);
//       alert("Erreur lors de l'envoi de l'email.");
//     });
// }
function sendMail() {
  emailjs.init("IG7ctBcY-aKV-fJ1n");

  var submitBtn = document.getElementById("submitBtn");
  var spinner = document.getElementById("spinner");
  var buttonText = document.querySelector(".button-content");
  var statusMessage = document.getElementById("statusMessage");

  var name = document.querySelector("#name").value.trim();
  var email = document.querySelector("#email").value.trim();
  var object = document.querySelector("#object").value.trim();
  var message = document.querySelector("#message").value.trim();

  // Vérification si un champ est vide
  if (!name || !email || !message) {
    statusMessage.textContent =
      "Veuillez remplir tous les champs obligatoires.";
    statusMessage.className = "error";
    statusMessage.classList.remove("d-none");
    return; // Arrêter la fonction
  }

  // Désactiver le bouton et afficher le spinner
  submitBtn.disabled = true;
  spinner.classList.remove("d-none");
  buttonText.style.display = "none";

  var params = { name, email, object, message };

  var serviceID = "service_hrp1ha8";
  var templateID = "template_37yph3d";

  emailjs
    .send(serviceID, templateID, params)
    .then(() => {
      statusMessage.textContent = "Mail envoyé avec succès !";
      statusMessage.className = "success";
      statusMessage.classList.remove("d-none");
      document.getElementById("contactForm").reset(); // Réinitialiser le formulaire
    })
    .catch((err) => {
      console.error(err);
      statusMessage.textContent = "Erreur lors de l'envoi de l'email.";
      statusMessage.className = "error";
      statusMessage.classList.remove("d-none");
    })
    .finally(() => {
      // Réactiver le bouton et masquer le spinner
      submitBtn.disabled = false;
      spinner.classList.add("d-none");
      buttonText.style.display = "inline";

      // Masquer le message après 5 secondes
      setTimeout(() => {
        statusMessage.classList.add("d-none");
      }, 5000);
    });
}
// Particule
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80 },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      }
    },
    retina_detect: true
  });
});
// 

