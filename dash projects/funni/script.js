document.getElementById("start").addEventListener("click", function () {
    // Remove the button
    const startButton = document.getElementById("start");
    startButton.remove();

    // Change the website background
    document.body.style.backgroundImage = "url('hecker.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";

    // Create and autoplay the first audio
    const audio1 = document.createElement("audio");
    audio1.src = "bruh.mp3";
    audio1.autoplay = true;
    audio1.loop = true;
    document.body.appendChild(audio1);

    // Create and autoplay the second audio
    const audio2 = document.createElement("audio");
    audio2.src = "/Youve-been-Trolled.mp3";
    audio2.autoplay = true;
    audio2.loop = true;
    document.body.appendChild(audio2);

    // Function to create a single bouncing video
    function createBouncingVideo(withSound = false) {
        const video = document.createElement("video");
        video.src = "/you are an idiot!.mp4";
        video.autoplay = true;
        video.loop = true;
        video.style.position = "absolute";
        video.style.width = "200px";
        video.style.height = "150px";

        // Mute all videos except the one with sound
        if (!withSound) {
            video.muted = true;
        }

        document.body.appendChild(video);

        // Initial random position and speed
        let xPos = Math.random() * (window.innerWidth - 200);
        let yPos = Math.random() * (window.innerHeight - 150);
        let xSpeed = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 3); // Random speed between 2 and 5
        let ySpeed = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 3);

        // Bouncing logic
        function bounceVideo() {
            xPos += xSpeed;
            yPos += ySpeed;

            // Check for collisions with the window edges
            if (xPos + video.offsetWidth >= window.innerWidth || xPos <= 0) {
                xSpeed = -xSpeed; // Reverse direction
            }
            if (yPos + video.offsetHeight >= window.innerHeight || yPos <= 0) {
                ySpeed = -ySpeed; // Reverse direction
            }

            // Update video position
            video.style.left = xPos + "px";
            video.style.top = yPos + "px";

            requestAnimationFrame(bounceVideo);
        }

        bounceVideo();
    }

    // Create the video with sound
    createBouncingVideo(true);

    // Create multiple muted videos for the trail
    for (let i = 0; i < 15; i++) { // Adjust this number for more or fewer videos
        setTimeout(() => createBouncingVideo(false), i * 500); // Stagger their creation for the trail effect
    }

    // Function to create a bouncing image
    function createBouncingImage(imageSrc) {
        const image = document.createElement("img");
        image.src = imageSrc;
        image.style.position = "absolute";
        image.style.width = "100px";  // Adjust size of the images as needed
        image.style.height = "100px"; // Adjust size of the images as needed

        document.body.appendChild(image);

        // Initial random position and speed
        let xPos = Math.random() * (window.innerWidth - 100);
        let yPos = Math.random() * (window.innerHeight - 100);
        let xSpeed = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 3); // Random speed between 2 and 5
        let ySpeed = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 3);

        // Bouncing logic
        function bounceImage() {
            xPos += xSpeed;
            yPos += ySpeed;

            // Check for collisions with the window edges
            if (xPos + image.offsetWidth >= window.innerWidth || xPos <= 0) {
                xSpeed = -xSpeed; // Reverse direction
            }
            if (yPos + image.offsetHeight >= window.innerHeight || yPos <= 0) {
                ySpeed = -ySpeed; // Reverse direction
            }

            // Update image position
            image.style.left = xPos + "px";
            image.style.top = yPos + "px";

            requestAnimationFrame(bounceImage);
        }

        bounceImage();
    }

    // Create 10 bouncing images of each type
    const imageSources = [
        "bluecat.png",
        "greencat.png",
        "sun.png",
        "1.gif",
        "2.gif"
    ];

    // Create 10 images for each of the 3 image sources
    imageSources.forEach(source => {
        for (let i = 0; i < 10; i++) {  // 10 images per source
            setTimeout(() => {
                createBouncingImage(source);
            }, i * 500);  // Stagger their creation
        }
    });
});
