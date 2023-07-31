export class internetBrowser {
  constructor() {
    this.appSettings = {
      appName: "Internet Browser",
      actionItem: "internet-browser",
      appWidth: 900,
      appHeight: 600,
      game: false,
      desktop: true,
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
