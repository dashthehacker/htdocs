function amoungus() {
    if (!document.getElementById('stylesheet_original')) {return}
    document.getElementById('stylesheet_original').remove();
    const stylesheet_purple = document.createElement('style');
    stylesheet_purple.id='stylesheet-purple';
    stylesheet_purple.textContent = "body {background-color: purple;}";
    document.head.appendChild(stylesheet_purple);
    document.body.replaceWith(document.createElement('body'));
    const fix_audio = document.createElement('audio');
    fix_audio.src="/mus/Uwa!!_So_Holiday♫_music.ogg";
    fix_audio.loop="true";
    fix_audio.autoplay="true";
    document.body.appendChild(fix_audio);
    const text = document.createElement('h1');
    text.id="90ztext";
    text.textContent = "WELCOME TO THE 90'S";
    document.body.appendChild(text);
}

document.addEventListener("DOMContentLoaded", () => {
    const secretButton = document.getElementById('secretbutton');
    const secretText = document.getElementById('getoutofmycode');
    if (secretButton && secretText) {
        secretButton.style.display = "none";
        secretText.style.display = "none";
        if(localStorage.getItem('facedmeoff') === 'true') {
            
            secretButton.style.display = "block";
            secretText.style.display = "block";
        }
    } else {
        console.log("Elements not found");
    }
});