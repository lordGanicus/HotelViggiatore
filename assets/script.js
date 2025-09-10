document.addEventListener("DOMContentLoaded", () => {
  // Inicializar Swiper
  const swiper = new Swiper(".swiper", {
    // Efecto de transición: fade para un cambio suave
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    // Velocidad de transición
    speed: 1000,
    // Loop infinito
    loop: true,
    // Autoplay con intervalo de 5 segundos
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    // Paginación
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Navegación
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

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
    stopSlideShow();
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

  // =====================
  //   🚀 Soporte TOUCH
  // =====================
  let startX = 0;
  let endX = 0;
  const threshold = 50; // distancia mínima para considerar swipe

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    const distance = startX - endX;
    if (Math.abs(distance) > threshold) {
      stopSlideShow();
      if (distance > 0) {
        // Swipe izquierda -> siguiente
        nextSlide();
      } else {
        // Swipe derecha -> anterior
        prevSlide();
      }
      startSlideShow();
    }
  });

  // Iniciar slider
  startSlideShow();
});

/****************************************Servicios********************************/
/*document.addEventListener("DOMContentLoaded", function () {
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
});*/
/******************************Sala de reuniones*************************** */
/*document.addEventListener("DOMContentLoaded", function () {
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
});*/
/************************************************turismo*******************/
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
    // Botones prev/next
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Navegación con dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Autoplay
    this.startAutoPlay();

    // Pausar autoplay al hover (desktop)
    const container = document.querySelector(".turismo-slider");
    container.addEventListener("mouseenter", () => this.stopAutoPlay());
    container.addEventListener("mouseleave", () => this.startAutoPlay());

    // Eventos táctiles (móviles)
    this.addTouchEvents();
  }

  addTouchEvents() {
    const slider = document.querySelector(".turismo-slider");
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      this.handleSwipe(startX, endX);
    });

    slider.addEventListener(
      "touchmove",
      (e) => {
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        const deltaY = Math.abs(e.touches[0].clientY - startY);

        // ✅ Solo bloquea scroll si es swipe horizontal
        if (deltaX > deltaY) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  handleSwipe(startX, endX) {
    const difference = startX - endX;
    const threshold = 50; // Sensibilidad del swipe (px)

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        // Swipe hacia la izquierda → siguiente
        this.nextSlide();
      } else {
        // Swipe hacia la derecha → anterior
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
class TestimonioSlider {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 5;
    this.autoPlayInterval = 5000;
    this.autoPlayTimer = null;
    this.isAnimating = false;
    this.isDragging = false;
    this.startPos = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.animationID = null;
    this.dragThreshold = 50;

    this.slider = document.getElementById("testimonioSlider");
    this.slides = this.slider.querySelectorAll(".testimonio-slide");
    this.prevBtn = document.getElementById("testimonioPrev");
    this.nextBtn = document.getElementById("testimonioNext");
    this.indicators = document.querySelectorAll(".testimonio-indicator");
    this.section = document.getElementById("testimonios");

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAutoPlay();
    this.setupIntersectionObserver();
  }

  setupEventListeners() {
    // Botones de navegación
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Pausar autoplay en hover
    this.section.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.section.addEventListener("mouseleave", () => this.startAutoPlay());

    // Eventos para el arrastre con mouse
    this.slider.addEventListener("mousedown", this.dragStart.bind(this));
    this.slider.addEventListener("mousemove", this.drag.bind(this));
    this.slider.addEventListener("mouseup", this.dragEnd.bind(this));
    this.slider.addEventListener("mouseleave", this.dragEnd.bind(this));

    // Eventos para el touch
    this.slider.addEventListener("touchstart", this.dragStart.bind(this));
    this.slider.addEventListener("touchmove", this.drag.bind(this));
    this.slider.addEventListener("touchend", this.dragEnd.bind(this));

    // Prevenir el menú contextual en el slider
    this.slider.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  dragStart(e) {
    if (this.isAnimating) return;

    // Detener el autoplay durante el arrastre
    this.stopAutoPlay();

    // Obtener la posición inicial
    if (e.type === "touchstart") {
      this.startPos = e.touches[0].clientX;
    } else {
      this.startPos = e.clientX;
      e.preventDefault(); // Prevenir selección de texto
    }

    this.isDragging = true;
    this.prevTranslate = this.currentTranslate;

    // Iniciar animación
    this.animationID = requestAnimationFrame(this.animation.bind(this));

    // Cambiar cursor
    this.slider.style.cursor = "grabbing";
  }

  drag(e) {
    if (!this.isDragging) return;

    let currentPosition;
    if (e.type === "touchmove") {
      currentPosition = e.touches[0].clientX;
    } else {
      currentPosition = e.clientX;
    }

    // Calcular la distancia arrastrada
    this.currentTranslate =
      this.prevTranslate + currentPosition - this.startPos;
  }

  dragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    cancelAnimationFrame(this.animationID);

    // Restaurar cursor
    this.slider.style.cursor = "grab";

    // Determinar si se debe cambiar de slide basado en el umbral
    const movedBy = this.currentTranslate;

    if (movedBy < -this.dragThreshold) {
      // Arrastre hacia la izquierda - siguiente slide
      this.nextSlide();
    } else if (movedBy > this.dragThreshold) {
      // Arrastre hacia la derecha - slide anterior
      this.prevSlide();
    }

    // Reiniciar la posición
    this.currentTranslate = 0;
    this.prevTranslate = 0;

    // Reiniciar autoplay
    this.startAutoPlay();
  }

  animation() {
    this.setSliderPosition();
    if (this.isDragging) {
      requestAnimationFrame(this.animation.bind(this));
    }
  }

  setSliderPosition() {
    // Para un efecto más suave durante el arrastre
    // En este caso, solo actualizamos la posición durante el arrastre
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateIn();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.section);
  }

  animateIn() {
    const header = this.section.querySelector(".testimonio-header");
    header.classList.add("testimonio-animate");

    // Animar el slide actual con retraso
    setTimeout(() => {
      const currentSlide = this.slides[this.currentSlide];
      currentSlide.classList.add("testimonio-slide-enter-active");
    }, 400);
  }

  goToSlide(slideIndex) {
    if (this.isAnimating || slideIndex === this.currentSlide) return;

    this.isAnimating = true;

    // Remover clase active del slide actual
    this.slides[this.currentSlide].classList.remove("testimonio-active");
    this.slides[this.currentSlide].classList.add("testimonio-prev");

    // Remover active del indicador actual
    this.indicators[this.currentSlide].classList.remove("testimonio-active");

    // Actualizar índice
    this.currentSlide = slideIndex;

    // Activar nuevo slide con animación
    setTimeout(() => {
      this.slides[this.currentSlide].classList.remove("testimonio-prev");
      this.slides[this.currentSlide].classList.add(
        "testimonio-active",
        "testimonio-slide-enter-active"
      );
      this.indicators[this.currentSlide].classList.add("testimonio-active");

      // Limpiar clases después de la animación
      setTimeout(() => {
        this.slides.forEach((slide) => {
          slide.classList.remove(
            "testimonio-prev",
            "testimonio-slide-enter-active"
          );
        });
        this.isAnimating = false;
      }, 600);
    }, 50);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}

// Inicializar el slider cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  new TestimonioSlider();
});

// Reiniciar en cambio de tamaño de ventana
window.addEventListener("resize", () => {
  // Opcional: Reinicializar slider en cambios de tamaño si es necesario
});
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
/*************************Nueva seccion de desayunos***************************/
document.addEventListener("DOMContentLoaded", function () {
  // Modal functionality
  const modal = document.getElementById("desy-modal");
  const openModalBtn = document.getElementById("desy-open-modal");
  const closeModalBtn = document.getElementById("desy-close-modal");

  openModalBtn.addEventListener("click", function () {
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevenir scroll del body
  });

  closeModalBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // Permitir scroll nuevamente
  });

  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Slider functionality
  const slides = document.querySelectorAll(".desy-slide");
  const dots = document.querySelectorAll(".desy-slider-dot");
  const prevBtn = document.querySelector(".desy-slider-arrow.prev");
  const nextBtn = document.querySelector(".desy-slider-arrow.next");
  const slider = document.querySelector(".desy-slider");
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // ⏱ tiempo entre slides (5 seg)

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
  }

  function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
  }

  function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
  }

  // Autoplay
  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Navegación con botones
  prevBtn.addEventListener("click", function () {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  nextBtn.addEventListener("click", function () {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  // Navegación con dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      stopAutoPlay();
      showSlide(slideIndex);
      startAutoPlay();
    });
  });

  // Navegación con teclado
  document.addEventListener("keydown", function (e) {
    if (modal.classList.contains("active")) {
      if (e.key === "ArrowLeft") {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      } else if (e.key === "ArrowRight") {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      } else if (e.key === "Escape") {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    }
  });

  // =====================
  // Soporte TOUCH (móvil y tablet)
  // =====================
  let startX = 0;
  let endX = 0;
  const threshold = 50;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    const distance = startX - endX;
    if (Math.abs(distance) > threshold) {
      stopAutoPlay();
      if (distance > 0) {
        nextSlide(); // swipe izquierda
      } else {
        prevSlide(); // swipe derecha
      }
      startAutoPlay();
    }
  });

  // Iniciar autoplay apenas carga
  startAutoPlay();
});

/**********************************script para las redes sociales de la parte derecha inferior*******************************/
document.getElementById("chatme").addEventListener("click", () => {
  document.querySelector(".widget").classList.toggle("open");
});
/**************************************Nueva seccion info new ************************************ */
const observerInfonewOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerInfonew = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionElement = entry.target;

    if (entry.isIntersecting) {
      //  ahora verifico qué sección es y le doy su clase propia
      if (sectionElement.classList.contains("infonew-section")) {
        sectionElement.classList.add("infonew-active");
      }
      if (sectionElement.classList.contains("desy-section")) {
        sectionElement.classList.add("desy-active");
      }
      if (sectionElement.classList.contains("pq-section")) {
        sectionElement.classList.add("pq-active");
      }
    }
  });
}, observerInfonewOptions);

// Observar las dos secciones
const sectionTarget = document.querySelector(".infonew-section");
const sectionTarget2 = document.querySelector(".desy-section");
observerInfonew.observe(sectionTarget);
observerInfonew.observe(sectionTarget2);
const sectionTarget3 = document.querySelector(".pq-section");
observerInfonew.observe(sectionTarget3);

// Efecto de seguimiento del mouse (solo en infonew-section)
if (window.matchMedia("(hover: hover)").matches) {
  sectionTarget.addEventListener("mousemove", (e) => {
    const rect = sectionTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    sectionTarget.style.setProperty("--mouse-x", x + "%");
    sectionTarget.style.setProperty("--mouse-y", y + "%");
  });
}

let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const sectionElement = document.querySelector(".infonew-section");
  const background = sectionElement.querySelector(".infonew-background");

  if (
    sectionElement &&
    background &&
    sectionElement.classList.contains("infonew-active")
  ) {
    const sectionTop = sectionElement.offsetTop;
    const sectionHeight = sectionElement.offsetHeight;
    const windowHeight = window.innerHeight;

    if (
      scrolled + windowHeight > sectionTop &&
      scrolled < sectionTop + sectionHeight
    ) {
      const rate = (scrolled - sectionTop) * -0.3;
      background.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

if (window.innerWidth > 768) {
  window.addEventListener("scroll", requestTick);
}

const fontPreload = document.createElement("link");
fontPreload.rel = "preload";
fontPreload.href =
  "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&display=swap";
fontPreload.as = "style";
document.head.appendChild(fontPreload);

sectionTarget.addEventListener("transitionend", (e) => {
  if (
    e.target.classList.contains("infonew-title") &&
    sectionTarget.classList.contains("infonew-active")
  ) {
    console.log("Animación del Hotel Viaggiatore completada");
  }
});
