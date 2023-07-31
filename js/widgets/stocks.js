export class widgetStocks {
  constructor() {
    this.widgetSettings = {
      actionItem: "stocks",
      body: this.widgetBody,
      init: this.widgetJS,
    };
  }

  widgetBody = `
    <div class="widget-box stocks" data-action-app="stocks">
      <span>Stocks widget</span>
    </div>
  `;

  widgetJS() {
  }

  returnSettings() {
    return this.widgetSettings;
  }
}
