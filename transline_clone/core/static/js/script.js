

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

window.addEventListener("scroll", function(){

    const navbar = document.getElementById("navbar");

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});


/* =========================================
   MOBILE MEGA MENU
========================================= */

/* =========================================
   MOBILE MEGA MENU
========================================= */

/* =========================================
   MOBILE MEGA MENU
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const megaTrigger = document.getElementById("megaTrigger");
    const megaMenu = document.querySelector(".mega-menu");

    if (megaTrigger && megaMenu) {

        megaTrigger.addEventListener("click", function (e) {

            if (window.innerWidth <= 992) {

                e.preventDefault();

                megaMenu.classList.toggle("active");

            }

        });

    }

});

/* =========================================
   HERO AUTO SLIDER
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");

let currentHero = 0;

function showHeroSlide(index){

    heroSlides.forEach(slide=>{
        slide.classList.remove("active");
    });

    heroSlides[index].classList.add("active");
}

function nextSlide(){

    currentHero++;

    if(currentHero >= heroSlides.length){
        currentHero = 0;
    }

    showHeroSlide(currentHero);
}

function prevSlide(){

    currentHero--;

    if(currentHero < 0){
        currentHero = heroSlides.length - 1;
    }

    showHeroSlide(currentHero);
}

showHeroSlide(currentHero);

setInterval(()=>{
    nextSlide();
},5000);


/* =========================================
   SERVICES SLIDER
========================================= */

const servicesSlider = document.getElementById("servicesSlider");

const serviceSlides = document.querySelectorAll(".services-slide");

let currentService = 0;

function updateServiceSlider(){

    servicesSlider.style.transform =
        `translateX(-${currentService * 100}%)`;
}

document.getElementById("nextSlide")
?.addEventListener("click",()=>{

    currentService++;

    if(currentService >= serviceSlides.length){
        currentService = 0;
    }

    updateServiceSlider();
});

document.getElementById("prevSlide")
?.addEventListener("click",()=>{

    currentService--;

    if(currentService < 0){
        currentService = serviceSlides.length - 1;
    }

    updateServiceSlider();
});

setInterval(()=>{

    currentService++;

    if(currentService >= serviceSlides.length){
        currentService = 0;
    }

    updateServiceSlider();

},4000);



/* =========================================
   CERTIFICATION AUTO SLIDER
========================================= */
/* =========================================
   CERTIFICATION SLIDER
========================================= */
/* =========================================
   CERTIFICATION SLIDER
========================================= */

const certSlider = document.getElementById("certSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (certSlider) {

    const certCards = document.querySelectorAll(".cert-card");

    let certIndex = 0;
    let autoSlide;

    /* =========================
       RESPONSIVE CARDS
    ========================= */

    function getCardsPerView() {

        if (window.innerWidth <= 768) {
            return 1;
        }

        if (window.innerWidth <= 992) {
            return 2;
        }

        return 3;
    }

    /* =========================
       UPDATE SLIDER
    ========================= */

    function updateCertSlider() {

        const cardsPerView = getCardsPerView();

        const gap = 25;

        const cardWidth =
            certCards[0].offsetWidth + gap;

        const maxIndex =
            certCards.length - cardsPerView;

        /* LOOP */

        if (certIndex > maxIndex) {
            certIndex = 0;
        }

        if (certIndex < 0) {
            certIndex = maxIndex;
        }

        certSlider.style.transform =
            `translateX(-${certIndex * cardWidth}px)`;
    }

    /* =========================
       NEXT
    ========================= */

    function nextCertSlide() {

        certIndex++;

        updateCertSlider();
    }

    /* =========================
       PREVIOUS
    ========================= */

    function prevCertSlide() {

        certIndex--;

        updateCertSlider();
    }

    /* =========================
       BUTTON EVENTS
    ========================= */

    nextBtn?.addEventListener("click", () => {

        nextCertSlide();

        restartAutoSlide();

    });

    prevBtn?.addEventListener("click", () => {

        prevCertSlide();

        restartAutoSlide();

    });

    /* =========================
       AUTO SLIDE
    ========================= */

    function startAutoSlide() {

        autoSlide = setInterval(() => {

            nextCertSlide();

        }, 3500);
    }

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();
    }

    startAutoSlide();

    /* =========================
       RESIZE FIX
    ========================= */

    window.addEventListener("resize", () => {

        updateCertSlider();

    });

    /* INIT */

    updateCertSlider();
}