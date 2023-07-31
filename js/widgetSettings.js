import { widgetNone } from "./widgets/none.js";
import { widgetClock } from "./widgets/clock.js";
import { widgetCalendar } from "./widgets/calendar.js";
import { widgetWeather } from "./widgets/weather.js";
import { widgetStocks } from "./widgets/stocks.js";

export class widgetsSettings {
  constructor(actionItem) {
    return this.getWidgetSettings(actionItem);
  }

  getWidgetSettings(actionItem) {
    if(actionItem == 'none') return new widgetNone().returnSettings();
    else if(actionItem == 'clock') return new widgetClock().returnSettings();
    else if(actionItem == 'calendar') return new widgetCalendar().returnSettings();
    else if(actionItem == 'weather') return new widgetWeather().returnSettings();
    else if(actionItem == 'stocks') return new widgetStocks().returnSettings();
    else {
      const widgetSettingsArr = [];
      widgetSettingsArr.push(new widgetNone().returnSettings());
      widgetSettingsArr.push(new widgetClock().returnSettings());
      widgetSettingsArr.push(new widgetCalendar().returnSettings());
      widgetSettingsArr.push(new widgetWeather().returnSettings());
      widgetSettingsArr.push(new widgetStocks().returnSettings());
      return widgetSettingsArr;
    }
  }
}