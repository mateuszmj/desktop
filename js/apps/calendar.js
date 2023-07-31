export class calendar {
  constructor() {
    this.appSettings = {
      appName: "Calendar",
      actionItem: "calendar",
      appWidth: 400,
      appHeight: 400,
      disableResize: false,
      game: false,
      desktop: false,
      menuBar: true,
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
