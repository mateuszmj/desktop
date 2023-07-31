export class widgetCalendar {
  constructor() {
    this.widgetSettings = {
      actionItem: "calendar",
      body: this.widgetBody,
      init: this.widgetJS,
    };
  }

  widgetBody = `
    <div class="widget-box calendar" data-action-app="calendar">
      <span>Calendar widget</span>
    </div>
  `;

  widgetJS() {
  }

  returnSettings() {
    return this.widgetSettings;
  }
}
