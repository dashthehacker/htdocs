function mus_btn_code() {
    if (!document.getElementById("mus_btn_mus")) {
        const mus_btn_mus = document.createElement("audio");
        mus_btn_mus.autoplay = "true";
        mus_btn_mus.loop = "true";
        mus_btn_mus.id= "mus_btn_mus";
        if (isDayTime) {
            mus_btn_mus.src="day.ogg"
        } else {
            mus_btn_mus.src="cute.ogg"
        }
        document.body.appendChild(mus_btn_mus);
    } else {
        document.getElementById("mus_btn_mus").remove();
    }
}
const mus_btn = document.createElement("button");
mus_btn.id = "mus_btn";
mus_btn.textContent = "MUSIC";
the_bar_to_inject_into.appendChild(mus_btn);
mus_btn.addEventListener('click', mus_btn_code);

function mus_check() {
    if (!document.getElementById("mus_btn_mus")) {
        document.getElementById('mus_btn').classList.add('muted');
        document.getElementById('mus_btn').classList.remove('cute_playing');
    }else {
        document.getElementById('mus_btn').classList.add('cute_playing');
        document.getElementById('mus_btn').classList.remove('muted');
    }
}


window.muscheck = setInterval(mus_check, 1000);


function updateMusic() {
    if (isDayTime) {
        document.getElementById("mus_btn_mus").src="day.ogg";
    } else {
        document.getElementById("mus_btn_mus").src="cute.ogg";
    }
}