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

const incrementCounter = function (n:number) {
  click_count += n;
  click_report.innerHTML = `Flasks Brewed: ${click_count}`;
};

button.onclick = () => {
  incrementCounter(1);
};

let previous_time = performance.now();
let current_time = 0;
const autoIncrement = function () {
    current_time = performance.now();
    incrementCounter((current_time - previous_time)/1000);
    previous_time = current_time;
    requestAnimationFrame(autoIncrement);
}

requestAnimationFrame(autoIncrement);

