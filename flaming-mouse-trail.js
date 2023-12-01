const particles = [];
const numberOfParticles = 500;

document.addEventListener('mousemove', (e) => {
    if (particles.length < numberOfParticles) {
        let particle = document.createElement('span');
        particle.classList.add('particle', 'trail');
        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        document.body.appendChild(particle);
    }

    updateParticles(e);
});

function updateParticles(e) {

    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        if (!particle) continue;

        if (i === 0) {
            particle.style.left = e.pageX + 'px';
            particle.style.top = e.pageY + 'px';
        } else {
            let prevParticle = particles[i - 1];
            particle.style.left = prevParticle.style.left;
            particle.style.top = prevParticle.style.top;
        }

        // Fade out and remove old particles
        if (i === particles.length - 1) {
            let opacity = parseFloat(particle.style.opacity);
            if (opacity <= 0) {
                document.body.removeChild(particle);
                particles.splice(i, 1);
                i--;
            } else {
                particle.style.opacity = opacity - 0.1;
            }
        }
    }
}
