function fool() {
    alert("You fell for my trap fooooool!");
}

function checkme() {

}

/*document.getElementById('clickme').addEventListener('click', fool);*/
var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}
function coolvideo(videofile, noControls) {
    // Fullscreen logic
    const elem = document.documentElement; // Ensure we request fullscreen from the root element
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  
    // Remove all existing content on the page
    document.body.innerHTML = '';
  
    // Create a new video element
    const video = document.createElement('video');
    video.src = videofile;  // Set the video source
    video.autoplay = true;   // Set autoplay to true
    video.id = 'video-player';
  
    if (noControls) {
      video.controls = false;  // Disable controls
      video.loop = true;
      video.addEventListener('play', function() {
        // Prevent pause (if no controls)
        video.onpause = function() {
          video.play();  // Prevent the video from pausing
        };
      });
    } else {
      video.controls = true;   // Enable video controls
    }
  
    // Set video to cover the whole page
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100vw';
    video.style.height = '100vh';
  
    // Add event listener to detect any control changes (showing controls or pausing)
    video.addEventListener('pause', function() {
      if (noControls) {
        alert("There is no escape");
        video.play();  // Keep playing to prevent pausing
      }
    });
  
    // Append the video to the body
    document.body.appendChild(video);
    // Get the video element by ID
  }


function aquarium() {
  window.location="/dash projects/Bubbles/";
}

function gamerz() {
  window.location="/dash projects/cool-lil-game/"
}

function L(url) {
  window.location=url
}
/*
// Wait for the page to load
window.onload = function () {
  // Create the input field dynamically
  let inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', "Ask me the secret code for finding secrets to get started. Type the secret code and press return");
  inputField.style.position = 'absolute';
  inputField.style.top = '20px';
  inputField.style.left = '50%';
  inputField.style.transform = 'translateX(-50%)';
  inputField.style.padding = '10px';
  inputField.id="removethis";
  document.body.appendChild(inputField);

  // Create the secret popup window (hidden initially)
  let secretPopup = document.createElement('div');
  secretPopup.style.display = 'none';
  secretPopup.style.position = 'fixed';
  secretPopup.style.top = '10%';
  secretPopup.style.left = '50%';
  secretPopup.style.transform = 'translateX(-50%)';
  secretPopup.style.width = '80%';
  secretPopup.style.maxWidth = '600px';
  secretPopup.style.backgroundColor = 'white';
  secretPopup.style.border = '2px solid black';
  secretPopup.style.padding = '20px';
  secretPopup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  secretPopup.style.zIndex = '9999';
  document.body.appendChild(secretPopup);

  // Create a container for the PDF canvas
  let pdfContainer = document.createElement('div');
  pdfContainer.style.overflowY = 'auto';
  pdfContainer.style.height = '400px';
  pdfContainer.style.border = '1px solid #ddd';
  pdfContainer.style.marginBottom = '10px';
  secretPopup.appendChild(pdfContainer);

  // Create a canvas for rendering the PDF
  let canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  pdfContainer.appendChild(canvas);

  // Create the navigation buttons
  let buttonContainer = document.createElement('div');
  buttonContainer.style.textAlign = 'center';

  let prevButton = document.createElement('button');
  prevButton.textContent = 'Previous Page';
  prevButton.style.marginRight = '10px';
  prevButton.onclick = function () {
      if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
      }
  };
  buttonContainer.appendChild(prevButton);

  let nextButton = document.createElement('button');
  nextButton.textContent = 'Next Page';
  nextButton.onclick = function () {
      if (currentPage < pdfDoc.numPages) {
          currentPage++;
          renderPage(currentPage);
      }
  };
  buttonContainer.appendChild(nextButton);

  secretPopup.appendChild(buttonContainer);

  // Create the close button for the popup
  let closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.onclick = function () {
      secretPopup.style.display = 'none'; // Close the popup
  };
  buttonContainer.appendChild(closeButton);

  // PDF.js variables
  let pdfDoc = null;
  let currentPage = 1;
  const scale = 1.5; // Adjust the scale for better readability

  // Load and render a specific page of the PDF
  function renderPage(pageNum) {
      pdfDoc.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({ scale });
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
              canvasContext: context,
              viewport: viewport,
          };
          page.render(renderContext);
      });
  }

  // Load the PDF using PDF.js
  function renderPDF(url) {
      const pdfjsLib = window['pdfjs-dist/build/pdf'];

      if (!pdfjsLib) {
          console.error('PDF.js is not loaded. Ensure the library is properly included.');
          return;
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then(function (pdf) {
          pdfDoc = pdf;
          renderPage(currentPage); // Render the first page
      }).catch(function (error) {
          console.error('Error loading PDF:', error);
      });
  }

  // Function to check if the input is correct and unlock secrets
  function unlockSecrets() {
      if (inputField.value.trim() === 'unlock_secrets();') {
          secretPopup.style.display = 'block'; // Show the secret popup
          renderPDF('/secrets/handbook.pdf'); // Render the PDF
      } else if (inputField.value.trim() === 'Fight me.') {
        window.location="/fight-me/"
      }
      else if (inputField.value.trim() === 'Bite me!') {
        const newaudio = document.createElement('audio');
        newaudio.loop=true;
        newaudio.autoplay=true;
        newaudio.src="/secrets/BITE ME.mp3";
        newaudio.id="secret-music";
        document.body.append(newaudio);
        biteme();
      } else if (inputField.value.trim() === 'Hortas edition!') {
        hortas();
      }
      else{
          alert("Incorrect command. Try again!");
      }
  }

  // Add an event listener for the Enter key press
  inputField.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
          e.preventDefault(); // Prevent the default behavior (form submission)
          unlockSecrets(); // Unlock the secrets if the input is correct
      }
  });
};
*/
function biteme() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.remove());
  const stupid_text = document.querySelectorAll('.rgb-split');
  stupid_text.forEach(stupid_text => stupid_text.remove());
  /*const test_text = document.getElementById('testing');
  test_text.remove();
  const click_me_text = document.getElementById('clickme');
  click_me_text.remove();
  text_input_bar_thingy = document.getElementById('removethis');
  text_input_bar_thingy.remove();*/
  const cool_kat = document.getElementById("oneko");
  cool_kat.remove();
  const stupid_space_css = document.getElementById("stupid-space-css");
  stupid_space_css.remove();
  const biteme_css = document.createElement("style");
  biteme_css.textContent = "body {background-color: black;}"
  document.body.appendChild(biteme_css);
  const stupid_containerz = document.querySelectorAll('.container');
  stupid_containerz.forEach(stupid_text => stupid_text.remove());
  const hacker_about_me = document.getElementById('about-me-div');
  hacker_about_me.remove();
  if (document.getElementById('cool_mus_thing')) {
    document.getElementById('cool_mus_thing').remove();
  }
  const snowflakeCount = 500; 
  const snowflakes = [];
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.textContent = '*';
    Object.assign(snowflake.style, {
      position: 'absolute',
      color: 'white',
      fontSize: '1rem',
      userSelect: 'none',
      pointerEvents: 'none',
    });
    document.body.appendChild(snowflake);
  
    snowflakes.push({
      el: snowflake,
      x: Math.random() * width,
      y: Math.random() * height,
      speedX: Math.random() * 2 - 1, 
      speedY: Math.random() * 3 + 1, 
      size: Math.random() * 2 + 1,
    });
  }
  
  function updateSnowflakes() {
    snowflakes.forEach(snowflake => {
      snowflake.x += snowflake.speedX;
      snowflake.y += snowflake.speedY;
  
      if (snowflake.y > height) {
        snowflake.y = -10;
        snowflake.x = Math.random() * width;
      }
      if (snowflake.x > width) {
        snowflake.x = 0;
      } else if (snowflake.x < 0) {
        snowflake.x = width;
      }
  
      Object.assign(snowflake.el.style, {
        transform: `translate(${snowflake.x}px, ${snowflake.y}px) scale(${snowflake.size})`,
        opacity: Math.random() * 0.8 + 0.2, 
      });
    });
  }
  
  function animate() {
    updateSnowflakes();
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
  });
  
  animate();
}

function hortas() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.remove());
  const stupid_text = document.querySelectorAll('.rgb-split');
  stupid_text.forEach(stupid_text => stupid_text.remove());
  /*const test_text = document.getElementById('testing');
  test_text.remove();
  const click_me_text = document.getElementById('clickme');
  click_me_text.remove();
  const text_input_bar_thingy = document.getElementById('removethis');
  text_input_bar_thingy.remove();*/
  const cool_kat = document.getElementById("oneko");
  cool_kat.remove();
  const stupid_containerz = document.querySelectorAll('.container');
  stupid_containerz.forEach(stupid_text => stupid_text.remove());
  const hacker_about_me = document.getElementById('about-me-div');
  hacker_about_me.remove();
  if (document.getElementById('cool_mus_thing')) {
    document.getElementById('cool_mus_thing').remove();
  }
  const music_html_thingy = document.createElement('audio');
  music_html_thingy.src = "/secrets/HORTAS_EDITION.ogg";
  music_html_thingy.autoplay = "true";
  music_html_thingy.loop = "true";
  document.body.appendChild(music_html_thingy);

  const hortasbg_css = document.createElement('style');
  hortasbg_css.textContent = `
    body {
        margin: 0; /* Remove default margin */
        padding: 0; /* Remove default padding */
        overflow: hidden; /* Prevent scrollbars */
    }

    #hortasbg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw; /* Full width of the viewport */
        height: 100vh; /* Full height of the viewport */
        object-fit: cover; /* Ensures the image covers the screen without distortion */
        z-index: -1; /* Places the image behind all other elements */
    }
  `;
  document.body.appendChild(hortasbg_css);

  const canvas = document.createElement('canvas');
  canvas.id = 'hortasbg';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const hortasbg_img = new Image();
  hortasbg_img.src = "/secrets/hortasbg.png";
  hortasbg_img.onload = () => {
    ctx.drawImage(hortasbg_img, 0, 0, canvas.width, canvas.height);
    // Keep the background image updated on resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(hortasbg_img, 0, 0, canvas.width, canvas.height);
    });
  };
}

function bite_me() {
  const newaudio = document.createElement('audio');
  newaudio.loop=true;
  newaudio.autoplay=true;
  newaudio.src="/secrets/BITE ME.mp3";
  newaudio.id="secret-music";
  biteme();
}


function snake() {
  window.location = "snake.html";
}

const hacker_logo = document.getElementById("logo-hacker");
if (hacker_logo) {
  hacker_logo.addEventListener('click', snake);
} else {
  console.error("Logo element not found!");
}

function splash() {
  var splashes = ["Imagen a hacker!", "Now funny", "When was 1998 again?", "Who likes old tech anymore?", "Who puts a DPI switch on the buttom on a mouse?", "Never gonna give you up!", "Cool space theme", "Visit http://simb0rg.com to support my friend :)", "When the imposter is sus", "ඞ", "ඞඞඞඞඞඞඞ", "L", "Yeah fortnite we about to get down", "Is it zap or maxwell?", "Game genie?", "Is it a NES or a SNES game?", "Imagen playing a game using cable", "Lets play on the virtual boy", "Who even is Simon Eagar?", "Splatoon > Fortnite", "Do you read HTML, JAVASCRIPT, and CSS like a book or is that a nerd thing?", "theoldnet.com go back to the past!"];
  const splash_text = document.createElement("h5");
  splash_text.textContent+=splashes[Math.floor(Math.random()*splashes.length)];
  splash_text.id="splash-text";
  const hacker_about_me_splash_injection = document.getElementById('about-me-div');
  hacker_about_me_splash_injection.appendChild(splash_text);
}


splash();