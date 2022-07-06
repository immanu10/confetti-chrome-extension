//In progress
const submitBtn = document.getElementById("save");
const selection = document.getElementById("confetti-type");
const savedAlert = document.getElementById("savedalert");
const defaultViewMsg = document.getElementById("defaultViewMsg");

const style = ["Basic", "Random", "Party-Gun"];

chrome.storage.sync.get("viewIndex", ({ viewIndex }) => {
  if (viewIndex) {
    defaultViewMsg.textContent = `${style[viewIndex]}`;
    selection.selectedIndex = viewIndex;
  } else {
    defaultViewMsg.textContent = `${style[0]}`;
    selection.selectedIndex = 0;
  }
});

function saveView(e) {
  e.preventDefault();
  const viewIndex = selection.selectedIndex;
  chrome.storage.sync.set({ viewIndex });
  defaultViewMsg.textContent = `${style[viewIndex]}`;
  sendNotification();
}
function sendNotification() {
  savedAlert.textContent = `Saved!`;
  setTimeout(function () {
    savedAlert.textContent = "";
  }, 1000);
}
submitBtn.addEventListener("click", saveView);
