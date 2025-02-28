function worksleep(delayInSeconds) {
  return new Promise(resolve => setTimeout(resolve, delayInSeconds * 1000));
}


const workButton = document.getElementById("work");
const mathProblemElement = document.createElement('h3');
const answerInput = document.createElement('input');
const timerElement = document.createElement('h3');
document.body.appendChild(mathProblemElement);
document.body.appendChild(answerInput);
document.body.appendChild(timerElement);
mathProblemElement.classList.add('hidden');
answerInput.classList.add('hidden');
timerElement.classList.add('hidden');
let score = 0;
let timeLeft = 30;
let timer;
let currentAnswer = 0;  
workButton.addEventListener("click", startChallenge);
function startChallenge() {
  score = 0;
  timeLeft = 30;
  updateTimerDisplay();
  workButton.style.display = "none";
  mathProblemElement.classList.remove('hidden');
  answerInput.classList.remove('hidden');
  timerElement.classList.remove('hidden');
  fadeInElements();
  startTimer();
  generateMathProblem();
  answerInput.addEventListener('keydown', handleAnswer);
  answerInput.focus();  
}
function updateTimerDisplay() {
  timerElement.textContent = `Time Left: ${timeLeft}s`;
}
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);  
      endChallenge();
    } else {
      timeLeft--;
      updateTimerDisplay();  
    }
  }, 1000);
}
function generateMathProblem() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = Math.random() > 0.5 ? '+' : '-';
  mathProblemElement.textContent = `Solve: ${num1} ${operator} ${num2}`;
  currentAnswer = operator === '+' ? num1 + num2 : num1 - num2;
}
function handleAnswer(event) {
  if (event.key === 'Enter') {
    const userInput = answerInput.value; 
    if (userInput === "dual") {
      try { dual(); } catch (error) { console.error("dual() function missing or errored:", error); }
    } else if (userInput === "I am rich!") {
      const originalText = document.getElementById("sleepy-text").textContent;
      document.getElementById("sleepy-text").textContent = "Oh noes! We cannot fight rich people. Take money!";
      setTimeout(() => {
        document.getElementById("sleepy-text").textContent = originalText;
      }, 5000); 
      try { earnMoney(99999999); } catch (error) { console.error("earnMoney() function missing or errored:", error); }
      score++;
    } else if (userInput === "I'm poor") {
      const originalText = document.getElementById("sleepy-text").textContent;
      document.getElementById("sleepy-text").textContent = "Congratz ur bankrupt now!";
      setTimeout(() => {
        document.getElementById("sleepy-text").textContent = originalText;
      }, 5000); 
      try { earnMoney(0-money); } catch (error) { console.error("bankrupt() function missing or errored:", error); }
      score--;
    } else if (userInput === "Le sleep") {
      try { sleep(); } catch (error) { console.error("sleep() function missing or errored:", error); }
      try { if (isDayTime) switchDayNight(); } catch (error) { console.error("switchDayNight() function missing or errored:", error); }
      score += 2; 
      try { earnMoney(9999); } catch (error) { console.error("earnMoney() function missing or errored:", error); }
      try { sleep(); } catch (error) { console.error("sleep() function missing or errored:", error); }
    } else if (userInput === "KABOOM!"){
      document.body.replaceWith(document.createElement('body'));
      const the_style = document.getElementById('normal');
      the_style.href='explode.css';
      const explosion = document.createElement('img');
      explosion.src="/assets/explosion-explode.gif";
      explosion.id="explode";
      document.body.appendChild(explosion);
      const explode_se = document.createElement('audio');
      explode_se.src="/assets/roblox-explosion-sound.mp3";
      explode_se.autoplay="true";
      document.body.appendChild(explode_se);
      localStorage.setItem("green", "true");
    } else if (userInput === "Konami code") {
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
      `;
      try {window.sleepthecat();} catch {}
      try {stopHungerDecrease();} catch {}
      try {stopHappinessDecrease();} catch {}
      document.getElementById('hunger').textContent = "BRUH";
      document.getElementById('money-text').textContent = "DEATH!!";
      document.getElementById('happy-text').textContent = "CRAZY";
      document.getElementById('sleepy-text').textContent="Time itself is ending!!!";
      document.getElementById('buttons-container').remove();
      document.getElementById('option-buttons').remove();
      try {localStorage.setItem("virtualPetSave", '{"money":666,"happiness":666,"hunger":666,"isDayTime":false, "secretFlag":true}');} catch {}
      endChallenge(); 
      if (document.getElementById('mus_btn_mus')) {document.getElementById('mus_btn_mus').remove();}
      const trip_music = document.createElement('audio');
      trip_music.autoplay='true';
      trip_music.loop="true";
      trip_music.src='/assets/Crazy.mp3';
      document.body.appendChild(trip_music); 
      clearInterval(window.lifebarcolorinterval);
      clearInterval(window.muscheck);     
      window.crazy = async function() {
        document.getElementById('hunger').classList.add('alive');
        document.getElementById('hunger').classList.add('death');
        document.getElementById('happy-text').classList.add('sad');
        await worksleep(1);
        document.getElementById('hunger').classList.remove('death');
        document.getElementById('happy-text').classList.remove('sad');
        document.getElementById('hunger').classList.remove('alive');
        await worksleep(1);
      }
      setInterval(() => window.crazy(), 600);
      const reminder = document.createElement('h1');
      reminder.textContent="Oh yeah! When you are ready to face me just reload this save!";
      document.body.appendChild(reminder);
    }else {
      const userAnswer = parseInt(userInput, 10);
      if (!isNaN(userAnswer)) {
        if (userAnswer === currentAnswer) {
          score++; 
          try { earnMoney(5); } catch (error) { console.error("earnMoney() function missing or errored:", error); }
        }
      } else {
        console.error(`Invalid input: "${userInput}" is neither a valid secret code nor a number.`);
      }
    }
    answerInput.value = '';
    generateMathProblem();
  }
}
function endChallenge() {
  mathProblemElement.textContent = `Time's up! You answered ${score} questions correctly.`;
  fadeOutElements();
  mathProblemElement.classList.add('hidden');
  answerInput.classList.add('hidden');
  timerElement.classList.add('hidden');
  workButton.style.display = "block";
}
function fadeInElements() {
  mathProblemElement.classList.remove('fade-out');
  answerInput.classList.remove('fade-out');
  timerElement.classList.remove('fade-out');

  mathProblemElement.classList.add('fade');
  answerInput.classList.add('fade');
  timerElement.classList.add('fade');
}
function fadeOutElements() {
  mathProblemElement.classList.add('fade-out');
  answerInput.classList.add('fade-out');
  timerElement.classList.add('fade-out');
}
function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
