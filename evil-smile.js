let clickCount = 0;

function click_the_evil_smile() {
    clickCount++;
    if (clickCount === 15) {
        secret();
    }
    if (!document.getElementById('cool_mus_thing')) {
        const cool_music_thing = document.createElement('audio');
        cool_music_thing.autoplay = "true";
        cool_music_thing.loop = "true";
        cool_music_thing.id = 'cool_mus_thing';
        cool_music_thing.src = "/mus/Amalgam_music.ogg";
        document.body.appendChild(cool_music_thing);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('evil-smile').addEventListener('click', click_the_evil_smile);
});

function secret() {
    document.getElementById('evil-smile').removeEventListener('click', click_the_evil_smile);
    document.getElementById('evil-smile').textContent=":(";
    document.getElementById('haxtext').remove();
    document.getElementById('toxictext').remove();
    let audio = document.getElementById('cool_mus_thing');
    audio.src = "/mus/Hopes_and_Dreams_music.ogg";

    audio.onplay = () => {
        setTimeout(triggerFlash, 21000); // 21 seconds (21000 milliseconds)
    };
    document.getElementById('bruhtesting').remove();
    document.getElementById("settingz").remove();
    let oldLink = document.getElementById("stupid-space-css");
    let newLink = oldLink.cloneNode();
    newLink.href = "/style-bruh.css";
    oldLink.parentNode.replaceChild(newLink, oldLink);
}

function triggerFlash() {
    document.body.classList.add("flash");
    if (document.getElementById("oneko")) {document.getElementById("oneko").remove();}
    document.getElementById("unique-cube").classList.add("flash");
    const aboutmething = document.getElementById("about-me-div");
    aboutmething.style.transition = "opacity 0.5s";
    aboutmething.style.opacity = "0";

    setTimeout(() => {
        aboutmething.style.display = "none";
        document.getElementById("unique-cube").style.display = "none";//
        document.getElementById("evil-smile").style.display = "none";///
        createGlitchCanvas();/*///////////////////////////////////////*/
        hackerskull();//////////////////////////////////////////////////
        initfight();////////////////////////////////////////////////////
    }, 500);

}

function testremoveflash() {
    document.body.classList.remove("flash");
}

function hackerskull() {
    const hackerskull = document.createElement("p");
    hackerskull.id="skull";
    hackerskull.textContent="N";
    document.body.appendChild(hackerskull);
}

function createGlitchCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "glitchCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "none";

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function drawGlitchEffect() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 500; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let width = Math.random() * 10;
            let height = Math.random() * 50;
            let brightness = Math.random() * 255;
            ctx.fillStyle = `rgb(0, ${brightness}, 0)`;
            ctx.fillRect(x, y, width, height);
        }

        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        requestAnimationFrame(drawGlitchEffect);
    }

    drawGlitchEffect();
}


function initfight() {
    const stupid_cursor_css = document.getElementById("cursor-style");
    stupid_cursor_css.innerHTML = `
      html {
          cursor: url('./Undertale_red_soul.png'), auto;
      }
    `;
}
