/* =========================
   TECH PARTICLE BACKGROUND
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let bubbleArray = [];

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

/* -------- Tech Particle -------- */

class TechParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random();
        this.symbol = Math.random() > 0.5 ? "0" : "1";
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0,255,150,${this.opacity})`;
        ctx.font = this.size + "px monospace";
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

/* -------- Bubble Effect -------- */

/* -------- Bubble Effect (Reduced Spread) -------- */

class Bubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;   // Smaller bubbles
        this.alpha = 0.8;
        this.speedX = (Math.random() - 0.5) * 2;  // Less spread
        this.speedY = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.05;   // Faster fade
    }

    draw() {
        ctx.fillStyle = `rgba(0,150,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

/* Fewer bubbles per move */
document.addEventListener("mousemove", (e) => {
    bubbleArray.push(new Bubble(e.clientX, e.clientY)); 
});

/* -------- Initialize -------- */

function initParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push(new TechParticle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    bubbleArray.forEach((bubble, index) => {
        bubble.update();
        bubble.draw();

        if (bubble.alpha <= 0) {
            bubbleArray.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

initParticles();
animate();
/* =========================
   HEADING SCROLL ANIMATION
========================= */

const headings = document.querySelectorAll(".section-title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.5 });

headings.forEach(heading => {
    observer.observe(heading);
});
const openBtn = document.getElementById("openAbout");
const modal = document.getElementById("aboutModal");
const closeBtn = document.getElementById("closeAbout");

openBtn.onclick = function(){
    modal.style.display = "flex";
}

closeBtn.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function(e){
    if(e.target == modal){
        modal.style.display = "none";
    }
}
