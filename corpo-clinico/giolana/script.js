const mobileToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.nav-links'); 

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});