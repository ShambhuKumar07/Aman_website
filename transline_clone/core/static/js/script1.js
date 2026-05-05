// =============================
// 🔥 RUN AFTER DOM LOAD
// =============================
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 🔥 STICKY NAVBAR
    // =========================
    window.addEventListener("scroll", function () {
        let navbar = document.getElementById("navbar");
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    // =========================
    // ✨ SCROLL ANIMATION (FADE + LEFT + RIGHT)
    // =========================
    const elements = document.querySelectorAll(".fade-in, .animate-left, .animate-right");

    function showOnScroll() {
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (position < screenHeight - 100) {
                // el.classList.add("show");
                el.classList.add("animate-show");
            }
        });
    }

    window.addEventListener("scroll", showOnScroll);
    showOnScroll(); // run on load

    // =========================
    // 📩 AJAX CONTACT FORM
    // =========================
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(e){
            e.preventDefault();

            let formData = new FormData(this);

            fetch("/contact/", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                let msg = document.getElementById("successMsg");
                if (msg) {
                    msg.innerText = "Message Sent Successfully!";
                    msg.style.color = "green";
                }
                form.reset();
            })
            .catch(() => {
                let msg = document.getElementById("successMsg");
                if (msg) {
                    msg.innerText = "Something went wrong!";
                    msg.style.color = "red";
                }
            });
        });
    }

    // =========================
    // 🔥 HERO SLIDER
    // =========================
    const slides = document.querySelectorAll(".hero-slide");
    let index = 0;

    function showSlide(i) {
        if (slides.length === 0) return;

        index = (i + slides.length) % slides.length;

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    // auto slide (4 sec)
    setInterval(() => {
        showSlide(index + 1);
    }, 3000);

    // initial load
    showSlide(index);

    // =========================
    // 🔥 ARROW CONTROLS
    // =========================
    window.nextSlide = function () {
        showSlide(index + 1);
    };

    window.prevSlide = function () {
        showSlide(index - 1);
    };

});



// =========================
// 📊 COUNTER ANIMATION
// =========================
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    counter.innerText = "0";

    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
});


// =========================
// 🌊 PARALLAX EFFECT
// =========================
window.addEventListener("scroll", function () {
    const bg = document.querySelector(".services-bg");
    if (bg) {
        let offset = window.scrollY;
        bg.style.transform = `translateY(${offset * 0.3}px)`;
    }
});




// PRODUCTS animation
const productCards = document.querySelectorAll(".product-card");

const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

productCards.forEach(card => observer3.observe(card));


// glow effect mouse
productCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});



// INDUSTRIES animation
const industryCards = document.querySelectorAll(".industry-card");

const observer4 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

industryCards.forEach(card => observer4.observe(card));

// glow mouse effect
industryCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});





// footer animation
const footer = document.querySelector(".footer-section");

const observerFooter = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add("show");
        }
    });
});

if (footer) observerFooter.observe(footer);








// contact


document.getElementById("contactForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    let formData = new FormData(this);

    fetch("/contact/", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("successMsg").innerText = "✅ Message sent successfully!";
        this.reset();
    });
});


// why
// =========================
// 🔥 WHY CHOOSE US COUNTER (FINAL)
// =========================

// const whyCounters = document.querySelectorAll(".why-counter");

const whyCounters = document.querySelectorAll(".why-number");

const whyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            whyCounters.forEach(counter => {

                const originalText = counter.innerText;
                const target = parseInt(originalText.replace(/\D/g, ''));

                let count = 0;

                const update = () => {
                    const inc = target / 80;

                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count) + "+";
                        setTimeout(update, 20);
                    } else {
                        counter.innerText = originalText;
                    }
                };

                update();
            });

            whyObserver.disconnect(); // run only once
        }
    });
});

// observe section
const whySection = document.querySelector(".why-section");
if (whySection) whyObserver.observe(whySection);


// =============================
// 🎬 CERTIFICATION AUTO SLIDER
// =============================

// =============================
// 🎬 CERTIFICATION PRO MAX FIXED
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("certSlider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let cardWidth = 325;
    let index = 0;
    let autoSlide;

    // 🔁 CLONE FOR INFINITE LOOP
    slider.innerHTML += slider.innerHTML;

    // ✅ AFTER CLONE (IMPORTANT FIX)
    let cards = slider.querySelectorAll(".cert-card");
    let totalCards = cards.length / 2;

    function updateSlider() {
        slider.style.transform = `translateX(-${index * cardWidth}px)`;

        // CENTER EFFECT
        cards.forEach((card, i) => {
            card.classList.remove("active", "dim");

            if (i === index + 1) {
                card.classList.add("active");
            } else {
                card.classList.add("dim");
            }
        });
    }

    function nextSlide() {
        index++;

        if (index >= totalCards) {
            index = 0;
        }

        updateSlider();
    }

    function prevSlide() {
        index--;

        if (index < 0) {
            index = totalCards - 1;
        }

        updateSlider();
    }

    // AUTO SLIDE
    function startAuto() {
        autoSlide = setInterval(nextSlide, 2500);
    }

    function stopAuto() {
        clearInterval(autoSlide);
    }

    // BUTTONS
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // HOVER PAUSE
    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    // 🟢 INITIAL LOAD FIX (VERY IMPORTANT)
    updateSlider();
    startAuto();

    // =========================
    // 🖱️ DRAG FIXED
    // =========================

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        slider.classList.add("dragging");
        startX = e.pageX;
        currentTranslate = index * cardWidth;
    });

    slider.addEventListener("mouseup", () => {
        isDragging = false;
        slider.classList.remove("dragging");
    });

    slider.addEventListener("mouseleave", () => {
        isDragging = false;
        slider.classList.remove("dragging");
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const walk = e.pageX - startX;
        slider.style.transform = `translateX(-${currentTranslate - walk}px)`;
    });

});



// =============================
// 🎬 SERVICES AUTO SLIDER (2 ROW)
// =============================
// =============================
// 🎬 SERVICES AUTO SLIDER
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("servicesSlider");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");

    if (!slider) return;

    let index = 0;
    let autoSlide;

    const slides = slider.children;
    const totalSlides = slides.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // arrows
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // autoplay
    function startAuto() {
        autoSlide = setInterval(nextSlide, 4000);
    }

    function stopAuto() {
        clearInterval(autoSlide);
    }

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    startAuto();

    // =============================
    // 🖱️ DRAG SUPPORT
    // =============================

    let isDragging = false;
    let startX = 0;

    slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX;
        slider.style.transition = "none";
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const moveX = e.pageX - startX;
        slider.style.transform = `translateX(calc(-${index * 100}% + ${moveX}px))`;
    });

    slider.addEventListener("mouseup", (e) => {
        isDragging = false;
        slider.style.transition = "transform 0.8s ease";

        const moveX = e.pageX - startX;

        if (moveX > 100) {
            prevSlide();
        } else if (moveX < -100) {
            nextSlide();
        } else {
            updateSlider();
        }
    });

    slider.addEventListener("mouseleave", () => {
        if (isDragging) {
            isDragging = false;
            slider.style.transition = "transform 0.8s ease";
            updateSlider();
        }
    });

    updateSlider();
});

// Mega menu for product


document.addEventListener("DOMContentLoaded", function () {

    const mega = document.querySelector(".mega-dropdown");

    let timeout;

    mega.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
        mega.classList.add("active");
    });

    mega.addEventListener("mouseleave", () => {
        timeout = setTimeout(() => {
            mega.classList.remove("active");
        }, 200); // smooth delay
    });

    // MOBILE CLICK
    mega.addEventListener("click", function (e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            this.classList.toggle("active");
        }
    });

});


document.querySelectorAll('.mega-dropdown > a').forEach(item => {
    item.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });
});