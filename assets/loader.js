(function initLoader() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const progressBar = loader.querySelector(".progress-bar");

  const totalTime = 5000; // Duración de la animación

  // Animación de barra
  let start = null;
  function animateProgress(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min((elapsed / totalTime) * 100, 100);
    progressBar.style.width = progress + "%";
    if (progress < 100) requestAnimationFrame(animateProgress);
  }
  requestAnimationFrame(animateProgress);

  // Función para mostrar pantalla centrada
  function showContent() {
    loader.style.display = "none";
    content.style.display = "flex";
    document.body.style.overflow = "auto";
  }

  // Mostrar contenido 1 segundo después de que termine el loader
  setTimeout(showContent, totalTime + 1000);
})();
