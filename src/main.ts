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

let upgrade_a_count = 0;
const growth_upgrade_button = document.createElement("button");
growth_upgrade_button.innerHTML = `10 Flasks🧪: Hire Goblin Apprentice<br>Increases Auto Generation by 0.1x<br>Current Level: ${upgrade_a_count}`;
app.append(growth_upgrade_button);
growth_upgrade_button.disabled = true;

growth_upgrade_button.onclick = () => {
  if (click_count >= 10) {
    click_count -= 10;
    auto_growth += 0.1;
    upgrade_a_count++;
    growth_upgrade_button.innerHTML = `10 Flasks🧪: Hire Goblin Apprentice<br>
    Increases Auto Generation by 0.1x<br>
    Current Level: ${upgrade_a_count}`;
  }
};

let upgrade_b_count = 0;
const greater_upgrade_button = document.createElement("button");
greater_upgrade_button.innerHTML = `100 Flasks🧪: Hire Goblin Wizard<br>
Increases Auto Generation by 2x<br>
Current Level: ${upgrade_b_count}`;
app.append(greater_upgrade_button);
greater_upgrade_button.disabled = true;

greater_upgrade_button.onclick = () => {
  if (click_count >= 100) {
    click_count -= 100;
    auto_growth += 2;
    upgrade_b_count++;
    greater_upgrade_button.innerHTML = `100 Flasks🧪: Hire Goblin Wizard<br>
    Increases Auto Generation by 2x<br>
    Current Level: ${upgrade_b_count}`;
  }
};

let upgrade_c_count = 0;
const major_upgrade_button = document.createElement("button");
major_upgrade_button.innerHTML = `1000 Flasks🧪: Buy Mystic Catalyst<br>
    Increases Auto Generation by 50x<br>
    Current Level: ${upgrade_c_count}`;
app.append(major_upgrade_button);
major_upgrade_button.disabled = true;

major_upgrade_button.onclick = () => {
  if (click_count >= 1000) {
    click_count -= 1000;
    auto_growth += 50;
    upgrade_c_count++;
    major_upgrade_button.innerHTML = `1000 Flasks🧪: Buy Mystic Catalyst<br>
    Increases Auto Generation by 50x<br>
    Current Level: ${upgrade_c_count}`;
  }
};

let previous_time = performance.now();
let current_time = 0;
const autoIncrement = function () {
  current_time = performance.now();
  incrementCounter(auto_growth * ((current_time - previous_time) / 1000));
  previous_time = current_time;

  if (click_count >= 10) {
    growth_upgrade_button.disabled = false;
  } else {
    growth_upgrade_button.disabled = true;
  }

  if (click_count >= 100) {
    greater_upgrade_button.disabled = false;
  } else {
    greater_upgrade_button.disabled = true;
  }

  if (click_count >= 1000) {
    major_upgrade_button.disabled = false;
  } else {
    major_upgrade_button.disabled = true;
  }

  requestAnimationFrame(autoIncrement);
};

requestAnimationFrame(autoIncrement);
