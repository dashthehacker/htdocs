
const imgElement = document.getElementById("img");


let currentInterval;


function sleep() {
    const sleepFrames = [
        "oneko frames/sleeping/frame_01.png",
        "oneko frames/sleeping/frame_02.png",
        "oneko frames/sleeping/frame_03.png",
        "oneko frames/sleeping/frame_04.png"
    ];
    cycleFrames(sleepFrames, 500); 
}


function stare() {
    const stareFrames = [
        "oneko frames/waking up and looking/frame_01.png",
        "oneko frames/waking up and looking/frame_02.png",
        "oneko frames/waking up and looking/frame_03.png"
    ];
    cycleFrames(stareFrames, 200); 
}


function scratch() {
    const scratchFrames = [
        "oneko frames/scratching/frame_01.png",
        "oneko frames/scratching/frame_02.png",
        "oneko frames/scratching/frame_03.png",
        "oneko frames/scratching/frame_04.png"
    ];
    cycleFrames(scratchFrames, 500); 
}


function idleDay() {
    const idleFrames = [
        "oneko frames/waking up and looking/frame_01.png",
        "oneko frames/waking up and looking/frame_02.png"
    ];
    cycleFrames(idleFrames, 1000); 
}


function idleNight() {
    sleep();
}


function cycleFrames(frames, interval) {
    
    if (currentInterval) {
        clearInterval(currentInterval);
    }

    let currentFrame = 0;
    imgElement.src = frames[currentFrame]; 

    
    currentInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % frames.length; 
        imgElement.src = frames[currentFrame];
    }, interval);
}


function stopAnimation() {
    clearInterval(currentInterval);
    imgElement.src = "oneko frames/idle/frame_01.png"; 
}


function idle() {
    if (getIsDayTime()) {
        idleDay(); 
    } else {
        idleNight(); 
    }
}


idle();


function getIsDayTime() {
    return isDayTime;
}

window.sleepthecat = function() {
    const sleepFrames = [
        "oneko frames/sleeping/frame_01.png",
        "oneko frames/sleeping/frame_02.png",
        "oneko frames/sleeping/frame_03.png",
        "oneko frames/sleeping/frame_04.png"
    ];
    cycleFrames(sleepFrames, 500);
}


window.hijackcat = function() {
    clearInterval(currentInterval);
    imgElement.src = "/143828372-evil.png";
}


document.addEventListener("DOMContentLoaded", () => { if (localStorage.getItem("green") === "true") { document.getElementById("img").style.filter = "grayscale(100%) sepia(1) hue-rotate(80deg) saturate(100)"; } });