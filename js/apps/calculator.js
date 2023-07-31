export class calculator {
  constructor() {
    this.appSettings = {
      appName: "Calculator",
      actionItem: "calculator",
      appWidth: 330,
      appHeight: 668,
      disableResize: true,
      game: false,
      desktop: true,
      menuBar: true,
      body: this.appBody(),
      init: this.appJS,
    };
  }

  appBody() {
    return `
    <div class="window__body calculator transparent">
      <main class="calc">
        <div class="calc__screen">
          <div class="calc__screen-top"></div>
          <div class="calc__screen-bottom">0</div>
        </div>
        <div class="calc__keyboard">
          <div class="calc__keyboard-line">
            <button data-index="ac" class="calc__keyboard-key color1">AC</button>
            <button data-index="c" class="calc__keyboard-key color1"></button>
            <div class="calc__keyboard-key empty color1"></div>
            <button data-index="/" class="calc__keyboard-key color2">&#247;</button>
          </div>
          <div class="calc__keyboard-line">
          <button data-index="1" class="calc__keyboard-key color3">1</button>
          <button data-index="2" class="calc__keyboard-key color3">2</button>
          <button data-index="3" class="calc__keyboard-key color3">3</button>
            <button data-index="*" class="calc__keyboard-key color2">x</button>
          </div>
          <div class="calc__keyboard-line">
            <button data-index="4" class="calc__keyboard-key color3">4</button>
            <button data-index="5" class="calc__keyboard-key color3">5</button>
            <button data-index="6" class="calc__keyboard-key color3">6</button>
            <button data-index="-" class="calc__keyboard-key color2">-</button>
          </div>
          <div class="calc__keyboard-line">
            <button data-index="7" class="calc__keyboard-key color3">7</button>
            <button data-index="8" class="calc__keyboard-key color3">8</button>
            <button data-index="9" class="calc__keyboard-key color3">9</button>
            <button data-index="+" class="calc__keyboard-key color2">+</button>
          </div>
          <div class="calc__keyboard-line">
          <div class="calc__keyboard-key empty color3"></div>
          <button data-index="0" class="calc__keyboard-key color3">0</button>
            <button data-index="." class="calc__keyboard-key bold color3">.</button>
            <button data-index="=" class="calc__keyboard-key color2">=</button>
          </div>
        </div>
      </main>
    </div>`;
  }

  appJS() {
    const displayTop = document.querySelector('.calc__screen-top');
    const displayBottom = document.querySelector('.calc__screen-bottom');
    const calcKeys = document.querySelectorAll('.calc__keyboard-key');
    let arr = [];
    let sum = 0;

    function listenKeys() {
      for (const key of calcKeys) {
        key.addEventListener("click", () => {
          if (!isNaN(key.dataset.index)) {
            if (arr.length === 0 || isNaN(arr[arr.length - 1])) addToArr("push", key.dataset.index);
            else if (arr[arr.length - 1] !== "0") addToArr("add", key.dataset.index);
          }
          else if (key.dataset.index === ".") {
            if (arr.length === 0 || isNaN(arr[arr.length - 1])) addToArr("push", "0.");
            else if (!arr[arr.length - 1].includes(".")) addToArr("add", ".");
          }
          else if (key.dataset.index === "-") {
            addToArr("push", key.dataset.index);
          }
          else if (key.dataset.index === "+" || key.dataset.index === "*" || key.dataset.index === "/") {
            if (arr.length > 0) addToArr("push", key.dataset.index);
          }
          else if (key.dataset.index === "ac") {
            arr = [];
            sum = 0;
          }
          else if (key.dataset.index === "c") {
            if(arr[arr.length - 1]) arr[arr.length - 1].length === 1 ? arr.pop() : arr[arr.length - 1] = arr[arr.length - 1].slice(0, -1);
            else {
              arr = [];
              sum = 0;
            }
          }
          else if (key.dataset.index === "=") {
            if (arr.length > 0 && !isNaN(arr[arr.length - 1])) {
              sum = eval(arr.join(""));
              arr = [];
            }
          }
          updateScreen();
        });
      }
    }

    function addToArr(method, value) {
      if (isNaN(value) && arr.length > 0 && isNaN(arr[arr.length - 1])) {
        if (arr.length > 1) arr[arr.length - 1] = value;
      }
      else if (arr.join("").length <= 35 || isNaN(arr[arr.length - 1])) {
        if (method === "push") arr.push(value.toString());
        else if (method === "add") arr[arr.length - 1] += value.toString();
      }
    }

    function updateScreen() {
      const equation = arr.join(" ").replace(/[/]/g, "÷").replace(/[*]/g, "x").toString();
      sum = sum.toString();
      if (!/\d/.test(sum)) sum = "Don't do that!";
      const sum_parts = sum.split(".");
      sum_parts[0] = sum_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      sum = sum_parts.join(".");
      if (sum.length > 6 || equation.length > 13) {
        displayTop.classList.add("small");
        displayBottom.classList.add("small");
      } else {
        displayTop.classList.remove("small");
        displayBottom.classList.remove("small");
      }
      displayTop.innerText = equation;
      displayBottom.innerText = sum;
    }
    listenKeys();
  }

  returnSettings() {
    return this.appSettings;
  }
}
