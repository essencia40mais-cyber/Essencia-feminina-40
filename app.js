// Aguarda o documento carregar
document.addEventListener("DOMContentLoaded", () => {
    
    // Toggle para o Menu Mobile
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Fechar menu ao clicar num link no modo mobile
    document.querySelectorAll(".nav-links li a").forEach(link => {
        link.addEventListener("click", () => {
            if(navLinks.classList.contains("active")){
                navLinks.classList.remove("active");
            }
        });
    });

    // Scroll Suave (Smooth Scrolling)
    const linksScrollSuave = document.querySelectorAll('a[href^="#"]');

    linksScrollSuave.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Considera a altura do cabeçalho fixo para não cobrir o título
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
