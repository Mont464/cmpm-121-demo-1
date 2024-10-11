import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alchemy and Mischief";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker_button = document.createElement("button");
clicker_button.style.backgroundColor = "#9733ff";
clicker_button.style.width = "150px";
clicker_button.style.height = "150px";
clicker_button.style.borderRadius = "50%";
clicker_button.innerHTML = "⚗️<br>⚗️BREW⚗️<br>⚗️";
clicker_button.style.textAlign = "center";
clicker_button.style.fontSize = "20px";

app.append(clicker_button);

let click_count: number = 0;
const click_report = document.createElement("div");
click_report.innerHTML = `Flasks Brewed: ${click_count}`;
app.append(click_report);

const incrementCounter = function (n: number) {
  click_count += n;
  click_report.innerHTML = `Flasks Brewed: ${click_count.toFixed(3)}`;
};

clicker_button.onclick = () => {
  incrementCounter(1);
};

let auto_growth: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  up_count: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Goblin Gardener", cost: 10, rate: 0.1, up_count: 0, description: "Resourceful goblin that gathers plants for new potions" },
  { name: "Golden Cauldron", cost: 50, rate: 0.5, up_count: 0, description: "More Cauldrons = More Potions" },
  { name: "Goblin Wizard", cost: 100, rate: 2, up_count: 0, description: "Magial maniacs that can clone resources and potions" },
  { name: "Mystic Catalyst", cost: 1000, rate: 50, up_count: 0, description: "The most valuable item in alchemy" },
  { name: "Gonk, the Omnipotent Goblin", cost: 10000, rate: 150, up_count: 0, description: "Gonk is he. Gonk help" },
];

const buttons: HTMLButtonElement[] = [];
for (let i = 0; i < availableItems.length; i++) {
  buttons[i] = document.createElement("button");
  buttons[i].innerHTML =
    `${availableItems[i].cost.toFixed(2)} Flasks🧪: Get ${availableItems[i].name}<br>${availableItems[i].description}<br>Increases Auto Generation by ${availableItems[i].rate}<br>Current Level: ${availableItems[i].up_count}`;
  app.append(buttons[i]);
  buttons[i].disabled = true;

  buttons[i].onclick = () => {
    if (click_count >= availableItems[i].cost) {
      click_count -= availableItems[i].cost;
      availableItems[i].cost *= 1.15;
      auto_growth += availableItems[i].rate;
      auto_growth_report.innerHTML = `Current Auto Generation Level: ${auto_growth.toFixed(1)} Flasks/sec`;
      availableItems[i].up_count++;
      buttons[i].innerHTML =
        `${availableItems[i].cost.toFixed(2)} Flasks🧪: Hire ${availableItems[i].name}<br>Increases Auto Generation by ${availableItems[i].rate}<br>Current Level: ${availableItems[i].up_count}`;
    }
  };
}

const auto_growth_report = document.createElement("div");
auto_growth_report.innerHTML = `Current Auto Generation Level: ${auto_growth} Flasks/sec`;
app.append(auto_growth_report);

let previous_time = performance.now();
let current_time = 0;
const autoIncrement = function () {
  current_time = performance.now();
  incrementCounter(auto_growth * ((current_time - previous_time) / 1000));
  previous_time = current_time;

  for (let i = 0; i < buttons.length; i++) {
    if (click_count >= availableItems[i].cost) {
      buttons[i].disabled = false;
    } else {
      buttons[i].disabled = true;
    }
  }
  requestAnimationFrame(autoIncrement);
};

requestAnimationFrame(autoIncrement);
