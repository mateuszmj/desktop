export class clock {
  constructor() {
    this.appSettings = {
      appName: "Clock",
      actionItem: "clock",
      appWidth: 400,
      appHeight: 400,
      disableResize: false,
      game: false,
      desktop: false,
      menuBar: false,
      body: this.appBody(),
      init: this.appJS,
    };
  }

  appBody() {
    return `
    <div class="window__body">
      Work in progress
    </div>`;
  }

  appJS() {}

  returnSettings() {
    return this.appSettings;
  }
}
