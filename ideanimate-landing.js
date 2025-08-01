import { 
    animate, 
    createTimeline, 
    createTimer, 
    stagger, 
    utils, 
    eases,
    createSpring 
} from '../lib/anime.esm.js';

// ===== LOGO ANIMATION =====
const logoText = document.querySelector('.logo-text');
const logoDot = document.querySelector('.logo-dot');

// Logo text animation
animate(logoText, {
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 1000,
    ease: 'outBack'
});

// Logo dot pulse animation
animate(logoDot, {
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    duration: 2000,
    ease: 'inOutSine',
    loop: true
});

// ===== HERO TITLE ANIMATION =====
const titleWords = document.querySelectorAll('.title-word');

// Stagger the title words
animate(titleWords, {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800,
    delay: stagger(200),
    ease: 'outBack'
});

// ===== TYPEWRITER INPUT ANIMATION =====
const textInput = document.getElementById('designInput');
const typewriterCursor = document.querySelector('.typewriter-cursor');

// Typewriter cursor blink
animate(typewriterCursor, {
    opacity: [0, 1],
    duration: 750,
    ease: 'inIn(2)',
    loop: true,
    alternate: true
});

// Input focus animation
textInput.addEventListener('focus', () => {
    animate(textInput, {
        scale: [1, 1.02],
        duration: 300,
        ease: 'outQuad'
    });
});

textInput.addEventListener('blur', () => {
    animate(textInput, {
        scale: [1.02, 1],
        duration: 300,
        ease: 'outQuad'
    });
});

// ===== BUTTON ANIMATIONS =====
const generateBtn = document.getElementById('generateBtn');
const exploreBtn = document.getElementById('exploreBtn');

// Button hover effects
[generateBtn, exploreBtn].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        animate(btn, {
            scale: [1, 1.05],
            duration: 200,
            ease: 'outQuad'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        animate(btn, {
            scale: [1.05, 1],
            duration: 200,
            ease: 'outQuad'
        });
    });
    
    btn.addEventListener('click', () => {
        animate(btn, {
            scale: [1.05, 0.95, 1.05],
            duration: 150,
            ease: 'outQuad'
        });
    });
});

// ===== CENTERED BLUE ANIMATION =====
// Animation section removed - no blue dots needed

// ===== BACKGROUND LAYERED TRANSFORMS =====
const shapes = document.querySelectorAll('.shape');

function createKeyframes(value) {
    const keyframes = [];
    for (let i = 0; i < 50; i++) {
        keyframes.push({
            to: value,
            ease: utils.randomPick(['inOutQuad', 'inOutCirc', 'inOutSine', createSpring()]),
            duration: utils.random(800, 2000)
        });
    }
    return keyframes;
}

function animateShape(el) {
    const circleEl = el.querySelector('circle');
    const rectEl = el.querySelector('rect');
    const polyEl = el.querySelector('polygon');

    const animation = createTimeline({
        onComplete: () => animateShape(el),
    })
    .add(el, {
        translateX: createKeyframes(() => utils.random(-100, 100) + 'px'),
        translateY: createKeyframes(() => utils.random(-100, 100) + 'px'),
        rotate: createKeyframes(() => utils.random(-180, 180)),
    }, 0);

    if (circleEl) {
        animation.add(circleEl, {
            r: createKeyframes(() => utils.random(20, 40)),
        }, 0);
    }
    if (rectEl) {
        animation.add(rectEl, {
            width: createKeyframes(() => utils.random(40, 80)),
            height: createKeyframes(() => utils.random(40, 80)),
        }, 0);
    }
    if (polyEl) {
        const points = polyEl.getAttribute('points').split(' ').map(v => +v);
        animation.add(polyEl, {
            points: createKeyframes(() => {
                const s = utils.random(0.8, 1.4, 3);
                return `${points[0]*s} ${points[1]*s} ${points[2]*s} ${points[3]*s} ${points[4]*s} ${points[5]*s}`;
            }),
        }, 0);
    }

    animation.init();
}

// Animate each shape
shapes.forEach(shape => {
    setTimeout(() => animateShape(shape), utils.random(0, 2000));
});

// ===== FEATURE CARDS ANIMATION =====
const featureCards = document.querySelectorAll('.feature-card');

// Stagger feature cards entrance
animate(featureCards, {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800,
    delay: stagger(200),
    ease: 'outBack'
});

// ===== SCROLL TRIGGERED ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== INPUT TYPEWRITER EFFECT =====
const placeholderTexts = [
    "A futuristic logo for a tech startup...",
    "A minimalist poster for a music festival...",
    "A vibrant illustration of a magical forest...",
    "A professional business card design...",
    "A creative social media banner..."
];

let currentPlaceholderIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = placeholderTexts[currentPlaceholderIndex];
    
    if (isDeleting) {
        textInput.placeholder = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        textInput.placeholder = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed = 50;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholderTexts.length;
        typeSpeed = 500; // Pause before starting next word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect after page load
setTimeout(typeWriter, 2000);

// ===== GENERATE BUTTON CLICK EFFECT =====
generateBtn.addEventListener('click', () => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    generateBtn.style.position = 'relative';
    generateBtn.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Simulate generation process
    textInput.value = '';
    textInput.placeholder = 'Generating your design...';
    
    setTimeout(() => {
        textInput.placeholder = 'Describe your design idea here...';
    }, 3000);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PARALLAX BACKGROUND EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background-animation');
    const rate = scrolled * -0.5;
    
    animate(background, {
        translateY: rate,
        duration: 0
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background-animation');
    const rate = scrolled * -0.3;
    
    background.style.transform = `translateY(${rate}px)`;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

console.log('🎨 ideanimate - AI-Powered Design Creation');
console.log('✨ All animations loaded successfully!'); 