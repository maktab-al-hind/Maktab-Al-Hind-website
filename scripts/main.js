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
    
    if (slides.length === 0) return;
    
    // Pause and reset the current video
    const currentVideo = slides[currentVideoSlide].querySelector('video');
    if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
        currentVideo.removeAttribute('src'); // Unload video to save memory
        currentVideo.load();
        // Reset play button icon
        updatePlayButtonIcon(currentVideoSlide, false);
    }
    
    // Hide current slide
    slides[currentVideoSlide].classList.remove('opacity-100');
    slides[currentVideoSlide].classList.add('opacity-0');
    
    // Update dot indicators
    dots[currentVideoSlide].classList.remove('bg-islamic-gold');
    dots[currentVideoSlide].classList.add('bg-white/50');
    
    // Update current slide index
    currentVideoSlide = index;
    
    // Show new slide
    slides[currentVideoSlide].classList.remove('opacity-0');
    slides[currentVideoSlide].classList.add('opacity-100');
    
    // Load and play the new video
    const newVideo = slides[currentVideoSlide].querySelector('video');
    if (newVideo && newVideo.dataset.src) {
        newVideo.src = newVideo.dataset.src;
        newVideo.load();
        newVideo.play().then(() => {
            updatePlayButtonIcon(currentVideoSlide, true);
        }).catch(e => {
            console.log('Autoplay prevented:', e);
            updatePlayButtonIcon(currentVideoSlide, false);
        });
    }
    
    // Update dot indicators
    dots[currentVideoSlide].classList.remove('bg-white/50');
    dots[currentVideoSlide].classList.add('bg-islamic-gold');
}

// ==========================================
// Video Controls Functions
// ==========================================

function getVideoByIndex(index) {
    const slides = document.querySelectorAll('.video-slide');
    if (slides[index]) {
        return slides[index].querySelector('video');
    }
    return null;
}

function getControlsContainer(index) {
    const slides = document.querySelectorAll('.video-slide');
    if (slides[index]) {
        return slides[index].querySelector('.video-controls');
    }
    return null;
}

function updatePlayButtonIcon(index, isPlaying) {
    const controls = getControlsContainer(index);
    if (!controls) return;
    
    const playIcon = controls.querySelector('.play-icon');
    const pauseIcon = controls.querySelector('.pause-icon');
    
    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

function updateMuteButtonIcon(index, isMuted) {
    const controls = getControlsContainer(index);
    if (!controls) return;
    
    const mutedIcon = controls.querySelector('.muted-icon');
    const unmutedIcon = controls.querySelector('.unmuted-icon');
    
    if (isMuted) {
        mutedIcon.classList.remove('hidden');
        unmutedIcon.classList.add('hidden');
    } else {
        mutedIcon.classList.add('hidden');
        unmutedIcon.classList.remove('hidden');
    }
}

function togglePlay(index) {
    const video = getVideoByIndex(index);
    if (!video) return;
    
    // Ensure video source is loaded before playing
    if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
    }
    
    if (video.paused) {
        video.play().then(() => {
            updatePlayButtonIcon(index, true);
        }).catch(e => {
            // Only log if it's not a user abort
            if (e.name !== 'AbortError') {
                console.log('Play prevented:', e);
            }
        });
    } else {
        video.pause();
        updatePlayButtonIcon(index, false);
    }
}

function toggleMute(index) {
    const video = getVideoByIndex(index);
    if (!video) return;
    
    video.muted = !video.muted;
    updateMuteButtonIcon(index, video.muted);
}

function restartVideo(index) {
    const video = getVideoByIndex(index);
    if (!video) return;
    
    video.currentTime = 0;
    video.play().then(() => {
        updatePlayButtonIcon(index, true);
    }).catch(e => console.log('Play prevented:', e));
}

function toggleFullscreen(index) {
    const video = getVideoByIndex(index);
    if (!video) return;
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { // Safari
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE11
        video.msRequestFullscreen();
    }
}

// Initialize first video on page load
function initVideoCarousel() {
    const firstSlide = document.querySelector('.video-slide');
    if (firstSlide) {
        const firstVideo = firstSlide.querySelector('video');
        if (firstVideo && firstVideo.dataset.src) {
            firstVideo.src = firstVideo.dataset.src;
            firstVideo.load();
            firstVideo.play().then(() => {
                updatePlayButtonIcon(0, true);
            }).catch(e => {
                console.log('Autoplay prevented:', e);
                updatePlayButtonIcon(0, false);
            });
            // Initialize mute icon (videos start unmuted)
            updateMuteButtonIcon(0, false);
        }
    }
    
    // Set initial mute icons for all videos (unmuted)
    for (let i = 0; i < totalVideoSlides; i++) {
        updateMuteButtonIcon(i, false);
    }
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
    
    // Initialize video carousel
    initVideoCarousel();
});