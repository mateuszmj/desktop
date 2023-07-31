export class weatherOnMars {
  constructor() {
    this.appSettings = {
      appName: "Weather on Mars",
      actionItem: "weather-on-mars",
      appWidth: 800,
      appHeight: 600,
      game: true,
      desktop: false,
      menuBar: false,
      body: this.appBody(),
    };
  }

  appBody() {
    return `<div class="window__body">Work in progress</div>`;
  }

  returnSettings() {
    return this.appSettings;
  }
}
