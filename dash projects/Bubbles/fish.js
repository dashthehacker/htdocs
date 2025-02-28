var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  const fscreenbutton = document.getElementById("fscreenbutton");
  fscreenbutton.remove();
}

class Fish {
  constructor(imageSrc) {
    this.fish = document.createElement('img');
    this.fish.src = imageSrc || '/fish.png';
    this.fish.alt = 'Swimming Fish';
    this.fish.style.position = 'absolute';
    this.fish.style.width = '100px';
    this.fish.style.height = 'auto';
    this.fish.style.pointerEvents = 'none';
    document.body.appendChild(this.fish);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.fish.style.left = Math.random() * screenWidth + 'px';
    this.fish.style.top = Math.random() * screenHeight + 'px';


    this.swimFish();
  }

  swimFish() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;


    const randomX = Math.random() * screenWidth;
    const randomY = Math.random() * screenHeight;


    const swimDuration = Math.random() * 4 + 3;


    this.fish.style.transition = `all ${swimDuration}s ease-in-out`;
    this.fish.style.left = randomX + 'px';
    this.fish.style.top = randomY + 'px';

    if (parseFloat(this.fish.style.left) < randomX) {
      this.fish.style.transform = 'scaleX(-1)'; // Face right
    } else {
      this.fish.style.transform = 'scaleX(1)'; // Face left
    }

    setTimeout(() => this.swimFish(), swimDuration * 1000);
  }
}


const fish1 = new Fish('/fishes/fish1.png');
const fish2 = new Fish('/fishes/fish2.png');
const fish3 = new Fish('/fishes/fish3.png');
const fish4 = new Fish('/fishes/fish4.png');
const fish5 = new Fish('/fishes/fish5.png');
const jfish = new Fish('/fishes/jfish.png');
const jfish_blue = new Fish('/fishes/jfish-blue.png');
const shark = new Fish('/fishes/shark.png');
const eeeel = new Fish('/fishes/eel.png');
const seahorse = new Fish('/fishes/seahorse.png');
const eeeel_pink = new Fish('/fishes/eel-pink.png');
const pirate_cool = new Fish('/fishes/pirate.png');
const pirate_cooler = new Fish('/fishes/pirate.png');
const pirate_coolest = new Fish('/fishes/pirate.png');
const seastar = new Fish('/fishes/seastar.png');
const cherry_shrimp = new Fish('/fishes/cherry-shrimp.png');
const sea_urchin_purple = new Fish('/fishes/sea-urchin-purple.png');
const sea_urchin_red = new Fish('/fishes/sea-urchin-red.png');
const angler_fish = new Fish('/fishes/thebigone.png');
const troll_fish = new Fish('/fishes/troll.gif');
const mickey_fish = new Fish('/fishes/cool.webp');
pirate_cool.fish.style.width = '200px';
pirate_cooler.fish.style.width = '200px';
pirate_coolest.fish.style.width = '200px';
shark.fish.style.width = '300px';
eeeel.fish.style.width = '300px';
eeeel_pink.fish.style.width = '300px';
cherry_shrimp.fish.style.width = '200px';
angler_fish.fish.style.width = '200px';
//
// Create the invisible input box
//
const hiddenInput = document.createElement('input');
hiddenInput.type = 'text';
hiddenInput.style.position = 'absolute';
hiddenInput.style.left = '-9999px'; // Moves it off-screen
hiddenInput.autocomplete = 'off'; // Prevent autocomplete dropdown
hiddenInput.id = 'secret-input';

// Append the input to the body
document.body.appendChild(hiddenInput);

// Automatically focus the input box on page load
window.addEventListener('load', () => {
  hiddenInput.focus();
});

// Listen for the secret phrase
hiddenInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (hiddenInput.value === 'thebigone') {
      const cat_fish = new Fish('/fishes/greatest image of all time.jpg');
      cat_fish.fish.style.width = '600px';
      console.log('The greatest fish has been created:', cat_fish); // Optional debug log
      hiddenInput.value = ''; // Clear the input for future uses
    }
  }
});
