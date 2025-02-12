document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll("nav a");

    // Animation du header au scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Animation des sections au scroll
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });

    // Défilement fluide vers la section lorsqu'on clique sur un lien
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Empêche le comportement par défaut des liens

            const targetId = this.getAttribute("href").substring(1); // Récupère l'ID de la section cible
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight; // Récupère la hauteur du header
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight, // Utilise la hauteur du header pour éviter qu'il ne cache la section
                    behavior: "smooth" // Active l'animation de défilement fluide
                });
            }
        });
    });
});
