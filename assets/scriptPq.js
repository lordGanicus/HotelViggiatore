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

// Get images from HTML
function getImagesFromHTML() {
  const imageElements = document.querySelectorAll(".pqInfo-pagination-bullet");
  const images = [];

  imageElements.forEach((bullet) => {
    const index = parseInt(bullet.dataset.slide);
    const img = document.querySelector(
      `.pqInfo-slide-image[data-index="${index}"]`
    );
    if (img) images.push(img.src);
  });

  return images;
}

function updateSlider() {
  if (isTransitioning) return;
  isTransitioning = true;

  const leftSlide = document.getElementById("leftSlide").querySelector("img");
  const centerSlide = document
    .getElementById("centerSlide")
    .querySelector("img");
  const rightSlide = document.getElementById("rightSlide").querySelector("img");

  const images = Array.from(
    document.querySelectorAll(".pqInfo-pagination-bullet")
  ).map(
    (b, i) =>
      document.querySelector(`.pqInfo-slide-image[data-index="${i}"]`).src
  );

  // Calcular índices
  const leftIndex = (currentSlide - 1 + images.length) % images.length;
  const rightIndex = (currentSlide + 1) % images.length;

  // Actualizar imágenes
  leftSlide.src = images[leftIndex];
  leftSlide.setAttribute("data-index", leftIndex);

  centerSlide.src = images[currentSlide];
  centerSlide.setAttribute("data-index", currentSlide);

  rightSlide.src = images[rightIndex];
  rightSlide.setAttribute("data-index", rightIndex);

  updatePagination(currentSlide);

  // Reset flag after animation duration
  setTimeout(() => {
    isTransitioning = false;
  }, 600);
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
function openModal() {
  // Obtener SIEMPRE la imagen central
  const centerImg = document.querySelector("#centerSlide img");
  const index = parseInt(centerImg.dataset.index);

  const images = getImagesFromHTML();
  modalCurrentSlide = index;

  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = images[index];
  modal.classList.add("active");

  document.body.style.overflow = "hidden"; // Prevent scroll
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore scroll
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

// Close modal with ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Hearts animation
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

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 6000);
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  updateSlider(); // inicializa en la posición correcta

  // Hearts init
  setTimeout(() => {
    createHearts(5);
  }, 1000);

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
        link: "luna.html",
      },
      {
        title: "NOCHE ROMÁNTICA",
        subtitle: "Inolvidable",
        description:
          "Disfruta de momentos únicos junto a tu pareja y asegura tu paquete hoy mismo.",
        image:
          "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755718153/3f6e4bd1-2bec-46f3-8ffe-a1591e9b43de.png",
        link: "nocheR.html",
      },
      {
        title: "ESCAPADA ROMÁNTICA",
        subtitle: "Instantes que enamoran",
        description:
          "Una experiencia única junto a tu pareja. No dejes pasar la oportunidad de reservar tu paquete y disfrutar del romance.",
        image:
          "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755718454/b0e433d7-5b45-4e7c-9648-9516dc95e158.png",
        link: "escapadaR.html",
      },
      {
        title: "LUNA DE MIEL",
        subtitle: "Recuerdos que perduran",
        description:
          "Disfruta de una experiencia única e inolvidable junto a tu pareja. No dejes pasar la oportunidad de reservar tu paquete.",
        image:
          "https://res.cloudinary.com/ddqoou1fq/image/upload/v1755707869/bb311f4e-c615-4f57-b7f3-ea03ccc7dde3.png",
        link: "luna.html",
      },
    ];

    // Obtener contenedor y botones
    this.slidesContainer = document.getElementById("pqLinkSlidesContainer");
    this.leftBtn = document.querySelector(".pqLink-nav-left");
    this.rightBtn = document.querySelector(".pqLink-nav-right");

    // Leer desde HTML el slide inicial
    const startSlide = parseInt(this.slidesContainer.dataset.startSlide);
    this.currentSlideIndex = isNaN(startSlide) ? 0 : startSlide;

    this.init();
  }

  init() {
    this.renderSlides();
    this.bindEvents();
    this.startAutoSlide();
  }

  renderSlides() {
    const slide1 = this.slides[this.currentSlideIndex];
    const slide2 =
      this.slides[(this.currentSlideIndex + 1) % this.slides.length];

    this.slidesContainer.innerHTML = `
      <a href="${slide1.link}" class="pqLink-slide" data-slide="${
      this.currentSlideIndex
    }">
        <div class="pqLink-slide-image" style="background-image: url('${
          slide1.image
        }');"></div>
        <div class="pqLink-slide-overlay"></div>
        <div class="pqLink-slide-content">
          <h2 class="pqLink-slide-title">${slide1.title}</h2>
          <p class="pqLink-slide-subtitle">${slide1.subtitle}</p>
          <div class="pqLink-slide-line"></div>
          <p class="pqLink-slide-description">${slide1.description}</p>
        </div>
      </a>
      <a href="${slide2.link}" class="pqLink-slide" data-slide="${
      (this.currentSlideIndex + 1) % this.slides.length
    }">
        <div class="pqLink-slide-image" style="background-image: url('${
          slide2.image
        }');"></div>
        <div class="pqLink-slide-overlay"></div>
        <div class="pqLink-slide-content">
          <h2 class="pqLink-slide-title">${slide2.title}</h2>
          <p class="pqLink-slide-subtitle">${slide2.subtitle}</p>
          <div class="pqLink-slide-line"></div>
          <p class="pqLink-slide-description">${slide2.description}</p>
        </div>
      </a>
    `;

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

document.addEventListener("DOMContentLoaded", () => {
  new PqLinkSlider();
});

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
