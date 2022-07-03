const effectStyle = document.getElementById("effectStyle");
const prevEffect = document.getElementById("prevEffect");
const nextEffect = document.getElementById("nextEffect");

const style = ["Basic", "Random", "Fireworks"];
let page = 0;
function makeDisabled() {
  if (page == 0) prevEffect.disabled = true;
  else if (page == 2) nextEffect.disabled = true;
  else {
    prevEffect.disabled = false;
    nextEffect.disabled = false;
  }
}
prevEffect.addEventListener("click", function () {
  if (page > 0) {
    page--;
    effectStyle.textContent = style[page];
    makeDisabled();
  }
});

nextEffect.addEventListener("click", function () {
  if (page < 2) {
    page++;
    effectStyle.textContent = style[page];
    makeDisabled();
  }
});

let basic_cannon = document.getElementById("basic-cannon");
let realistic_cannon = document.getElementById("realistic-cannon");
let random_cannon = document.getElementById("random-cannon");

document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["confetti.browser.js"],
  });
});

basic_cannon.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: basicConfetti,
  });
});

realistic_cannon.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: realisticConfetti,
  });
});

random_cannon.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: randomConfetti,
  });
});

function basicConfetti() {
  confetti({
    particleCount: 100,
    spread: 60,
    origin: { y: 0.9 },
    zIndex: 9999,
  });
}
function realisticConfetti() {
  confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 0.9 },
    zIndex: 9999,
  });
}
function randomConfetti() {
  confetti({
    particleCount: 500,
    spread: 140,
    origin: { y: 0.9 },
    zIndex: 9999,
  });
}
