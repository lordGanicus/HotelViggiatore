document.addEventListener("DOMContentLoaded", () => {
  // Menu functionality
  const openMenus = document.querySelectorAll(".openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuRight = document.getElementById("menuRight");
  const menuLinks = document.querySelectorAll(".menu-link");

  // Open menu
  openMenus.forEach((button) => {
    button.addEventListener("click", () => {
      menuOverlay.classList.add("active");
      // Set default image
      menuRight.style.backgroundImage =
        "url('https://res.cloudinary.com/ddqoou1fq/image/upload/v1754669111/7590dfa1-b255-4838-be2d-d6417dbf9cfc.png')";
    });
  });

  // Close menu
  closeMenu.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
  });

  // Change image on menu link hover
  menuLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const imageUrl = link.getAttribute("data-image");
      menuRight.style.backgroundImage = `url('${imageUrl}')`;
    });
  });

  // Navbar scroll functionality
  const navbar = document.getElementById("navbar");
  const reservarBtn = document.querySelector(".btn-reservar-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("show");
      reservarBtn.style.display = "none";
    } else {
      navbar.classList.remove("show");
      reservarBtn.style.display = "block";
    }
  });

  // Close menu when clicking on any link
  const allMenuLinks = menuOverlay.querySelectorAll("a");
  allMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuOverlay.classList.remove("active");
    });
  });
});

/********************************SECTOR DE HABITACIONES******************************/
/********************seccion de habitaciones portada**********************/
document.addEventListener("DOMContentLoaded", function () {
  // Añadir clase animated después de un breve retraso
  setTimeout(function () {
    document.querySelector(".habHero-container").classList.add("animated");
  }, 300);

  // Función para verificar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0;
  }

  // Animación al hacer scroll
  function handleScroll() {
    const bottomSection = document.querySelector(".habHero-bottom");
    if (isInViewport(bottomSection)) {
      bottomSection.classList.add("reveal");
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // Comprobar si la sección ya está visible al cargar
  const bottomSection = document.querySelector(".habHero-bottom");
  if (isInViewport(bottomSection)) {
    bottomSection.classList.add("reveal");
  } else {
    window.addEventListener("scroll", handleScroll);
  }

  // También comprobar periódicamente para dispositivos con dimensiones extrañas
  const checkInterval = setInterval(function () {
    if (isInViewport(bottomSection)) {
      bottomSection.classList.add("reveal");
      clearInterval(checkInterval);
    }
  }, 500);
});
/*************************************Habitaciones Info********************************/

/*************************************Habitaciones Info********************************/
// Slider functionality
const images = [
  "https://res.cloudinary.com/ddqoou1fq/image/upload/v1754926731/habitacion-32-04_fxceat.png",
  "https://res.cloudinary.com/ddqoou1fq/image/upload/v1754926724/habitacion-32-03_pd58fm.png",
  "https://res.cloudinary.com/ddqoou1fq/image/upload/v1754926721/habitacion-32-02_shygx5.png",
];

let currentSlide = 0;
let modalCurrentSlide = 0;
let isTransitioning = false;

function updateSlider() {
  const leftSlide = document.getElementById("leftSlide");
  const centerSlide = document.getElementById("centerSlide");
  const rightSlide = document.getElementById("rightSlide");

  // Remove transition classes first
  [leftSlide, centerSlide, rightSlide].forEach((slide) => {
    slide.classList.remove("transitioning-to-center", "transitioning-to-side");
  });

  const leftIndex = currentSlide === 0 ? 2 : currentSlide - 1;
  const rightIndex = currentSlide === 2 ? 0 : currentSlide + 1;

  // Apply appropriate classes for animation
  if (leftSlide.classList.contains("habInfo-slide-center")) {
    leftSlide.classList.add("transitioning-to-side");
  }

  if (rightSlide.classList.contains("habInfo-slide-center")) {
    rightSlide.classList.add("transitioning-to-side");
  }

  centerSlide.classList.add("transitioning-to-center");

  setTimeout(() => {
    leftSlide.querySelector("img").src = images[leftIndex];
    centerSlide.querySelector("img").src = images[currentSlide];
    rightSlide.querySelector("img").src = images[rightIndex];

    // Update classes for positioning
    leftSlide.className = "habInfo-slide habInfo-slide-side";
    centerSlide.className = "habInfo-slide habInfo-slide-center";
    rightSlide.className = "habInfo-slide habInfo-slide-side";

    // Update click handlers for modal
    leftSlide.querySelector("img").onclick = (e) => {
      e.stopPropagation();
      openModal(leftIndex);
    };
    centerSlide.querySelector("img").onclick = () => openModal(currentSlide);
    rightSlide.querySelector("img").onclick = (e) => {
      e.stopPropagation();
      openModal(rightIndex);
    };
  }, 50);

  updatePagination(currentSlide);

  // Reset transitioning flag after animation completes
  setTimeout(() => {
    isTransitioning = false;
  }, 800);
}

function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentSlide = currentSlide === 2 ? 0 : currentSlide + 1;
  updateSlider();
}

function previousSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentSlide = currentSlide === 0 ? 2 : currentSlide - 1;
  updateSlider();
}

function goToSlide(index) {
  if (isTransitioning || index === currentSlide) return;
  isTransitioning = true;

  currentSlide = index;
  updateSlider();
}

function updatePagination(activeIndex) {
  document
    .querySelectorAll(".habInfo-pagination-bullet")
    .forEach((bullet, index) => {
      bullet.classList.toggle("active", index === activeIndex);
    });
}

// Modal functionality
function openModal(imageIndex) {
  modalCurrentSlide = imageIndex;
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = images[imageIndex];
  modal.classList.add("active");

  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("active");

  // Restore body scroll
  document.body.style.overflow = "auto";
}

function modalNext() {
  modalCurrentSlide = modalCurrentSlide === 2 ? 0 : modalCurrentSlide + 1;
  document.getElementById("modalImage").src = images[modalCurrentSlide];
}

function modalPrevious() {
  modalCurrentSlide = modalCurrentSlide === 0 ? 2 : modalCurrentSlide - 1;
  document.getElementById("modalImage").src = images[modalCurrentSlide];
}

// Close modal when clicking outside
document.getElementById("imageModal").addEventListener("click", (e) => {
  if (e.target.id === "imageModal") {
    closeModal();
  }
});

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Information toggle functionality
function toggleInfo() {
  const content = document.getElementById("habInfo-info-content");
  const toggleBtn = document.getElementById("habInfo-toggle-btn");
  const icon = toggleBtn.querySelector("i");

  content.classList.toggle("active");
  toggleBtn.classList.toggle("active");

  if (content.classList.contains("active")) {
    icon.className = "fas fa-minus";
  } else {
    icon.className = "fas fa-plus";
  }
}

// Reserve room functionality
function reserveRoom() {
  alert(
    "Función de reserva activada. Aquí conectarías con tu sistema de reservas."
  );
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      entry.target.classList.add("habLink-visible");
    }
  });
}, observerOptions);

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  updateSlider();

  const animatedElements = document.querySelectorAll(
    ".habInfo-section-title, .habInfo-feature-item, .habInfo-info-header, .habInfo-reserve-section"
  );
  animatedElements.forEach((el) => observer.observe(el));
});
/******************************Hab Links*******************************/
// Intersection Observer for better performance and control

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".habLink-header, .habLink-nav-container, .habLink-hero"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Add smooth scrolling for anchor links
  document.querySelectorAll(".habLink-nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      // If it's an internal anchor, add smooth scrolling
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
});

// Parallax effect for hero section (optional enhancement)
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".habLink-hero");
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  if (hero && window.innerWidth > 768) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});
