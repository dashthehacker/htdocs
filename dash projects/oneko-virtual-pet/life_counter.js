const life_bar_thingy = document.createElement("h2");
life_bar_thingy.textContent="Alive or dead?";
life_bar_thingy.id="alive_count"


function check_life_color() {
    if (hunger != 0) {
        document.getElementById('alive_count').classList.add('alive');
        document.getElementById('alive_count').classList.remove('death');
    }else {
        document.getElementById('alive_count').classList.add('death');
        document.getElementById('alive_count').classList.remove('alive');
    }
    if (hunger != 0) {
        document.getElementById('hunger').classList.add('alive');
        document.getElementById('hunger').classList.remove('death');
    }else {
        document.getElementById('hunger').classList.add('death');
        document.getElementById('hunger').classList.remove('alive');
    }
    if (happiness != 0) {
        document.getElementById('happy-text').classList.remove('sad');
    }else {
        document.getElementById('happy-text').classList.add('sad');
    }
}


window.lifebarcolorinterval = setInterval(check_life_color, 1000);


const music_script = document.createElement("script");music_script.src="music.js";
document.body.appendChild(music_script);

try {the_bar_to_inject_into.appendChild(life_bar_thingy);} catch {console.log("some stupid error occured: ${e}$");}