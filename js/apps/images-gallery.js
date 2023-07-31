export class imagesGallery {
  constructor() {
    this.appSettings = {
      appName: "Images gallery",
      actionItem: "images-gallery",
      appWidth: 800,
      appHeight: 600,
      game: false,
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

