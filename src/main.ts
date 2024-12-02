import "./style.css";
// Visual Improvement examples:
//   Background + Text change: https://cheristic.github.io/cmpm-121-demo-1/
//   Upgrade button pop-up while hovering: https://elliem-gd.github.io/cmpm-121-demo-1/
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alchemy and Mischief";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.setAttribute(
  "style",
  "vertical-align: text-top; -webkit-text-stroke: 2px #006600;color: #66ff99; font-style: italic; font-family: lucida-handwriting; margin-top: 30px; padding-top: 20px;",
);
app.append(header);

const createButton = function (message: string) {
  const newButton = document.createElement("button");
  newButton.innerHTML = message;
  app.append(newButton);
  return newButton;
};

const clickerButton = createButton("⚗️<br>⚗️BREW⚗️<br>⚗️");
clickerButton.style.backgroundColor = "#9733ff";
clickerButton.style.width = "150px";
clickerButton.style.height = "150px";
clickerButton.style.borderRadius = "50%";
clickerButton.style.textAlign = "center";
clickerButton.style.fontSize = "20px";

let clickCount: number = 0;
const clickReport = document.createElement("div");
clickReport.innerHTML = `Flasks Brewed: ${clickCount}`;
app.append(clickReport);

const incrementCounter = function (n: number) {
  clickCount += n;
  clickReport.innerHTML = `Flasks Brewed: ${clickCount.toFixed(3)}`;
};

clickerButton.onclick = () => {
  incrementCounter(1);
};

let autoGrowth: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  upgradeCount: number;
  description: string;
}

function createItem(
  name: string,
  cost: number,
  rate: number,
  description: string,
): Item {
  return {
    name,
    cost,
    rate,
    upgradeCount: 0,
    description,
  };
}

const availableItems: Item[] = [
  createItem(
    "Goblin Gardener",
    10,
    0.1,
    "Resourceful goblin that gathers plants for new potions",
  ),
  createItem("Goblin Cauldron", 50, 0.5, "More Cauldrons = More Potions"),
  createItem(
    "Goblin Wizard",
    100,
    2,
    "Magical maniacs that can clone resources and potions",
  ),
  createItem("Mystic Catalyst", 1000, 50, "The most valuable item in alchemy"),
  createItem(
    "Gonk, the Omnipotent Goblin",
    10000,
    150,
    "Gonk is he. Gonk help",
  ),
];

// Create a tooltip element
const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
tooltip.style.color = "white";
tooltip.style.padding = "10px";
tooltip.style.borderRadius = "5px";
tooltip.style.fontSize = "14px";
tooltip.style.pointerEvents = "none"; // So it doesn't block interaction
tooltip.style.visibility = "hidden"; // Hide by default
app.append(tooltip);

const buttons: HTMLButtonElement[] = [];
const buttonCostScalar: number = 1.15;
for (let i = 0; i < availableItems.length; i++) {
  buttons[i] = createButton(
    `<strong>${availableItems[i].cost.toFixed(2)} Flasks🧪: Get ${availableItems[i].name}</strong><br>Current Level: ${availableItems[i].upgradeCount}`,
  );
  buttons[i].disabled = true;

  // Add mouseenter event to show tooltip
  buttons[i].addEventListener("mouseenter", (event) => {
    tooltip.innerHTML = `
      ${availableItems[i].description}<br>
      <em>Generates: ${availableItems[i].rate} Flasks/sec</em>
    `;
    tooltip.style.top = `${event.clientY + 10}px`; // Adjust position near mouse
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.visibility = "visible"; // Show tooltip
  });

  // Add mousemove event to follow the cursor
  buttons[i].addEventListener("mousemove", (event) => {
    tooltip.style.top = `${event.clientY + 10}px`; // Follow cursor
    tooltip.style.left = `${event.clientX + 10}px`;
  });

  // Add mouseleave event to hide tooltip
  buttons[i].addEventListener("mouseleave", () => {
    tooltip.style.visibility = "hidden"; // Hide tooltip when leaving
  });

  buttons[i].onclick = () => {
    if (clickCount >= availableItems[i].cost) {
      clickCount -= availableItems[i].cost;
      availableItems[i].cost *= buttonCostScalar;
      autoGrowth += availableItems[i].rate;
      autoGrowthReport.innerHTML = `Current Auto Generation Level: ${autoGrowth.toFixed(1)} Flasks/sec`;
      availableItems[i].upgradeCount++;
      buttons[i].innerHTML =
        `${availableItems[i].cost.toFixed(2)} Flasks🧪: Get ${availableItems[i].name}<br>${availableItems[i].description}<br>Increases Auto Generation by ${availableItems[i].rate}<br>Current Level: ${availableItems[i].upgradeCount}`;
    }
  };
}

const autoGrowthReport = document.createElement("div");
autoGrowthReport.innerHTML = `Current Auto Generation Level: ${autoGrowth} Flasks/sec`;
app.append(autoGrowthReport);

let previousTime = performance.now();
let currentTime = 0;
const autoIncrement = function () {
  getTime();
  decideButtonEnable();
  requestAnimationFrame(autoIncrement);
};

const getTime = function () {
  currentTime = performance.now();
  incrementCounter(autoGrowth * ((currentTime - previousTime) / 1000));
  previousTime = currentTime;
};

const decideButtonEnable = function () {
  for (let i = 0; i < buttons.length; i++) {
    if (clickCount >= availableItems[i].cost) {
      buttons[i].disabled = false;
    } else {
      buttons[i].disabled = true;
    }
  }
};

requestAnimationFrame(autoIncrement);
