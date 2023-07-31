export class widgetClock {
  constructor() {
    this.widgetSettings = {
      actionItem: "clock",
      body: this.widgetBody,
      init: this.widgetJS,
    };
  }

  widgetBody = `
    <div class="widget-box clock transparent" data-action-app="clock">
      <div class="clock-dash">
        <div class="wrap">
          <span class="hour"></span>
          <span class="minute"></span>
          <span class="second"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  `;

  widgetJS() {
    clock();
    function clock() {
      const date = new Date();
      const hours = ((date.getHours() + 11) % 12 + 1);
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const hour = hours * 30;
      const minute = minutes * 6;
      const second = seconds * 6;
      document.querySelectorAll('.widget-box.clock .clock-dash').forEach(clock => {
        clock.querySelector('.hour').style.transform = `rotate(${hour}deg)`
        clock.querySelector('.minute').style.transform = `rotate(${minute}deg)`
        clock.querySelector('.second').style.transform = `rotate(${second}deg)`
      });
    }
    setInterval(clock, 1000);
  }

  returnSettings() {
    return this.widgetSettings;
  }
}
