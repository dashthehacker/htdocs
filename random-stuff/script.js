var elem = document.documentElement;
const params = new URLSearchParams(window.location.search);

function disable_context() {
    document.addEventListener('contextmenu', event => event.preventDefault());
}

function funni(funni) {
    window.location=funni;
}


function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}


function random_project() {
    let projects = ["cat virtual pet", "maze", "SNAKE", "Hacker", "Digital Aquarium", "cats", "Crazy 8 ball"];
    return projects[Math.floor(Math.random() * projects.length)];
}

function say_a_random_project() {
    const randomprojecttext = document.getElementById("RandomProjectSuggestion");
    const button = document.getElementById("RandomProjectSuggestionButton")
    randomprojecttext.textContent="Have you tried my " + random_project();
    if (button.textContent !== "CLICK ME!!!") {button.textContent="CLICK ME!!!"}
}

function awesome_mode() {
    disable_context();
    openFullscreen();
}

function ACE_JS(BRUH) {
    eval(BRUH);
}

ACE_JS(params.get('BRUH'));