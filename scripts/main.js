function scrollCarousel(direction) {
    const container = document.getElementById('carousel');
    const scrollAmount = 340; // Card width + gap
    if (direction === 1) {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// ==========================================
// Video Carousel Functionality
// ==========================================
let currentVideoSlide = 0;
const totalVideoSlides = 7;

function changeVideoSlide(direction) {
    let newSlide = currentVideoSlide + direction;
    
    // Wrap around
    if (newSlide < 0) newSlide = totalVideoSlides - 1;
    if (newSlide >= totalVideoSlides) newSlide = 0;
    
    goToVideoSlide(newSlide);
}

function goToVideoSlide(index) {
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.video-dot');
    
    if (slides.length === 0 || index === currentVideoSlide) return;
    
    // Pause and reset the current video by reloading the iframe
    const currentIframe = slides[currentVideoSlide].querySelector('iframe');
    if (currentIframe) {
        const src = currentIframe.src;
        currentIframe.src = '';
        currentIframe.src = src;
    }
    
    // Hide current slide and disable interaction
    slides[currentVideoSlide].classList.remove('opacity-100', 'z-10');
    slides[currentVideoSlide].classList.add('opacity-0', 'pointer-events-none');
    
    // Update dot indicators
    dots[currentVideoSlide].classList.remove('bg-islamic-gold');
    dots[currentVideoSlide].classList.add('bg-gray-300');
    
    // Update current slide index
    currentVideoSlide = index;
    
    // Show new slide and enable interaction
    slides[currentVideoSlide].classList.remove('opacity-0', 'pointer-events-none');
    slides[currentVideoSlide].classList.add('opacity-100', 'z-10');
    
    // Update dot indicators
    dots[currentVideoSlide].classList.remove('bg-gray-300');
    dots[currentVideoSlide].classList.add('bg-islamic-gold');
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});