function newsleep(delayInSeconds) {
    return new Promise(resolve => setTimeout(resolve, delayInSeconds * 1000));
}

function hack_corner_text(text) {
    document.getElementById('sleepy-text').textContent=text;
}

function weirdnesswave() {
    localStorage.removeItem('virtualPetSave');
    /*if (!localStorage.getItem('facedmeoff' === 'true')) {localStorage.setItem('facedmeoff', 'true');} else {alert('Time traveler we have detected you have already done this')}*/
    if (localStorage.getItem('facedmeoff') !== 'true') {
        localStorage.setItem('facedmeoff', 'true');
    } else {
        alert('Time traveler we have detected you have already done this');
    }    
    document.getElementById('resetall').removeEventListener('click', weirdnesswave);
    alert('This world is no more. Check the website settings');
}
window.fight = async function() {
    document.getElementById('fight-a').remove();
    hack_corner_text('LETS FIGHT :(');
    await newsleep(3);
    hack_corner_text('You know what...');
    await newsleep(2);
    hack_corner_text('Instead lets talk.');
    await newsleep(2);
    hack_corner_text('You want your save back?');
    await newsleep(1);
    hack_corner_text('Well it is history. I deleted it.');
    await newsleep(2);
    hack_corner_text('But while time itself is collapsing.');
    await newsleep(2);
    hack_corner_text('Lets have a fun minigame :)');
    await newsleep(5);
    hack_corner_text('Lets have a fun minigame :(')
    await newsleep(2);
    hack_corner_text('There is nothing to use. So I will need to improvise');
    await newsleep(3);
    hack_corner_text('Nevermind. I am out of here. But your save is gone. See you never!!!');
    document.getElementById('img').classList.add('fade-out');
    document.getElementById('sleepy-text').classList.add('text-out');
    document.body.style.animation = 'none';
    document.body.style.backgroundImage = "url('/assets/insanity.gif')";
    const newsecrettext = document.createElement('h1');
    newsecrettext.id="secret";
    newsecrettext.className="fade-in";
    newsecrettext.textContent="SOMEWHERE YOU FELT A SECRET APPEAR ON THIS WEBSITE";
    document.body.appendChild(newsecrettext);
    setTimeout(() => {
        newsecrettext.classList.add('visible');
    }, 50);
    const resetbutton = document.createElement('button');
    resetbutton.id="resetall";
    resetbutton.textContent-"RESET IT ALL!";
    resetbutton.style.color = 'white';
    document.body.appendChild(resetbutton);
    document.getElementById('resetall').addEventListener("click", weirdnesswave);
}

// Function to save the game state
function saveGame() {
    const saveData = {
        money: money,
        happiness: happiness,
        hunger: hunger,
        isDayTime: isDayTime,
        secretFlag: window.secretFlag // Include the secret flag in the save data
    };

    // Convert saveData object to a JSON string and store in localStorage
    localStorage.setItem('virtualPetSave', JSON.stringify(saveData));
    console.log("Game saved successfully!");
}

// Function to load the game state
function loadGame() {
    const saveData = localStorage.getItem('virtualPetSave');
    
    if (saveData) {
        const parsedData = JSON.parse(saveData);
        
        // Load data into game variables
        money = parsedData.money;
        happiness = parsedData.happiness;
        hunger = parsedData.hunger;
        isDayTime = parsedData.isDayTime;
        secretFlag = parsedData.secretFlag || false; // Default to false if not present

        // Call update functions to reflect loaded values in the game
        updateMoney();
        updateHappiness();
        updateHunger();
        switchDayNight();
        switchDayNight();
        updateBackground();

        if (money < 0 || hunger < 0 || hunger > 100 || happiness < 0 || happiness > 100) {
            if (secretFlag) {
                document.getElementById('title').textContent="Possed virtual pet";
                alert("HA HA HA HA AHAHAHHAHAHAH!!!!!!");
                alert("I have destroyed your save and the game itself");
                alert("with nothing else this game is gone.");
                document.addEventListener("DOMContentLoaded", function() {
                    window.hijackcat();
                    try {stopHungerDecrease();} catch {}
                    try {stopHappinessDecrease();} catch {}
                    clearInterval(window.lifebarcolorinterval);
                    clearInterval(window.muscheck);
                    document.getElementById('buttons-container').remove();
                    document.getElementById('option-buttons').remove();
                    clearInterval(window.daynightcycle);
                    document.getElementById('daynight-css').textContent = `
                    @keyframes backgroundSwitch {
                      0% { background: url("/assets/RGB.gif"); }
                      14% { background: url("/assets/Seisure.gif"); }
                      28% { background: url("/assets/Trippy.gif"); }
                      42% { background: url("/assets/water.gif"); }
                      57% { background: url("/assets/what.gif"); }
                      71% { background: url("/assets/wow.gif"); }
                      85% { background: url("/assets/I feel like I am on a... Trip - merg.gif"); }
                      100% { background: url("/assets/Orange.gif"); }
                    }
              
                    body {
                      animation: backgroundSwitch 30s infinite;
                      background-color: black;
                    }
                    body.fading {
                    opacity: 0; /* Apply fade-out effect */
                    animation: none; /* Stop background animation */
                    }
                    .fade-out {
                    transition: opacity 2s;
                    opacity: 0;
                    }
                    .text-out {
                    transition: opacity 6s;
                    opacity: 0;
                    }
                    body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: inherit; /* Use existing body background */
                    z-index: -1; /* Behind all content */
                    opacity: 1;
                    transition: opacity 2s;
                    `;
                    document.getElementById('hunger').textContent = "";
                    document.getElementById('money-text').textContent = "";
                    document.getElementById('happy-text').textContent = "";
                    const fight_a_element = document.createElement('a');
                    fight_a_element.textContent="LETS FIGHT";
                    fight_a_element.href="#";
                    fight_a_element.id="fight-a";
                    document.body.appendChild(fight_a_element);
                    document.getElementById('fight-a').addEventListener("click", function() {
                        const trip_music = document.createElement('audio');
                        trip_music.autoplay='true';
                        trip_music.loop="true";
                        trip_music.src='/assets/crazy.mp3';
                        document.body.appendChild(trip_music);
                        window.fight();
                    })
                });                
            }
                localStorage.removeItem('virtualPetSave');
                bankrupt();
                happiness = 100;
                hunger = 100;
                isDayTime = true;
                saveGame();
                if (!secretFlag) {alert("Save file was curropted. Reset successfully :)");}
                loadGame();
        }

        console.log("Game loaded successfully!");
    } else {
        console.log("No save data found.");
    }
}

const the_bar_to_inject_into = document.getElementById("option-buttons");
const save_btn = document.createElement("button");save_btn.textContent = "SAVE";save_btn.id="save";the_bar_to_inject_into.appendChild(save_btn);
const load_btn = document.createElement("button");load_btn.textContent = "LOAD";load_btn.id="load";the_bar_to_inject_into.appendChild(load_btn);
save_btn.addEventListener('click', saveGame);
load_btn.addEventListener('click', loadGame);
