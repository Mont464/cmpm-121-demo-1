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

let click_count: number = 1000;
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
  name: string,
  cost: number,
  rate: number,
  up_count: number
};

const availableItems : Item[] = [
  {name: "Goblin Apprentice", cost: 10, rate: 0.1, up_count: 0},
  {name: "Goblin Wizard", cost: 100, rate: 2, up_count: 0},
  {name: "Mystic Catalyst", cost: 1000, rate: 50, up_count: 0},
];

const growth_upgrade_button = document.createElement("button");
growth_upgrade_button.innerHTML = `${availableItems[0].cost.toFixed(2)} Flasks🧪: Hire ${availableItems[0].name}<br>Increases Auto Generation by ${availableItems[0].rate}<br>Current Level: ${availableItems[0].up_count}`;
app.append(growth_upgrade_button);
growth_upgrade_button.disabled = true;

growth_upgrade_button.onclick = () => {
  if (click_count >= availableItems[0].cost) {
    click_count -= availableItems[0].cost;
    availableItems[0].cost *= 1.15;
    auto_growth += availableItems[0].rate;
    auto_growth_report.innerHTML = `Current Auto Generation Level: ${auto_growth.toFixed(1)} Flasks/sec`;
    availableItems[0].up_count++;
    growth_upgrade_button.innerHTML = `${availableItems[0].cost.toFixed(2)} Flasks🧪: Hire ${availableItems[0].name}<br>Increases Auto Generation by ${availableItems[0].rate}<br>Current Level: ${availableItems[0].up_count}`;;
  }
};

const greater_upgrade_button = document.createElement("button");
greater_upgrade_button.innerHTML = `${availableItems[1].cost.toFixed(2)} Flasks🧪: Hire ${availableItems[1].name}<br>Increases Auto Generation by ${availableItems[1].rate}<br>Current Level: ${availableItems[1].up_count}`;
app.append(greater_upgrade_button);
greater_upgrade_button.disabled = true;

greater_upgrade_button.onclick = () => {
  if (click_count >= availableItems[1].cost) {
    click_count -= availableItems[1].cost;
    availableItems[1].cost *= 1.15;
    auto_growth += availableItems[1].rate;
    auto_growth_report.innerHTML = `Current Auto Generation Level: ${auto_growth.toFixed(1)} Flasks/sec`;
    availableItems[1].up_count++;
    greater_upgrade_button.innerHTML = `${availableItems[1].cost.toFixed(2)} Flasks🧪: Hire ${availableItems[1].name}<br>Increases Auto Generation by ${availableItems[1].rate}<br>Current Level: ${availableItems[1].up_count}`;
  }
};

const major_upgrade_button = document.createElement("button");
major_upgrade_button.innerHTML = `${availableItems[2].cost.toFixed(2)} Flasks🧪: Buy ${availableItems[2].name}<br>Increases Auto Generation by ${availableItems[2].rate}<br>Current Level: ${availableItems[2].up_count}`;
app.append(major_upgrade_button);
major_upgrade_button.disabled = true;

major_upgrade_button.onclick = () => {
  if (click_count >= availableItems[2].cost) {
    click_count -= availableItems[2].cost;
    availableItems[2].cost *= 1.15;
    auto_growth += availableItems[2].rate;
    auto_growth_report.innerHTML = `Current Auto Generation Level: ${auto_growth.toFixed(1)} Flasks/sec`;
    availableItems[2].up_count++;
    major_upgrade_button.innerHTML = `${availableItems[2].cost.toFixed(2)} Flasks🧪: Hire ${availableItems[2].name}<br>Increases Auto Generation by ${availableItems[2].rate}<br>Current Level: ${availableItems[2].up_count}`;
  }
};

const auto_growth_report = document.createElement("div");
auto_growth_report.innerHTML = `Current Auto Generation Level: ${auto_growth} Flasks/sec`;
app.append(auto_growth_report);

let previous_time = performance.now();
let current_time = 0;
const autoIncrement = function () {
  current_time = performance.now();
  incrementCounter(auto_growth * ((current_time - previous_time) / 1000));
  previous_time = current_time;

  if (click_count >= availableItems[0].cost) {
    growth_upgrade_button.disabled = false;
  } else {
    growth_upgrade_button.disabled = true;
  }

  if (click_count >= availableItems[1].cost) {
    greater_upgrade_button.disabled = false;
  } else {
    greater_upgrade_button.disabled = true;
  }

  if (click_count >= availableItems[2].cost) {
    major_upgrade_button.disabled = false;
  } else {
    major_upgrade_button.disabled = true;
  }

  requestAnimationFrame(autoIncrement);
};

requestAnimationFrame(autoIncrement);
