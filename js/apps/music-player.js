export class musicPlayer {
  constructor() {
    this.appSettings = {
        appName: "Music player",
        actionItem: "music-player",
        appWidth: 600,
        appHeight: 400,
        game: true,
        desktop: true,
        menuBar: true,
        body: this.appBody(),
      };
    }
  
    init() {
    }
  
    appBody() {
      return `<div class="window__body">
        Work in progress
      </div>`;
    }
  
    returnSettings() {
      return this.appSettings;
    }
  }
  