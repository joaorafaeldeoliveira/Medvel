const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

const totalItems = items.length / 2;
let index = 0;
let autoSlide;
let itemWidth = getItemWidth();


function getItemWidth() {
    return items[0].getBoundingClientRect().width + 20;
}

function updateCarousel(animate = true) {
    itemWidth = getItemWidth();

    if (!animate) track.style.transition = 'none';
    else track.style.transition = 'transform 0.5s ease-in-out';

    track.style.transform = `translateX(-${index * itemWidth}px)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}

function nextSlide() {
    index++;

    if (index >= totalItems) {
        index = 0;
        updateCarousel(false);
        requestAnimationFrame(() => updateCarousel(true));
    } else {
        updateCarousel();
    }
}

function prevSlide() {
    index--;

    if (index < 0) index = totalItems - 1;
    updateCarousel();
}

function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

startAutoSlide();


nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
    });
});

track.addEventListener('mouseenter', stopAutoSlide);
track.addEventListener('mouseleave', startAutoSlide);

window.addEventListener('resize', () => updateCarousel(false));

let startX = 0;
let endX = 0;

track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (startX - endX > 50) {
        nextSlide();
    } else if (endX - startX > 50) {
        prevSlide();
    }
}

const mobileToggle = document.querySelector('.mobile-menu-toggle'); 
const mobileMenu = document.querySelector('.nav-links'); 
mobileToggle.addEventListener('click', () => { mobileToggle.classList.toggle('active'); mobileMenu.classList.toggle('active'); });