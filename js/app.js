document.addEventListener("DOMContentLoaded", function () {
  // Fecha outros conteúdos quando abre um novo
  function closeAll() {
    document.querySelectorAll(".swiper-slide").forEach((slide) => {
      slide.classList.remove("active");
    });
  }

  // Evento para o botão Saber Mais
  document.querySelectorAll(".saiba-mais-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const slide = this.closest(".swiper-slide");

      if (slide.classList.contains("active")) {
        slide.classList.remove("active");
      } else {
        closeAll();
        slide.classList.add("active");
      }
    });
  });

  // Evento para o botão Fechar
  document.querySelectorAll(".fechar").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      this.closest(".swiper-slide").classList.remove("active");
    });
  });

  // Fecha ao clicar fora
  document.addEventListener("click", function () {
    closeAll();
  });

  const linksInternos = document.querySelectorAll('li a[href^="#"]');
  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);

    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });

    document.querySelector(".pp-advanced-menu--dropdown").classList.remove("pp-menu-open");
    document.querySelector(".pp-menu-toggle").classList.remove("pp-active");
  }

  linksInternos.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });

  document
    .querySelector(".arrow-float")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
});
