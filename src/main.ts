import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alchemy and Mischief";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker_button = document.createElement("button");
clicker_button.innerHTML = "⚗️BREW⚗️";
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
const growth_upgrade_button = document.createElement("button");
growth_upgrade_button.innerHTML = `🧪Increase Auto Distillation🧪\nCurrent Level: ${auto_growth}`;
app.append(growth_upgrade_button);
growth_upgrade_button.disabled = true;

growth_upgrade_button.onclick = () => {
  if (click_count >= 10) {
    click_count -= 10;
    auto_growth++;
    growth_upgrade_button.innerHTML = `🧪Increase Auto Distillation🧪\nCurrent Level: ${auto_growth}`;
  }
};


let previous_time = performance.now();
let current_time = 0;
const autoIncrement = function () {
  current_time = performance.now();
  incrementCounter(auto_growth * ((current_time - previous_time) / 1000));
  previous_time = current_time;

  if(click_count >= 10) {
    growth_upgrade_button.disabled = false;
  }

  requestAnimationFrame(autoIncrement);
};

requestAnimationFrame(autoIncrement);
