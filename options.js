//In progress
const submitBtn = document.getElementById("save");
const selection = document.getElementById("confetti-type");
const savedAlert = document.getElementById("savedalert");
const defaultViewMsg = document.getElementById("defaultViewMsg");

const style = ["Basic", "Random", "Party-Gun"];

chrome.storage.sync.get("viewIndex", ({ viewIndex }) => {
  defaultViewMsg.textContent = `${style[viewIndex]}`;
  selection.selectedIndex = viewIndex;
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
