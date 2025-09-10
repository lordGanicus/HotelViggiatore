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
let images = []; // se llena desde el HTML
let currentSlide = 0;
let modalCurrentSlide = 0;
let isTransitioning = false;
let autoPlayInterval = null;
const autoPlayDelay = 3000; // 3 segundos por slide

// Inicializar imágenes desde el HTML
function initImagesFromHTML() {
  images = Array.from(document.querySelectorAll(".habInfo-slide-image")).map(
    (img) => img.src
  );

  // Crear paginación dinámica
  const pagination = document.querySelector(".habInfo-pagination");
  pagination.innerHTML = "";
  images.forEach((_, index) => {
    const span = document.createElement("span");
    span.classList.add("habInfo-pagination-bullet");
    if (index === 0) span.classList.add("active");
    span.dataset.slide = index;
    span.onclick = () => goToSlide(index);
    pagination.appendChild(span);
  });

  // Asignar eventos a las imágenes del slider
  document.querySelectorAll(".habInfo-slide-image").forEach((img, index) => {
    img.onclick = (e) => {
      e.stopPropagation();
      openModal(index);
    };
  });

  // Ícono de zoom también abre modal
  const zoomIcon = document.querySelector(".habInfo-zoom-icon");
  if (zoomIcon) {
    zoomIcon.onclick = () => openModal(currentSlide);
  }

  // Inicializar touch y autoplay
  initTouchEvents();
  startAutoPlay();
}

// Actualizar slider principal
function updateSlider() {
  const leftSlide = document.getElementById("leftSlide");
  const centerSlide = document.getElementById("centerSlide");
  const rightSlide = document.getElementById("rightSlide");

  [leftSlide, centerSlide, rightSlide].forEach((slide) => {
    slide.classList.remove("transitioning-to-center", "transitioning-to-side");
  });

  const leftIndex = (currentSlide - 1 + images.length) % images.length;
  const rightIndex = (currentSlide + 1) % images.length;

  centerSlide.classList.add("transitioning-to-center");

  setTimeout(() => {
    leftSlide.querySelector("img").src = images[leftIndex];
    centerSlide.querySelector("img").src = images[currentSlide];
    rightSlide.querySelector("img").src = images[rightIndex];
  }, 50);

  updatePagination(currentSlide);

  setTimeout(() => {
    isTransitioning = false;
  }, 800);
}

// Navegación principal
function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide = (currentSlide + 1) % images.length;
  updateSlider();
}

function previousSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentSlide = (currentSlide - 1 + images.length) % images.length;
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
  document.body.style.overflow = "hidden";

  // Iniciar autoplay para modal
  startModalAutoPlay();
  initModalTouchEvents();
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";

  stopModalAutoPlay();
}

function modalNext() {
  modalCurrentSlide = (modalCurrentSlide + 1) % images.length;
  document.getElementById("modalImage").src = images[modalCurrentSlide];
}

function modalPrevious() {
  modalCurrentSlide = (modalCurrentSlide - 1 + images.length) % images.length;
  document.getElementById("modalImage").src = images[modalCurrentSlide];
}

// Modal autoplay
let modalAutoPlayInterval = null;
function startModalAutoPlay() {
  stopModalAutoPlay();
  modalAutoPlayInterval = setInterval(modalNext, autoPlayDelay);
}
function stopModalAutoPlay() {
  if (modalAutoPlayInterval) clearInterval(modalAutoPlayInterval);
}

// Touch events para slider principal
function initTouchEvents() {
  const container = document.querySelector(".habInfo-slider-container");
  let startX = 0;
  let endX = 0;

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
  });

  container.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", () => {
    const deltaX = endX - startX;
    if (deltaX > 50) previousSlide();
    else if (deltaX < -50) nextSlide();
    startAutoPlay();
  });
}

// Touch events para modal
function initModalTouchEvents() {
  const modal = document.getElementById("imageModal");
  let startX = 0;
  let endX = 0;

  modal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopModalAutoPlay();
  });

  modal.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", () => {
    const deltaX = endX - startX;
    if (deltaX > 50) modalPrevious();
    else if (deltaX < -50) modalNext();
    startModalAutoPlay();
  });
}

// Autoplay slider principal
function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
}
function stopAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
}

// Cerrar modal con click fuera o ESC
document.getElementById("imageModal").addEventListener("click", (e) => {
  if (e.target.id === "imageModal") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Toggle info
function toggleInfo() {
  const content = document.getElementById("habInfo-info-content");
  const toggleBtn = document.getElementById("habInfo-toggle-btn");
  const icon = toggleBtn.querySelector("i");

  content.classList.toggle("active");
  toggleBtn.classList.toggle("active");

  icon.className = content.classList.contains("active")
    ? "fas fa-minus"
    : "fas fa-plus";
}

// Intersection Observer
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

// Document ready
document.addEventListener("DOMContentLoaded", () => {
  initImagesFromHTML();
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
