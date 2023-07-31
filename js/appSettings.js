import { internetBrowser } from "./apps/internet-browser.js";
import { musicPlayer } from "./apps/music-player.js";
import { calculator } from "./apps/calculator.js";
import { spaceDefender } from "./apps/space-defender.js";
import { ticTacToe } from "./apps/tic-tac-toe.js";
import { calendar } from "./apps/calendar.js";
import { clock } from "./apps/clock.js";
import { weather } from "./apps/weather.js";
import { stocks } from "./apps/stocks.js";
import { imagesGallery } from "./apps/images-gallery.js";
import { weatherOnMars } from "./apps/weather-on-mars.js";
import { settings } from "./apps/settings.js";

export class appsSettings {
  constructor(actionItem) {
    return this.getAppSettings(actionItem);
  }

  getAppSettings(actionItem) {
    if(actionItem == 'internet-browser') return new internetBrowser().returnSettings();
    else if(actionItem == 'music-player') return new musicPlayer().returnSettings();
    else if(actionItem == 'calculator') return new calculator().returnSettings();
    else if(actionItem == 'space-defender') return new spaceDefender().returnSettings();
    else if(actionItem == 'tic-tac-toe') return new ticTacToe().returnSettings();
    else if(actionItem == 'calendar') return new calendar().returnSettings();
    else if(actionItem == 'clock') return new clock().returnSettings();
    else if(actionItem == 'weather') return new weather().returnSettings();
    else if(actionItem == 'stocks') return new stocks().returnSettings();
    else if(actionItem == 'images-gallery') return new imagesGallery().returnSettings();
    else if(actionItem == 'weather-on-mars') return new weatherOnMars().returnSettings();
    else if(actionItem == 'settings') return new settings().returnSettings();
    else {
      const appSettingsArr = []
      appSettingsArr.push(new internetBrowser().returnSettings());
      appSettingsArr.push(new musicPlayer().returnSettings());
      appSettingsArr.push(new calculator().returnSettings());
      appSettingsArr.push(new spaceDefender().returnSettings());
      appSettingsArr.push(new ticTacToe().returnSettings());
      appSettingsArr.push(new calendar().returnSettings());
      appSettingsArr.push(new clock().returnSettings());
      appSettingsArr.push(new weather().returnSettings());
      appSettingsArr.push(new stocks().returnSettings());
      appSettingsArr.push(new imagesGallery().returnSettings());
      appSettingsArr.push(new weatherOnMars().returnSettings());
      appSettingsArr.push(new settings().returnSettings());
      return appSettingsArr;
    }
  }

}