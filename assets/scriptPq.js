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
/**************************************PQ info**************************/
// Slider functionality
let currentSlide = 0;
let modalCurrentSlide = 0;
let isTransitioning = false;

// Get images from HTML instead of JS array
function getImagesFromHTML() {
  const imageElements = document.querySelectorAll(".pqInfo-slide-image");
  const images = [];

  imageElements.forEach((img) => {
    images.push(img.src);
  });

  return images;
}

function updateSlider() {
  if (isTransitioning) return;
  isTransitioning = true;

  const leftSlide = document.getElementById("leftSlide");
  const centerSlide = document.getElementById("centerSlide");
  const rightSlide = document.getElementById("rightSlide");

  const images = getImagesFromHTML();
  const leftIndex = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
  const rightIndex = currentSlide === images.length - 1 ? 0 : currentSlide + 1;

  // Apply transition classes
  leftSlide.classList.remove("pqInfo-slide-center", "pqInfo-slide-side");
  centerSlide.classList.remove("pqInfo-slide-center", "pqInfo-slide-side");
  rightSlide.classList.remove("pqInfo-slide-center", "pqInfo-slide-side");

  // Set new positions with smooth transition
  setTimeout(() => {
    leftSlide.className = "pqInfo-slide pqInfo-slide-side";
    centerSlide.className = "pqInfo-slide pqInfo-slide-center";
    rightSlide.className = "pqInfo-slide pqInfo-slide-side";

    // Update images based on data-index attributes
    document.querySelectorAll(".pqInfo-slide-image").forEach((img) => {
      const index = parseInt(img.getAttribute("data-index"));
      img.src = images[(index + currentSlide) % images.length];
      img.setAttribute("data-index", (index + currentSlide) % images.length);
    });

    updatePagination(currentSlide);

    // Reset transitioning flag after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 800);
  }, 50);
}

function nextSlide() {
  const images = getImagesFromHTML();
  currentSlide = (currentSlide + 1) % images.length;
  updateSlider();
  createHearts();
}

function previousSlide() {
  const images = getImagesFromHTML();
  currentSlide = (currentSlide - 1 + images.length) % images.length;
  updateSlider();
  createHearts();
}

function goToSlide(index) {
  if (isTransitioning || index === currentSlide) return;
  currentSlide = index;
  updateSlider();
  createHearts();
}

function updatePagination(activeIndex) {
  document
    .querySelectorAll(".pqInfo-pagination-bullet")
    .forEach((bullet, index) => {
      bullet.classList.toggle("active", index === activeIndex);
    });
}

// Modal functionality
function openModal(imageIndex) {
  const images = getImagesFromHTML();
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
  const images = getImagesFromHTML();
  modalCurrentSlide = (modalCurrentSlide + 1) % images.length;
  document.getElementById("modalImage").src = images[modalCurrentSlide];
}

function modalPrevious() {
  const images = getImagesFromHTML();
  modalCurrentSlide = (modalCurrentSlide - 1 + images.length) % images.length;
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

// Reserve package functionality
function reservePackage() {
  alert(
    "¡Felicitaciones por su luna de miel! Será redirigido al formulario de reserva."
  );
  createHearts(20); // Create more hearts on reservation
}

// Create hearts animation
function createHearts(count = 10) {
  const heartsContainer = document.getElementById("heartsContainer");
  heartsContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "pqInfo-heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.setProperty("--x", Math.random() * 200 - 100 + "px");
    heart.style.setProperty("--y", -Math.random() * 100 - 50 + "px");
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";
    heart.style.fontSize = 15 + Math.random() * 15 + "px";
    heartsContainer.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 6000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create initial hearts
  setTimeout(() => {
    createHearts(5);
  }, 1000);

  // Create hearts periodically
  setInterval(() => {
    createHearts(3);
  }, 5000);
});
/**********************************PQ links**********************************/
class PqLinkSlider {
  constructor() {
    this.slides = [
      {
        title: "LUNA DE MIEL",
        subtitle: "Recuerdos que perduran",
        description:
          "Disfruta de una experiencia única e inolvidable junto a tu pareja. No dejes pasar la oportunidad de reservar tu paquete.",
        image:
          "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755707869/bb311f4e-c615-4f57-b7f3-ea03ccc7dde3.png",
      },
      {
        title: "NOCHE ROMÁNTICA",
        subtitle: "Inolvidable",
        description:
          "Disfruta de momentos únicos junto a tu pareja y asegura tu paquete hoy mismo.",
        image:
          "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755718153/3f6e4bd1-2bec-46f3-8ffe-a1591e9b43de.png",
      },
      {
        title: "ESCAPADA ROMÁNTICA",
        subtitle: "Instantes que enamoran",
        description:
          "Una experiencia única junto a tu pareja. No dejes pasar la oportunidad de reservar tu paquete y disfrutar del romance.",
        image:
          "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755718454/b0e433d7-5b45-4e7c-9648-9516dc95e158.png",
      },
      {
        title: "NOCHE INOLVIDABLE",
        subtitle: "Romántica",
        description:
          "Una NOCHE INOLVIDABLE con quien más quieres. Vive el romance y la magia de cada instante Y reservar tu paquete.",
        image:
          "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755718528/937b362a-3115-4cab-bdf4-dec155422578.png",
      },
    ];

    this.currentSlideIndex = 0;
    this.slidesContainer = document.getElementById("pqLinkSlidesContainer");
    this.leftBtn = document.querySelector(".pqLink-nav-left");
    this.rightBtn = document.querySelector(".pqLink-nav-right");

    this.init();
  }

  init() {
    this.renderSlides();
    this.bindEvents();
    this.startAutoSlide();
  }

  renderSlides() {
    // Mostrar 2 slides a la vez
    const slide1 = this.slides[this.currentSlideIndex];
    const slide2 =
      this.slides[(this.currentSlideIndex + 1) % this.slides.length];

    this.slidesContainer.innerHTML = `
                    <div class="pqLink-slide" data-slide="${
                      this.currentSlideIndex
                    }">
                        <div class="pqLink-slide-image" style="background-image: url('${
                          slide1.image
                        }');"></div>
                        <div class="pqLink-slide-overlay"></div>
                        <div class="pqLink-slide-content">
                            <h2 class="pqLink-slide-title">${slide1.title}</h2>
                            <p class="pqLink-slide-subtitle">${
                              slide1.subtitle
                            }</p>
                            <div class="pqLink-slide-line"></div>
                            <p class="pqLink-slide-description">${
                              slide1.description
                            }</p>
                        </div>
                    </div>
                    <div class="pqLink-slide" data-slide="${
                      (this.currentSlideIndex + 1) % this.slides.length
                    }">
                        <div class="pqLink-slide-image" style="background-image: url('${
                          slide2.image
                        }');"></div>
                        <div class="pqLink-slide-overlay"></div>
                        <div class="pqLink-slide-content">
                            <h2 class="pqLink-slide-title">${slide2.title}</h2>
                            <p class="pqLink-slide-subtitle">${
                              slide2.subtitle
                            }</p>
                            <div class="pqLink-slide-line"></div>
                            <p class="pqLink-slide-description">${
                              slide2.description
                            }</p>
                        </div>
                    </div>
                `;

    // Agregar animación de entrada
    setTimeout(() => {
      document.querySelectorAll(".pqLink-slide").forEach((slide) => {
        slide.classList.add("pqLink-fade-in");
      });
    }, 50);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 2) % this.slides.length;
    this.renderSlides();
  }

  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 2 + this.slides.length) % this.slides.length;
    this.renderSlides();
  }

  nextSlideWithReset() {
    this.pauseAutoSlide();
    this.nextSlide();
    this.startAutoSlide();
  }

  prevSlideWithReset() {
    this.pauseAutoSlide();
    this.prevSlide();
    this.startAutoSlide();
  }

  bindEvents() {
    this.leftBtn.addEventListener("click", () => this.prevSlideWithReset());
    this.rightBtn.addEventListener("click", () => this.nextSlideWithReset());

    // Pausar auto-slide en hover
    this.slidesContainer.addEventListener("mouseenter", () =>
      this.pauseAutoSlide()
    );
    this.slidesContainer.addEventListener("mouseleave", () =>
      this.startAutoSlide()
    );
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  pauseAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }
}

// Inicializar el slider cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new PqLinkSlider();
});

// Agregar efecto de carga suave
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
