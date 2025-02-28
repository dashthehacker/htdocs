let doesitexist = false;

document.getElementById("hack").addEventListener("click", function() {
    if (!doesitexist) {document.getElementById("mus-stuff").style.display = "block"; doesitexist=true;document.getElementById('hack').classList.add('bruh');}
});


document.getElementById("amalgam").addEventListener("click", function() {
    play_music('/mus/Amalgam_music.ogg');
});

document.getElementById("hereweare").addEventListener("click", function() {
    play_music('/mus/Here_We_Are_music.ogg');
});

document.getElementById("lastgoodbye").addEventListener("click", function() {
    play_music('/mus/Last_Goodbye_music.ogg');
});

document.getElementById("uwasoheats").addEventListener("click", function() {
    play_music('/mus/Uwa!!_So_HEATS!!♫_music.ogg');
});

document.getElementById("mtt").addEventListener("click", function() {
    play_music('/mus/Hotel_music.ogg');
});


function play_music(file) {
    document.getElementById('da-music').src=file;
}


const audio = document.getElementById("da-music");
const control = document.getElementById("controlaudio");
const looping_control = document.getElementById("loopaudio");

function update_audio() {
    if (audio.paused) {
        audio.play();
        control.textContent = "Pause";
    } else {
        audio.pause();
        control.textContent = "Play";
    }    
}

document.getElementById("controlaudio").addEventListener("click", update_audio);
document.getElementById("loopaudio").addEventListener("click", update_looping);

function update_looping() {
    if (audio.loop) {audio.loop=false;} else {audio.loop=true;}
    if (audio.loop) {
        looping_control.textContent="Disable looping";
    } else {
        looping_control.textContent="Enable looping";
    }
}

function end() {
    audio.currentTime = audio.duration;
}

function forward() {
    if (audio.duration - audio.currentTime > 15) {
        audio.currentTime = audio.currentTime + 15;
    } else {
        end();
    }
}

function backward() {
    if (audio.currentTime >= 15) {
        audio.currentTime = audio.currentTime - 15;
    } else {
        audio.currentTime = 0;
    }
}

document.getElementById("end").addEventListener("click", end);
document.getElementById("forward").addEventListener("click", forward);
document.getElementById("backward").addEventListener("click", backward);

document.getElementById("credits").addEventListener("click", function() {
    document.getElementById("credits-stuff").style.display = "block";
});

document.getElementById("info").addEventListener("click", function() {
    document.getElementById("info-stuff").style.display = "block";
});