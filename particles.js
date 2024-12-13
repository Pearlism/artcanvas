const particleCanvas = document.getElementById('particleCanvas');
const particleCtx = particleCanvas.getContext('2d');

// Set up the particle canvas size
function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeParticleCanvas();
window.addEventListener('resize', resizeParticleCanvas);

// Initialize particles
const particles = Array.from({ length: 75 }, () => ({
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    size: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
}));

// Animate particles
function drawParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach((particle) => {
        particleCtx.beginPath();
        particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particleCtx.fillStyle = 'magenta';
        particleCtx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce particles off edges
        if (particle.x < 0 || particle.x > particleCanvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > particleCanvas.height) particle.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();
