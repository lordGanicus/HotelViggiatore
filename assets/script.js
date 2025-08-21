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

/*************************************************section info***********************************/
class InfoSlider {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.isAnimating = false;
    this.autoplayInterval = null;
    this.autoplayDelay = 4000;

    this.slideImages = document.querySelectorAll(".info-slide-image");
    this.backgroundImages = document.querySelectorAll(".info-background-image");
    this.navDots = document.querySelectorAll(".info-nav-dot");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.container = document.querySelector(".info-slider-container");

    this.init();
  }

  init() {
    this.bindEvents();
    this.startAutoplay();
    this.preloadImages();
  }

  bindEvents() {
    // Navigation dots
    this.navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Arrow buttons
    this.prevBtn.addEventListener("click", () => this.previousSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.previousSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Pause on hover
    this.container.addEventListener("mouseenter", () => this.pauseAutoplay());
    this.container.addEventListener("mouseleave", () => this.startAutoplay());

    // Touch events for mobile
    let startX = 0;
    let startY = 0;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    this.container.addEventListener(
      "touchend",
      (e) => {
        if (!startX || !startY) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.previousSlide();
          }
        }

        startX = 0;
        startY = 0;
      },
      { passive: true }
    );
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentSlide) return;

    this.isAnimating = true;

    // Remove active class from current images
    this.slideImages[this.currentSlide].classList.remove("active");
    this.backgroundImages[this.currentSlide].classList.remove("active");
    this.navDots[this.currentSlide].classList.remove("active");

    // Update current slide
    this.currentSlide = index;

    // Add active class to new images
    setTimeout(() => {
      this.slideImages[this.currentSlide].classList.add("active");
      this.backgroundImages[this.currentSlide].classList.add("active");
      this.navDots[this.currentSlide].classList.add("active");

      setTimeout(() => {
        this.isAnimating = false;
      }, 100);
    }, 50);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  startAutoplay() {
    this.pauseAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    }, this.autoplayDelay);
  }

  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  preloadImages() {
    const imageUrls = [
      "https://res.cloudinary.com/ddqoou1fq/image/upload/v1754918889/eba5c9a9-cf12-435e-b264-4ea1242bfe22.png",
      "https://res.cloudinary.com/ddqoou1fq/image/upload/v1754918677/84086788-294d-4eb5-82eb-85b2d5dc29be.png",
      "https://res.cloudinary.com/ddqoou1fq/image/upload/v1754918705/4454ecb6-dae5-4785-a968-45de126c6a63.png",
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new InfoSlider();
});

// Handle page visibility change
document.addEventListener("visibilitychange", () => {
  if (window.infoSlider) {
    if (document.visibilityState === "visible") {
      window.infoSlider.startAutoplay();
    } else {
      window.infoSlider.pauseAutoplay();
    }
  }
});
/*************************************SECCION DE HABITACIONES*******************************/
document.addEventListener("DOMContentLoaded", function () {
  // Activar animación del título
  const mainTitle = document.querySelector(".hab-main-title");
  setTimeout(() => {
    mainTitle.classList.add("active");
  }, 300);

  // Configuración del slider
  const slider = document.querySelector(".hab-slider");
  const slides = document.querySelectorAll(".hab-slide");
  const dots = document.querySelectorAll(".hab-slider-dot");
  const prevBtn = document.querySelector(".hab-slider-arrow.prev");
  const nextBtn = document.querySelector(".hab-slider-arrow.next");
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 6000; // 6 segundos

  // Función para cambiar de slide
  function goToSlide(n) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // Función para siguiente slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Función para slide anterior
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Iniciar autoplay - antes limpia cualquier intervalo para evitar duplicados
  function startSlideShow() {
    stopSlideShow(); // aseguramos no tener más de un intervalo activo
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Detener autoplay
  function stopSlideShow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Event listeners para botones
  nextBtn.addEventListener("click", () => {
    stopSlideShow();
    nextSlide();
    startSlideShow();
  });

  prevBtn.addEventListener("click", () => {
    stopSlideShow();
    prevSlide();
    startSlideShow();
  });

  // Event listeners para dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopSlideShow();
      goToSlide(index);
      startSlideShow();
    });
  });

  // Pausar autoplay al poner el mouse sobre el slider
  slider.addEventListener("mouseenter", stopSlideShow);
  slider.addEventListener("mouseleave", startSlideShow);

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      stopSlideShow();
      nextSlide();
      startSlideShow();
    } else if (e.key === "ArrowLeft") {
      stopSlideShow();
      prevSlide();
      startSlideShow();
    }
  });

  // Iniciar slider
  startSlideShow();
});
/****************************************Servicios********************************/
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const serviciosItems = document.querySelectorAll(".servicios-item");
  const serviciosSecciones = document.querySelectorAll(".servicios-seccion");
  const lineaIndicadora = document.querySelector(".servicios-linea-indicadora");
  const botonesVerMas = document.querySelectorAll(".servicios-boton");
  const modales = document.querySelectorAll(".servicios-modal");
  const botonesCerrar = document.querySelectorAll(".servicios-modal-cerrar");

  // Inicializar línea indicadora
  function inicializarLineaIndicadora() {
    const itemActivo = document.querySelector(".servicios-item.active");
    if (itemActivo) {
      const width = itemActivo.offsetWidth;
      const left = itemActivo.offsetLeft;
      lineaIndicadora.style.width = `${width}px`;
      lineaIndicadora.style.left = `${left}px`;
    }
  }

  // Cambiar servicio con animación
  function cambiarServicio(target) {
    // Obtener elementos relevantes
    const seccionActual = document.querySelector(".servicios-seccion.active");
    const nuevaSeccion = document.getElementById(target);

    // Si ya está activo, no hacer nada
    if (nuevaSeccion.classList.contains("active")) return;

    // Desactivar interacciones durante la transición
    serviciosItems.forEach((item) => {
      item.style.pointerEvents = "none";
    });

    // Animación de salida
    seccionActual.classList.add("exit");

    setTimeout(() => {
      // Quitar clases activas
      seccionActual.classList.remove("active", "exit");
      seccionActual.style.display = "none";

      // Preparar nueva sección
      nuevaSeccion.style.display = "flex";
      nuevaSeccion.classList.add("enter");

      setTimeout(() => {
        // Animación de entrada
        nuevaSeccion.classList.add("active");
        nuevaSeccion.classList.remove("enter");

        // Reactivar interacciones
        serviciosItems.forEach((item) => {
          item.style.pointerEvents = "all";
        });
      }, 20);
    }, 600); // Tiempo igual a la duración de la transición CSS
  }

  // Event listeners para items de navegación
  serviciosItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Quitar clase active de todos los items
      serviciosItems.forEach((i) => i.classList.remove("active"));

      // Añadir clase active al item clickeado
      this.classList.add("active");

      // Mover línea indicadora con animación
      const width = this.offsetWidth;
      const left = this.offsetLeft;
      lineaIndicadora.style.width = `${width}px`;
      lineaIndicadora.style.left = `${left}px`;

      // Cambiar servicio
      const target = this.getAttribute("data-target");
      cambiarServicio(target);
    });
  });

  // Abrir modal con animación
  botonesVerMas.forEach((boton) => {
    boton.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      // Mostrar modal
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      // Trigger reflow para reiniciar animación
      void modal.offsetWidth;

      // Aplicar clase para animación
      modal.classList.add("show");

      // Inicializar slider
      const slider = modal.querySelector(".servicios-slider");
      const slides = slider.querySelectorAll(".servicios-slide");
      slides.forEach((slide, index) => {
        if (index === 0) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
    });
  });

  // Cerrar modal con animación
  botonesCerrar.forEach((boton) => {
    boton.addEventListener("click", function () {
      const modal = this.closest(".servicios-modal");

      // Quitar clase para animación
      modal.classList.remove("show");

      // Esperar a que termine la animación para ocultar
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }, 300);
    });
  });

  // Cerrar modal al hacer clic fuera
  modales.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        // Quitar clase para animación
        this.classList.remove("show");

        // Esperar a que termine la animación para ocultar
        setTimeout(() => {
          this.style.display = "none";
          document.body.style.overflow = "auto";
        }, 300);
      }
    });
  });

  // Control de sliders
  document.querySelectorAll(".servicios-slider").forEach((slider) => {
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const slides = slider.querySelectorAll(".servicios-slide");
    let currentSlide = 0;

    function showSlide(index) {
      // Ocultar slide actual con animación
      slides[currentSlide].classList.remove("active");

      // Mostrar nuevo slide con animación
      currentSlide = index;
      slides[currentSlide].classList.add("active");
    }

    prevBtn.addEventListener("click", function () {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    });

    nextBtn.addEventListener("click", function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    });
  });

  // Inicializar
  inicializarLineaIndicadora();

  // Configurar secciones inactivas
  serviciosSecciones.forEach((seccion) => {
    if (!seccion.classList.contains("active")) {
      seccion.style.display = "none";
    }
  });
});
/******************************Sala de reuniones*************************** */
document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".sala-content");
  const moreButton = document.querySelector(".sala-more");
  const modal = document.getElementById("salaModal");
  const modalContent = document.querySelector(".sala-modal-content");
  const closeButton = document.querySelector(".sala-modal-close");

  // Optimización de animaciones
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    // Mostrar contenido con retraso para el efecto de entrada
    setTimeout(() => {
      content.classList.add("sala-visible");
    }, 300);
  } else {
    content.classList.add("sala-visible");
  }

  // Efecto al hacer scroll optimizado
  let lastScrollPosition = 0;
  let ticking = false;
  let animationFrameId = null;

  const handleScroll = (scrollPos) => {
    const contentPosition = content.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (contentPosition < screenPosition) {
      content.classList.add("sala-visible");
    } else {
      content.classList.remove("sala-visible");
    }

    // Efecto de salida cuando se hace scroll hacia abajo
    if (scrollPos > 50) {
      content.classList.add("sala-exit");
    } else {
      content.classList.remove("sala-exit");
    }
  };

  const scrollThrottler = () => {
    if (!ticking) {
      animationFrameId = window.requestAnimationFrame(function () {
        handleScroll(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", scrollThrottler, { passive: true });

  // Abrir modal optimizado
  moreButton.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      // Forzar reflow para activar la animación
      void modal.offsetWidth;

      modalContent.classList.add("sala-active");
    },
    { passive: true }
  );

  // Cerrar modal
  const closeModal = () => {
    modalContent.classList.remove("sala-active");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 400);
  };

  closeButton.addEventListener("click", closeModal);

  // Cerrar al hacer clic fuera del contenido
  modal.addEventListener("click", function (e) {
    if (
      e.target === modal ||
      e.target === document.querySelector(".sala-modal-overlay")
    ) {
      closeModal();
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  // Limpieza al desmontar
  window.addEventListener("beforeunload", function () {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener("scroll", scrollThrottler);
  });
});
/************************************************turismo****************** */
class TurismoSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".turismo-slide");
    this.dots = document.querySelectorAll(".turismo-dot");
    this.prevBtn = document.querySelector(".turismo-prev");
    this.nextBtn = document.querySelector(".turismo-next");
    this.autoPlayInterval = null;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    this.startAutoPlay();

    // Pausar autoplay al hover
    const container = document.querySelector(".turismo-slider");
    container.addEventListener("mouseenter", () => this.stopAutoPlay());
    container.addEventListener("mouseleave", () => this.startAutoPlay());

    // Touch events para móvil
    this.addTouchEvents();
  }

  addTouchEvents() {
    const slider = document.querySelector(".turismo-slider");
    let startX = 0;
    let endX = 0;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });

    slider.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
  }

  handleSwipe() {
    const difference = startX - endX;
    const threshold = 50;

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return;

    this.isTransitioning = true;

    // Remover clase active de slide y dot actuales
    this.slides[this.currentSlide].classList.remove("active");
    this.dots[this.currentSlide].classList.remove("active");

    // Actualizar índice
    this.currentSlide = index;

    // Agregar clase active a nuevos elementos
    setTimeout(() => {
      this.slides[this.currentSlide].classList.add("active");
      this.dots[this.currentSlide].classList.add("active");

      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    }, 50);

    this.restartAutoPlay();
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// Inicializar slider cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new TurismoSlider();
});

// Efectos adicionales de entrada
window.addEventListener("load", () => {
  const section = document.querySelector(".turismo-section");
  section.style.opacity = "0";
  section.style.transform = "scale(0.95)";
  section.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";

  setTimeout(() => {
    section.style.opacity = "1";
    section.style.transform = "scale(1)";
  }, 100);
});

// Optimización para dispositivos móviles
if ("ontouchstart" in window) {
  document.querySelector(".turismo-section").classList.add("touch-device");
}
/*************************************************Secion de paquietes principal */
// Intersection Observer para animaciones de entrada
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observar elementos animados
document.querySelectorAll(".pq-header, .pq-gallery, .pq-card").forEach((el) => {
  observer.observe(el);
});

// Efecto de paralaje suave en scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".pq-section");
  const speed = scrolled * 0.1;

  /* parallax.style.transform = `translateY(${speed}px)`;*/
});

// Mejora de accesibilidad - soporte para teclado
document.querySelectorAll(".pq-card").forEach((card, index) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute(
    "aria-label",
    `Ver detalles de ${card.querySelector(".pq-card-title").textContent}`
  );

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.querySelector(".pq-card-link").click();
    }
  });

  // Efecto hover mejorado para móviles
  card.addEventListener("touchstart", () => {
    card.classList.add("touch-active");
  });

  card.addEventListener("touchend", () => {
    setTimeout(() => {
      card.classList.remove("touch-active");
    }, 300);
  });
});

// Optimización de rendimiento - debounce para resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recalcular animaciones si es necesario
    const cards = document.querySelectorAll(".pq-card");
    cards.forEach((card) => {
      card.style.transition = "none";
      setTimeout(() => {
        card.style.transition = "";
      }, 10);
    });
  }, 250);
});

// Preload de imágenes para mejor rendimiento
const imageUrls = [
  "https://res.cloudinary.com/ds9subkxg/image/upload/v1755487558/e6a50346-6385-49a0-a484-9bbd56c0e3d1.png",
  "https://res.cloudinary.com/ds9subkxg/image/upload/v1755487644/05f0b2f2-0e2a-469a-98cd-c6730e804d87.png",
  "https://res.cloudinary.com/ds9subkxg/image/upload/v1755487674/47915b25-d466-49c8-af8f-6ddb29b401af.png",
  "https://res.cloudinary.com/ds9subkxg/image/upload/v1755487723/c049c522-5c77-4196-991c-c51ca066494d.png",
];

imageUrls.forEach((url) => {
  const img = new Image();
  img.src = url;
});
/******************************Seccion de testimonios****************************/
// Efecto de entrada escalonada
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".test-card");
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isTablet = window.matchMedia(
    "(min-width: 768px) and (max-width: 1024px)"
  ).matches;

  // Función para mostrar las tarjetas con efecto escalonado
  function showCards() {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
        if (isMobile) {
          card.style.animation = `slideInMobile 0.5s ease forwards ${
            index * 0.2
          }s`;
        }
      }, index * 200);
    });
  }

  // Mostrar tarjetas cuando la sección es visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showCards();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(document.querySelector(".test-section"));

  // Efecto hover para las estrellas
  const stars = document.querySelectorAll(".test-star");
  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.3)";
      this.style.color = "white";
    });

    star.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)";
      if (this.textContent === "★") {
        this.style.color = "#FFD700";
      } else {
        this.style.color = "#FFD700";
      }
    });
  });

  // Para móviles: manejar indicadores del slider
  if (isMobile) {
    setupMobileSlider();
  }
});

function setupMobileSlider() {
  const container = document.querySelector(".test-container");
  const indicators = document.querySelectorAll(".indicator");

  // Actualizar indicadores al hacer scroll
  container.addEventListener("scroll", () => {
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.children[0].offsetWidth + 15; // + gap
    const activeIndex = Math.round(scrollPosition / cardWidth);

    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  });

  // Hacer clic en indicadores para navegar
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.getAttribute("data-index"));
      const cardWidth = container.children[0].offsetWidth + 15;
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    });
  });
}

// Efecto de salida (puedes activarlo cuando sea necesario)
function hideCards() {
  const cards = document.querySelectorAll(".test-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = `slideOutToRight 0.5s ease forwards ${
        index * 0.1
      }s`;
    }, index * 100);
  });
}
/*********************************Ubicacion*****************************/
document.addEventListener("DOMContentLoaded", function () {
  // Efecto de aparición suave
  const elements = document.querySelectorAll(
    ".ubi-title, .ubi-subtitle, .ubi-map-container, .ubi-info-panel, .ubi-gps-text"
  );

  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200 * index);

    // Estilos iniciales para la animación
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Interacción con el mapa
  const mapContainer = document.querySelector(".ubi-map-container");
  const map = document.querySelector(".ubi-map");

  mapContainer.addEventListener("mouseenter", () => {
    map.style.filter = "grayscale(0%) contrast(100%) saturate(100%)";
  });

  mapContainer.addEventListener("mouseleave", () => {
    map.style.filter = "grayscale(15%) contrast(105%) saturate(110%)";
  });

  // Efecto de click en el botón
  const actionBtn = document.querySelector(".ubi-action-btn");

  actionBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Efecto de pulsación
    this.style.transform = "translateY(0) scale(0.98)";

    setTimeout(() => {
      this.style.transform = "translateY(-3px) scale(1)";
      // Aquí podrías añadir la funcionalidad real
      alert("Redirigiendo a las indicaciones de cómo llegar...");
    }, 200);
  });

  // Mostrar coordenadas al hacer hover en GPS
  const gpsText = document.querySelector(".ubi-gps-text");
  const originalGpsText = gpsText.textContent;

  gpsText.addEventListener("mouseenter", () => {
    gpsText.textContent = "Copiar coordenadas";
  });

  gpsText.addEventListener("mouseleave", () => {
    gpsText.textContent = originalGpsText;
  });

  gpsText.addEventListener("click", () => {
    navigator.clipboard.writeText("-17.3776, -66.1567");
    const originalText = gpsText.textContent;
    gpsText.textContent = "¡Coordenadas copiadas!";

    setTimeout(() => {
      gpsText.textContent = originalGpsText;
    }, 2000);
  });
});

/****************************PED friendly*****************************/
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM completamente cargado");

  const pawBtn = document.getElementById("paw-btn");
  const petPanel = document.getElementById("petPanel");
  const closePanel = document.getElementById("closePanel");
  const overlay = document.getElementById("overlay");

  console.log("🔎 Elementos encontrados:", {
    pawBtn,
    petPanel,
    closePanel,
    overlay,
  });

  if (!pawBtn || !petPanel || !closePanel || !overlay) {
    console.error("⚠️ Uno o más elementos no existen en el DOM");
    return;
  }

  // Abrir panel al hacer clic en el botón de patita
  pawBtn.addEventListener("click", () => {
    console.log("👉 Click en pawBtn");
    petPanel.classList.add("open");
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    console.log("📂 Panel abierto");
  });

  // Cerrar panel al hacer clic en el botón de cerrar
  closePanel.addEventListener("click", () => {
    console.log("❌ Click en closePanel");
    closePetPanel();
  });

  // Cerrar panel al hacer clic fuera del panel
  overlay.addEventListener("click", () => {
    console.log("🖱️ Click en overlay (fuera del panel)");
    closePetPanel();
  });

  // Función para cerrar el panel
  function closePetPanel() {
    console.log("🔒 Cerrando panel...");
    petPanel.classList.remove("open");
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    console.log("✅ Panel cerrado");
  }

  // Cerrar panel con la tecla Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      console.log("⌨️ Escape presionado");
      closePetPanel();
    }
  });
});
/**********************************script para las redes sociales de la parte derecha inferior*******************************/
document.getElementById("chatme").addEventListener("click", () => {
  document.querySelector(".widget").classList.toggle("open");
});
$("#chatme").click(function () {
  $(".widget").toggleClass("open");
});
