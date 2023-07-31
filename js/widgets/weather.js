export class widgetWeather {
  constructor() {
    this.widgetSettings = {
      actionItem: "weather",
      body: this.widgetBody,
      init: this.widgetJS,
    };
  }

  widgetBody = `
    <div class="widget-box weather" data-action-app="weather">
      <span>Weather widget</span>
    </div>
  `;

  widgetJS() {
  }

  returnSettings() {
    return this.widgetSettings;
  }
}
