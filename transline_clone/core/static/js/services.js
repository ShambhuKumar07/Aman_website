

// ==============================
// 🔥 SCROLL REVEAL
// ==============================

const cards = document.querySelectorAll(".service-card-premium");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => {
    observer.observe(card);
});


// ==============================
// 🎯 3D TILT EFFECT
// ==============================

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * 10;
        const rotateY = (x / rect.width - 0.5) * -10;

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "rotateX(0) rotateY(0)";

    });

});


// ==============================
// 💡 MOUSE GLOW EFFECT
// ==============================

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            '--x',
            `${e.clientX - rect.left}px`
        );

        card.style.setProperty(
            '--y',
            `${e.clientY - rect.top}px`
        );

    });

});


// ==============================
// 🚀 SERVICES MENU
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    // Mobile Services Menu Toggle

    const servicesToggle =
        document.getElementById("servicesToggle");

    const servicesMenu =
        document.getElementById("servicesMenu");

    if (servicesToggle && servicesMenu) {

        servicesToggle.addEventListener("click", function (e) {

            if (window.innerWidth <= 992) {

                e.preventDefault();

                servicesMenu.classList.toggle("active");

            }

        });

    }

    // Parent → Child Expand / Collapse

    const submenuToggles =
        document.querySelectorAll(".toggle-submenu");

    submenuToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function (e) {

            e.preventDefault();

            this.classList.toggle("active");

            const submenu =
                this.nextElementSibling;

            if (submenu) {

                submenu.classList.toggle("active");

            }

        });

    });

});