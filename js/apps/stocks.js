export class stocks {
  constructor() {
    this.appSettings = {
      appName: "Stocks",
      actionItem: "stocks",
      appWidth: 400,
      appHeight: 600,
      game: false,
      desktop: true,
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
