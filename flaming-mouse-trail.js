const swirlElements = [];
const maxElements = 10;
let angle = 0;

document.addEventListener('mousemove', (e) => {
    if (swirlElements.length < maxElements) {
        let element = document.createElement('div');
        element.className = 'swirl-element';
        document.body.appendChild(element);
        swirlElements.push({ el: element, angle: angle, distance: 50 });
        angle += Math.PI / 5; // determines the separation between the elements
    }

    swirlElements.forEach(item => {
        const x = e.pageX + item.distance * Math.cos(item.angle);
        const y = e.pageY + item.distance * Math.sin(item.angle);
        item.el.style.left = `${x}px`;
        item.el.style.top = `${y}px`;
        item.angle += 0.05; // controls the speed of rotation
    });
});

setInterval(() => {
    if (swirlElements.length > maxElements) {
        const element = swirlElements.shift().el;
        element.remove();
    }
}, 100);
