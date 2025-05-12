let prev = document.getElementById('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item');
let contents = document.querySelectorAll('.content .item');

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

// Add a flag to prevent rapid scrolling
let isScrolling = false;
const scrollDelay = 500; // milliseconds

function nextSlider() {
    active = active + 1 > countItem - 1 ? 0 : active + 1;
    rotate = rotate + rotateAdd; 
    show();
}

function prevSlider() {
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    rotate = rotate - rotateAdd; 
    show();     
}

function show() {
    image.style.setProperty("--rotate", rotate + 'deg');
    contents.forEach((content, key) => {
        if(key == active){
            content.classList.add('active');
        }else{
            content.classList.remove('active');
        }
    })
}

// Mouse wheel/trackpad scroll event
window.addEventListener('wheel', function(e) {
    if (isScrolling) return;
    
    isScrolling = true;
    
    if (e.deltaY > 0) {
        // Scrolling down - next
        nextSlider();
    } else {
        // Scrolling up - prev
        prevSlider();
    }
    
    // Reset the flag after delay
    setTimeout(() => {
        isScrolling = false;
    }, scrollDelay);
});

// Touch events for mobile devices
let startY = 0;
window.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', function(e) {
    if (isScrolling) return;
    
    const currentY = e.touches[0].clientY;
    const diffY = startY - currentY;
    
    if (Math.abs(diffY) > 50) { // threshold to prevent accidental scrolls
        isScrolling = true;
        
        if (diffY > 0) {
            // Swipe up - next
            nextSlider();
        } else {
            // Swipe down - prev
            prevSlider();
        }
        
        // Reset the flag after delay
        setTimeout(() => {
            isScrolling = false;
        }, scrollDelay);
    }
}, { passive: true });

// If you have the prev/next buttons in your HTML, keep these
if (prev && next) {
    next.onclick = nextSlider;
    prev.onclick = prevSlider;
}