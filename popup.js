async function start() {
  const effectStyle = document.getElementById("effectStyle");
  const prevEffect = document.getElementById("prevEffect");
  const nextEffect = document.getElementById("nextEffect");

  const less_cannon = document.getElementById("less-cannon");
  const average_cannon = document.getElementById("average-cannon");
  const more_cannon = document.getElementById("more-cannon");

  const style = ["Basic", "Random", "Party-Gun"];

  document.addEventListener("DOMContentLoaded", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["confetti.browser.js"],
    });
  });

  async function getUserSettings() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get("viewIndex", ({ viewIndex }) => {
        resolve(viewIndex);
      });
    });
  }
  async function getPageIndex() {
    let defaultPage = await getUserSettings();
    return defaultPage;
  }

  //Animation effects
  function basicConfetti(quantity) {
    if (quantity == "less") {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.9 },
        zIndex: 9999,
      });
    } else if (quantity == "average") {
      confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.9 },
        zIndex: 9999,
      });
    } else {
      confetti({
        particleCount: 500,
        spread: 140,
        origin: { y: 0.9 },
        zIndex: 9999,
      });
    }
  }

  function randomConfetti(quantity) {
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    if (quantity == "less") {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(40, 50),
        particleCount: randomInRange(20, 100),
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.4, 1) },
        drift: randomInRange(-2, 2),
        zIndex: 9999,
      });
    } else if (quantity == "average") {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(60, 100),
        particleCount: randomInRange(200, 300),
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.4, 1) },
        drift: randomInRange(-2, 2),
        zIndex: 9999,
      });
    } else {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(120, 140),
        particleCount: randomInRange(400, 500),
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.4, 1) },
        drift: randomInRange(-2, 2),
        zIndex: 9999,
      });
    }
  }

  function gunConfetti(quantity) {
    let end = Date.now() + 2 * 1000;

    if (quantity == "less") {
      (function frame() {
        confetti({
          particleCount: 2,
          colors: ["88ff5a", "#a25afd"],
          angle: 60,
          spread: 45,
          origin: { x: 0, y: 0.9 },
          zIndex: 9999,
        });
        confetti({
          particleCount: 2,
          colors: ["88ff5a", "#a25afd"],
          angle: 120,
          spread: 45,
          origin: { x: 1, y: 0.9 },
          zIndex: 9999,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else if (quantity == "average") {
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.9 },
          zIndex: 9999,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.9 },
          zIndex: 9999,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else {
      (function frame() {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.9 },
          zIndex: 9999,
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.9 },
          zIndex: 9999,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }

  function initExtension(pageIndex = 0) {
    effectStyle.textContent = style[pageIndex];
    let page = pageIndex;
    function makeDisabled() {
      if (page == 0) prevEffect.disabled = true;
      else if (page == 2) nextEffect.disabled = true;
      else {
        prevEffect.disabled = false;
        nextEffect.disabled = false;
      }
    }
    makeDisabled();
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

    less_cannon.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (style[page] == "Basic") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: basicConfetti,
          args: ["less"],
        });
      }
      if (style[page] == "Random") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: randomConfetti,
          args: ["less"],
        });
      }
      if (style[page] == "Party-Gun") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: gunConfetti,
          args: ["less"],
        });
      }
    });

    average_cannon.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (style[page] == "Basic") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: basicConfetti,
          args: ["average"],
        });
      }
      if (style[page] == "Random") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: randomConfetti,
          args: ["average"],
        });
      }
      if (style[page] == "Party-Gun") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: gunConfetti,
          args: ["average"],
        });
      }
    });

    more_cannon.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (style[page] == "Basic") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: basicConfetti,
          args: ["more"],
        });
      }
      if (style[page] == "Random") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: randomConfetti,
          args: ["more"],
        });
      }
      if (style[page] == "Party-Gun") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: gunConfetti,
          args: ["more"],
        });
      }
    });
  }

  const index = await getPageIndex();
  initExtension(index);
}

start();
