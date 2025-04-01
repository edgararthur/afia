// Set the birthday date - Year, Month (0-11), Day
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const birthdayMonth = 8; // September (0-indexed, so 8 represents September)
const birthdayDay = 15;

// Check if this year's birthday has already passed
const thisYearBirthday = new Date(currentYear, birthdayMonth, birthdayDay);
const nextYearBirthday = new Date(currentYear + 1, birthdayMonth, birthdayDay);

// Use next year's date if this year's already passed
const birthdayDate = currentDate > thisYearBirthday ? nextYearBirthday : thisYearBirthday;

// Countdown timer
function updateCountdown() {
    const currentDate = new Date();
    const timeLeft = birthdayDate - currentDate;
    
    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // If it's the birthday
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        celebrateBirthday();
    }
}

// Run countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Confetti animation
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff1493', '#00bfff', '#9932cc', '#ffff00', '#ff4500', '#32cd32'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        
        // Apply styles
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            top: -${size}px;
            left: ${left}vw;
            opacity: 0.7;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: fall ${duration}s ease-in infinite;
            animation-delay: ${delay}s;
        `;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Add falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Gallery interactions
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Start video play on hover if it's a video
            const video = item.querySelector('video');
            if (video) {
                video.play();
            }
        });
        
        item.addEventListener('mouseleave', () => {
            // Pause video when not hovering
            const video = item.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    });
}

// Celebrate when it's the birthday
function celebrateBirthday() {
    alert('🎉 Happy Birthday Afia! 🎂');
    
    // Add more celebration effects here
    document.body.classList.add('birthday-mode');
    
    // Create more confetti
    createConfetti();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createConfetti(); // Initial confetti
    initGallery();
    
    // Preload videos for smoother experience
    document.querySelectorAll('video').forEach(video => {
        video.load();
    });
}); 