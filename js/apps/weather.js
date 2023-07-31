export class weather {
  constructor() {
    this.appSettings = {
      appName: "Weather",
      actionItem: "weather",
      appWidth: 400,
      appHeight: 400,
      game: false,
      desktop: false,
      menuBar: true,
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
