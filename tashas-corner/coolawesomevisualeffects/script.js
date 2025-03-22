const images = [
    '/assets/chess.gif',
    '/assets/choices%20bg.gif',
    '/assets/circus.gif',
    '/assets/explosion-explode.gif',
    '/assets/fire.gif',
    '/assets/Friend%20special.gif',
    '/assets/hopes%20and%20dreamz.gif',
    '/assets/I%20feel%20like%20I%20am%20on%20a...%20Trip%20-%20merg.gif',
    '/assets/insanity.gif',
    '/assets/Orange.gif',
    '/assets/RGB.gif',
    '/assets/Seisure.gif',
    '/assets/snake.gif',
    '/assets/Trippy.gif',
    '/assets/water.gif',
    '/assets/what.gif',
    '/assets/wow.gif'
];

document.addEventListener("DOMContentLoaded", () => {
    const dosomething = document.getElementById("dosomething");
    const text_stuff = document.getElementById("text");
    thestuff(dosomething, text);
});

function thestuff(link, text) {
    link.addEventListener("click", function () {
        dosomething.remove();
        text.remove();

        // Preload images by adding them to a hidden container
        const preloadContainer = document.createElement('div');
        preloadContainer.style.position = 'absolute';
        preloadContainer.style.width = '0';
        preloadContainer.style.height = '0';
        preloadContainer.style.overflow = 'hidden';
        preloadContainer.style.opacity = '0';
        document.body.appendChild(preloadContainer);

        images.forEach(src => {
            const img = new Image();
            img.src = src;
            preloadContainer.appendChild(img);
        });

        // Define the CSS for the background animation
        let thecss = `
        body {
            animation: fadeBackground 30s infinite;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        @keyframes fadeBackground {
            ${images.map((img, i) => `${Math.round((i / images.length) * 100)}% { background: url('${img}'); }`).join('\n')}
            100% { background: url('${images[0]}'); }
        }
        `;

        // Inject the CSS into the page
        document.getElementById("purple").textContent = thecss;
    });
}
