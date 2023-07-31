export class widgetNone {
  constructor() {
    this.widgetSettings = {
      actionItem: "none",
      body: this.widgetBody,
    };
  }

  widgetBody = `
    <div class="widget-box none"></div>
  `;

  returnSettings() {
    return this.widgetSettings;
  }
}
