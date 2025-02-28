var percentageElement = document.getElementById("percentage");
var percentage = 0;

function process() {
  percentage += parseInt(Math.random() * 10);
  if (percentage > 100) {
    percentage = 100;
    setTimeout(after100, 1000);
    return;
  }
  percentageElement.innerText = percentage;
  processInterval();
}

function processInterval() {
  setTimeout(process, Math.random() * (1000 - 500) + 500)
}

function after100() {
    window.location="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}
processInterval();
