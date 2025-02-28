function fight() {
    const dafightbutton = document.getElementById("fight-me");
    dafightbutton.remove();

    // Create and append a single <style> tag
    const style = document.createElement('style');
    style.textContent = `
    body {
        margin: 0; /* Remove default margin */
        padding: 0; /* Remove default padding */
        overflow: hidden; /* Prevent scrollbars */
    }
    
    #backgroundImage {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw; /* Full width of the viewport */
        height: 100vh; /* Full height of the viewport */
        object-fit: cover; /* Ensures the image covers the screen without distortion */
        z-index: -1; /* Places the image behind all other elements */
    }

    /* Floating Character Styles */
    #floatingImage, #insaneBambGuyImage, #conbiImage, #unfairExpungedImage, #bamboImage, #jremyImage {
        position: fixed;
        z-index: 10;
        animation: floatUpDown 3s ease-in-out infinite;
    }

    #floatingImage { left: 100px; top: 50%; transform: translateY(-50%) scale(2); }
    #insaneBambGuyImage { left: 100px; top: 70%; transform: translateY(-50%); width: 120px; height: 120px; }
    #conbiImage { right: 50px; top: 50%; transform: translateY(-50%); width: 200px; height: 200px; }
    #unfairExpungedImage { right: 300px; top: 50%; transform: translateY(-50%); width: 200px; height: 200px; }
    #bamboImage { left: 350px; top: 50%; transform: translateY(-50%); width: 120px; height: 120px; }
    #jremyImage { right: 50px; top: 70%; transform: translateY(-50%); width: 150px; height: 150px; }

    #yellowDudeImage {
        position: fixed;
        width: 100px;
        height: 100px;
        z-index: 10;
    }

    .flyingObject {
        position: fixed;
        width: 80px;
        height: 80px;
        z-index: 10;
    }

    @keyframes floatUpDown {
        0% { transform: translateY(-50%) translateY(-10px); }
        50% { transform: translateY(-50%) translateY(10px); }
        100% { transform: translateY(-50%) translateY(-10px); }
    }
    `;
    document.head.appendChild(style);

    // Create and append the background image
    const backgroundImage = document.createElement('img');
    backgroundImage.id = 'backgroundImage';
    backgroundImage.src = 'cool.gif';
    backgroundImage.alt = 'Background';
    document.body.appendChild(backgroundImage);

    // Create and append the background audio
    const backgroundAudio = document.createElement('audio');
    backgroundAudio.id = 'backgroundAudio';
    backgroundAudio.src = 'audio.mp3';
    backgroundAudio.autoplay = true;
    backgroundAudio.loop = true;
    document.body.appendChild(backgroundAudio);

    // Floating characters
    const floatingCharacters = [
        { id: 'floatingImage', src: 'ommision-bambi.gif' },
        { id: 'insaneBambGuyImage', src: 'insane-bamb-guy/insane-bamb-guy.gif' },
        { id: 'conbiImage', src: 'conbi.png' },
        { id: 'unfairExpungedImage', src: 'Unfair bambi expunged/unfair.gif' },
        { id: 'bamboImage', src: 'Bambo/Bambo.gif' },
        { id: 'jremyImage', src: 'Jremy/Jremy.gif' },
    ];

    floatingCharacters.forEach(({ id, src }) => {
        const character = document.createElement('img');
        character.id = id;
        character.src = src;
        character.alt = id;
        document.body.appendChild(character);
    });

    // Yellow Dude
    const yellowDudeImage = document.createElement('img');
    yellowDudeImage.id = 'yellowDudeImage';
    yellowDudeImage.src = 'Yellow-dude/Yellow-dude.gif';
    yellowDudeImage.alt = 'Yellow Dude';
    document.body.appendChild(yellowDudeImage);

    // Animate Yellow Dude
    let yellowDudeX = -100; // Start off-screen on the left
    let yellowDudeY = 50;   // Vertical position percentage (relative to screen height)
    let direction = 1;      // Move right initially
    let frame = 0;          // Track sine wave frame

    function animateYellowDude() {
        const screenWidth = window.innerWidth;

        // Update horizontal position
        yellowDudeX += direction * 2; // Move 2px per frame

        // If the image reaches the edge, reverse direction
        if (yellowDudeX > screenWidth || yellowDudeX < -100) {
            direction *= -1; // Reverse direction
        }

        // Update vertical position using a sine wave
        yellowDudeY = 50 + Math.sin(frame / 20) * 20; // Sine wave oscillation

        // Apply new position
        yellowDudeImage.style.left = `${yellowDudeX}px`;
        yellowDudeImage.style.top = `${yellowDudeY}vh`;

        frame++; // Increment the frame count
        requestAnimationFrame(animateYellowDude); // Schedule the next frame
    }

    animateYellowDude();

    // List of gifs for Unfair Expunged
    const unfairGifs = [
        'Unfair bambi expunged/unfair.gif',
        'Unfair bambi expunged/unfair-down.gif',
        'Unfair bambi expunged/unfair-up.gif',
        'Unfair bambi expunged/unfair-INHALE.gif',
        'Unfair bambi expunged/unfair-right.gif',
        'Unfair bambi expunged/unfair-left.gif'
    ];

    let currentGifIndex = 0;

    function cycleUnfairExpungedGifs() {
        const unfairExpungedImage = document.getElementById('unfairExpungedImage');
        unfairExpungedImage.src = unfairGifs[currentGifIndex];
        currentGifIndex = (currentGifIndex + 1) % unfairGifs.length; // Loop through the gifs
    }

    setInterval(cycleUnfairExpungedGifs, 500);

    // Flying objects
    const flyingObjects = [
        "flying-stuff/trollface.png",
        "flying-stuff/3d store game thingy.png",
        "flying-stuff/143828372.png",
        "flying-stuff/christmas.png",
        "flying-stuff/maxwell.png",
        "flying-stuff/pirate.png"
    ];

    function createFlyingObject(src) {
        const flyingObject = document.createElement('img');
        flyingObject.className = 'flyingObject';
        flyingObject.src = src;
        flyingObject.alt = 'Flying Object';

        // Randomize starting position
        flyingObject.style.left = `${Math.random() * window.innerWidth}px`;
        flyingObject.style.top = `${Math.random() * window.innerHeight}px`;

        document.body.appendChild(flyingObject);

        let x = parseFloat(flyingObject.style.left);
        let y = parseFloat(flyingObject.style.top);
        let dx = Math.random() * 4 - 2; // Horizontal speed (-2 to 2)
        let dy = Math.random() * 4 - 2; // Vertical speed (-2 to 2)

        function animateFlyingObject() {
            x += dx;
            y += dy;

            if (x <= 0 || x >= window.innerWidth - 80) dx *= -1;
            if (y <= 0 || y >= window.innerHeight - 80) dy *= -1;

            flyingObject.style.left = `${x}px`;
            flyingObject.style.top = `${y}px`;

            requestAnimationFrame(animateFlyingObject);
        }

        animateFlyingObject();
    }

    flyingObjects.forEach(src => createFlyingObject(src));

    // Listen for "k" key press to trigger changes
    document.addEventListener('keydown', function(event) {
        if (event.key === 'k') {
            // Change the audio source
            backgroundAudio.src = 'blocked.ogg';
            backgroundAudio.play();

            // Change character images to Bambo
            const bamboImages = [
                'floatingImage',
                'insaneBambGuyImage',
                'conbiImage',
                'unfairExpungedImage',
                'bamboImage',
                'jremyImage'
            ];
            bamboImages.forEach(id => {
                const img = document.getElementById(id);
                img.src = 'Bambo/Bambo.gif';
            });

            // Remove the conbi image
            const conbiImage = document.getElementById('conbiImage');
            if (conbiImage) {
                conbiImage.remove();
            }

            // Change background image
            backgroundImage.src = 'evil.gif';

            // Change floating objects to unfair gifs
            const flyingObjectsImages = document.querySelectorAll('.flyingObject');
            flyingObjectsImages.forEach(obj => {
                obj.src = 'Unfair bambi expunged/unfair.gif';
            });
        }
    });
}
