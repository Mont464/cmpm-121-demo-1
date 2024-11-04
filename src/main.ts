import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alchemy and Mischief";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clickerButton = document.createElement("button");
clickerButton.style.backgroundColor = "#9733ff";
clickerButton.style.width = "150px";
clickerButton.style.height = "150px";
clickerButton.style.borderRadius = "50%";
clickerButton.innerHTML = "⚗️<br>⚗️BREW⚗️<br>⚗️";
clickerButton.style.textAlign = "center";
clickerButton.style.fontSize = "20px";

app.append(clickerButton);

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
  upCount: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Goblin Gardener",
    cost: 10,
    rate: 0.1,
    upCount: 0,
    description: "Resourceful goblin that gathers plants for new potions",
  },
  {
    name: "Golden Cauldron",
    cost: 50,
    rate: 0.5,
    upCount: 0,
    description: "More Cauldrons = More Potions",
  },
  {
    name: "Goblin Wizard",
    cost: 100,
    rate: 2,
    upCount: 0,
    description: "Magial maniacs that can clone resources and potions",
  },
  {
    name: "Mystic Catalyst",
    cost: 1000,
    rate: 50,
    upCount: 0,
    description: "The most valuable item in alchemy",
  },
  {
    name: "Gonk, the Omnipotent Goblin",
    cost: 10000,
    rate: 150,
    upCount: 0,
    description: "Gonk is he. Gonk help",
  },
];

const buttons: HTMLButtonElement[] = [];
const buttonCostScalar: number = 1.15;
for (let i = 0; i < availableItems.length; i++) {
  buttons[i] = document.createElement("button");
  buttons[i].innerHTML =
    `${availableItems[i].cost.toFixed(2)} Flasks🧪: Get ${availableItems[i].name}<br>${availableItems[i].description}<br>Increases Auto Generation by ${availableItems[i].rate}<br>Current Level: ${availableItems[i].upCount}`;
  app.append(buttons[i]);
  buttons[i].disabled = true;

  buttons[i].onclick = () => {
    if (clickCount >= availableItems[i].cost) {
      clickCount -= availableItems[i].cost;
      availableItems[i].cost *= buttonCostScalar;
      autoGrowth += availableItems[i].rate;
      autoGrowthReport.innerHTML = `Current Auto Generation Level: ${autoGrowth.toFixed(1)} Flasks/sec`;
      availableItems[i].upCount++;
      buttons[i].innerHTML =
        `${availableItems[i].cost.toFixed(2)} Flasks🧪: Hire ${availableItems[i].name}<br>Increases Auto Generation by ${availableItems[i].rate}<br>Current Level: ${availableItems[i].upCount}`;
    }
  };
}

const autoGrowthReport = document.createElement("div");
autoGrowthReport.innerHTML = `Current Auto Generation Level: ${autoGrowth} Flasks/sec`;
app.append(autoGrowthReport);

let previousTime = performance.now();
let currentTime = 0;
const autoIncrement = function () {
  currentTime = performance.now();
  incrementCounter(autoGrowth * ((currentTime - previousTime) / 1000));
  previousTime = currentTime;

  decideButtonEnable();

  requestAnimationFrame(autoIncrement);
};

const decideButtonEnable  = function() {
  for (let i = 0; i < buttons.length; i++) {
    if (clickCount >= availableItems[i].cost) {
      buttons[i].disabled = false;
    } else {
      buttons[i].disabled = true;
    }
  }
};

requestAnimationFrame(autoIncrement);
