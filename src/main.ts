import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Alchemy and Mischief";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "⚗️";
app.append(button);

let click_count: number = 0;
const click_report = document.createElement("div");
click_report.innerHTML = `Flasks Brewed: ${click_count}`;
app.append(click_report);

const incrementCounter = function() {
    click_count++;
    click_report.innerHTML = `Flasks Brewed: ${click_count}`;
}

button.onclick = () => {
  incrementCounter();
};

const auto_click_interval = setInterval(incrementCounter, 1000);
