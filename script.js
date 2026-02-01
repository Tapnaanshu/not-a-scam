// Page Navigation System
let currentPage = 1;
const totalPages = 6;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initPageNavigation();
    initStoryPage();
    initMemoryCards();
    initQuestionPage();
    initMusicToggle();
});

// Create Floating Hearts Background
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 10000);
    }, 800);
}

// Page Navigation
function initPageNavigation() {
    // Continue button (Page 1 → Page 2)
    document.getElementById('continueBtn').addEventListener('click', () => {
        navigateToPage(2);
        setTimeout(showStoryLines, 300);
    });
    
    // Next button (Page 2 → Page 3)
    document.getElementById('nextBtn1').addEventListener('click', () => {
        navigateToPage(3);
    });
    
    // Next button (Page 3 → Page 4)
    document.getElementById('nextBtn2').addEventListener('click', () => {
        navigateToPage(4);
    });
    
    // Rethink button (Page 6 → Page 4)
    document.getElementById('rethinkBtn').addEventListener('click', () => {
        navigateToPage(4);
    });
}

function navigateToPage(pageNumber) {
    // Hide current page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    setTimeout(() => {
        document.getElementById(`page${pageNumber}`).classList.add('active');
        currentPage = pageNumber;
    }, 300);
}

// Story Page Animation
function initStoryPage() {
    // Will be triggered when navigating to page 2
}

function showStoryLines() {
    const lines = document.querySelectorAll('.story-line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('show');
            createPopHeart(line);
        }, index * 600);
    });
}

function createPopHeart(element) {
    const rect = element.getBoundingClientRect();
    const heart = document.createElement('div');
    heart.className = 'pop-heart';
    heart.textContent = '💕';
    heart.style.left = (rect.left + rect.width) + 'px';
    heart.style.top = (rect.top + rect.height / 2) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

// Memory Cards Flip
function initMemoryCards() {
    const cards = document.querySelectorAll('.memory-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            
            // Add sound effect (visual feedback)
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
}

// Question Page - YES/NO Buttons
function initQuestionPage() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // YES button
    yesBtn.addEventListener('click', () => {
        navigateToPage(5);
        setTimeout(createConfetti, 300);
    });
    
    // NO button - playful movement
    let noClickCount = 0;
    
    noBtn.addEventListener('mouseenter', () => {
        noClickCount++;
        
        if (noClickCount === 1) {
            // First hover - move right
            noBtn.style.transform = 'translateX(150px)';
        } else if (noClickCount === 2) {
            // Second hover - move left
            noBtn.style.transform = 'translateX(-150px)';
        } else if (noClickCount === 3) {
            // Third hover - shrink
            noBtn.style.transform = 'scale(0.5)';
        } else {
            // Fourth hover onwards - swap positions
            const buttonGroup = document.querySelector('.button-group');
            if (buttonGroup.firstElementChild === yesBtn) {
                buttonGroup.appendChild(yesBtn);
            } else {
                buttonGroup.insertBefore(yesBtn, noBtn);
            }
        }
    });
    
    noBtn.addEventListener('click', () => {
        navigateToPage(6);
    });
}

// Confetti Animation
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#F8C8DC', '#E75480', '#FF6F91', '#FFD700', '#FF69B4'];
    const shapes = ['💕', '💖', '💗', '⭐', '✨'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random confetti type (shape or color)
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = '20px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            }
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Music Toggle (Visual Only - No Actual Audio)
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            musicToggle.style.animation = 'pulse 1s ease-in-out infinite';
            musicToggle.querySelector('.music-icon').textContent = '🎵';
        } else {
            musicToggle.style.animation = '';
            musicToggle.querySelector('.music-icon').textContent = '🔇';
        }
    });
}

// Custom Cursor Trail (Optional Enhancement)
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // Randomly create hearts
        const trail = document.createElement('div');
        trail.className = 'pop-heart';
        trail.textContent = '💕';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.fontSize = '12px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
    }
});

// Add click sound effect (visual pulse)
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(231, 84, 128, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'popUp 0.6s ease-out forwards';
        ripple.style.zIndex = '1000';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Keyboard Navigation (Optional)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentPage < 5) {
        const nextBtn = document.querySelector(`#page${currentPage} button`);
        if (nextBtn) nextBtn.click();
    }
});

// Prevent accidental page refresh
window.addEventListener('beforeunload', (e) => {
    if (currentPage > 1 && currentPage < 5) {
        e.preventDefault();
        e.returnValue = '';
    }
});