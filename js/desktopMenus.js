import { appsSettings } from "./appSettings.js";

export class desktopMenus {
  constructor() {
    this.appsSettings = new appsSettings();
    this.desktopAppsWrapper = document.querySelector(".desktopIcons");
    this.menuAppsWrapper = document.querySelector(".menu-box__menu-apps");
    this.subMenuAppsWrapper = document.querySelector(".app-menu__icons.menuApps");
    this.subMenuGamesWrapper = document.querySelector(".app-menu__icons.menuGames");
    this.sideMenuBatteryIconWrapper = document.querySelector('.menu .menu-box__menu-item.interface-icon[data-action-menu=battery]');
    this.sideMenuBatteryIcon = document.querySelector('.menu .menu-box__menu-item.interface-icon[data-action-menu=battery] i.svg-icon');
    this.sideMenuBatteryWrapperHeader = document.querySelector(".side-menu[data-app-name=battery] .side-menu__header");
    this.sideMenuBatteryWrapperBody = document.querySelector(".side-menu[data-app-name=battery] .side-menu__body span");
    this.sideMenuBatteryWrapperIcon = document.querySelector(".side-menu[data-app-name=battery] .side-menu__body i.svg-icon");
    this.sideMenuConnectionIcon = document.querySelector('.menu-box__menu-item[data-action-menu=connection] i.svg-icon');
    this.sideMenuConnectionWrapperBody = document.querySelector(".side-menu[data-app-name=connection] .side-menu__body span");
    this.sideMenuConnectionWrapperIcon = document.querySelector(".side-menu[data-app-name=connection] .side-menu__body i.svg-icon");
    this.sideMenuVolumeIcon = document.querySelector('.menu .menu-box__menu-item.interface-icon[data-action-menu=volume] i.svg-icon');
    this.sideMenuVolumeInput = document.querySelector(".side-menu[data-app-name=volume] .side-menu__body input.volume-control");
    this.sideMenuVolumeValue = document.querySelector(".side-menu[data-app-name=volume] .side-menu__body .volume-value");
    
    this.desktopApps();
    this.menuBarApps();
    this.subMenuApps();
    this.subMenuGames();
    this.sideMenuBattery();
    this.sideMenuConnection();
    this.sideMenuVolume();
  }

  desktopApps() {
    this.desktopAppsWrapper.innerHTML = "";
    this.appsSettings.forEach(icon => {
      if (icon.desktop) this.desktopAppsWrapper.innerHTML += `
        <div class="icon" data-action-app="${icon.actionItem}">
          <span class="icon__img svg-icon svg-icon--${icon.actionItem}"></span>
          <span class="icon__name">${icon.appName}</span>
        </div>
      `;
    });
  }

  menuBarApps() {
    this.menuAppsWrapper.innerHTML = "";
    this.appsSettings.forEach(icon => {
      if (icon.menuBar) this.menuAppsWrapper.innerHTML += `
        <div class="menu-box__menu-item" data-action-app="${icon.actionItem}" data-pinned-app="true">
          <i class="menu-bar-icon svg-icon svg-icon--${icon.actionItem}"></i>
        </div>
      `;
    });
  }

  subMenuApps() {
    this.subMenuAppsWrapper.innerHTML = "";
    this.appsSettings.forEach(icon => {
      if (!icon.game) this.subMenuAppsWrapper.innerHTML += `
        <div class="app-menu-icon" data-action-app="${icon.actionItem}">
          <span class="app-menu-icon__img svg-icon svg-icon--${icon.actionItem}"></span>
          <span class="app-menu-icon__name">${icon.appName}</span>
        </div>
      `;
    });
  }

  subMenuGames() {
    this.subMenuGamesWrapper.innerHTML = "";
    this.appsSettings.forEach(icon => {
      if (icon.game) this.subMenuGamesWrapper.innerHTML += `
        <div class="app-menu-icon" data-action-app="${icon.actionItem}">
          <span class="app-menu-icon__img svg-icon svg-icon--${icon.actionItem}"></span>
          <span class="app-menu-icon__name">${icon.appName}</span>
        </div>
      `;
    });
  }

  sideMenuBattery() {
    if(navigator && 'getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const batteryLevel = Math.round(battery.level*100);
        this.sideMenuBatteryWrapperIcon.classList.remove('svg-icon--batteryEmpty');
        this.sideMenuBatteryWrapperIcon.classList.remove('svg-icon--batteryLow');
        this.sideMenuBatteryWrapperIcon.classList.remove('svg-icon--batteryHalf');
        this.sideMenuBatteryWrapperIcon.classList.remove('svg-icon--battery');
        this.sideMenuBatteryIcon.classList.remove('svg-icon--batteryEmpty');
        this.sideMenuBatteryIcon.classList.remove('svg-icon--batteryLow');
        this.sideMenuBatteryIcon.classList.remove('svg-icon--batteryHalf');
        this.sideMenuBatteryIcon.classList.remove('svg-icon--battery');
        if(batteryLevel < 20) {
          this.sideMenuBatteryWrapperIcon.classList.add('svg-icon--batteryEmpty');
          this.sideMenuBatteryIcon.classList.add('svg-icon--batteryEmpty');
        } else if(batteryLevel < 40) {
          this.sideMenuBatteryWrapperIcon.classList.add('svg-icon--batteryLow');
          this.sideMenuBatteryIcon.classList.add('svg-icon--batteryLow');
        } else if(batteryLevel < 80) {
          this.sideMenuBatteryWrapperIcon.classList.add('svg-icon--batteryHalf');
          this.sideMenuBatteryIcon.classList.add('svg-icon--batteryHalf');
        } else {
          this.sideMenuBatteryWrapperIcon.classList.add('svg-icon--battery');
          this.sideMenuBatteryIcon.classList.add('svg-icon--battery');
        }
        this.sideMenuBatteryWrapperBody.innerHTML = battery.charging ? batteryLevel+'%, charging' : batteryLevel+'%, not charging';
      });
      setTimeout(() => this.sideMenuBattery(), 1000);
    } else {
      this.sideMenuBatteryIconWrapper.style.display = 'none';
    }
  }

  sideMenuConnection() {
    if(window.navigator.onLine) {
      this.sideMenuConnectionWrapperIcon.classList.remove('svg-icon--connectionError');
      this.sideMenuConnectionWrapperIcon.classList.add('svg-icon--connection');
      this.sideMenuConnectionIcon.classList.remove('svg-icon--connectionError');
      this.sideMenuConnectionIcon.classList.add('svg-icon--connection');
      this.sideMenuConnectionWrapperBody.innerHTML =  'You are online';
    } else {
      this.sideMenuConnectionWrapperIcon.classList.remove('svg-icon--connection');
      this.sideMenuConnectionWrapperIcon.classList.add('svg-icon--connectionError');
      this.sideMenuConnectionIcon.classList.add('svg-icon--connectionError');
      this.sideMenuConnectionIcon.classList.remove('svg-icon--connection');
      this.sideMenuConnectionWrapperBody.innerHTML =  'You are offline';
    }
    setTimeout(() => this.sideMenuConnection(), 1000);
  }

  sideMenuVolume() {
    const setVolume = () => {
      this.sideMenuVolumeValue.innerHTML = this.sideMenuVolumeInput.value;
      window.localStorage.setItem('volume', this.sideMenuVolumeInput.value);
      this.sideMenuVolumeIcon.classList.remove('svg-icon--volume');
      this.sideMenuVolumeIcon.classList.remove('svg-icon--volumeLow');
      this.sideMenuVolumeIcon.classList.remove('svg-icon--volumeMute');
      if(this.sideMenuVolumeInput.value == 0) this.sideMenuVolumeIcon.classList.add('svg-icon--volumeMute');
      else if(this.sideMenuVolumeInput.value < 50) this.sideMenuVolumeIcon.classList.add('svg-icon--volumeLow');
      else this.sideMenuVolumeIcon.classList.add('svg-icon--volume');
    }
    this.sideMenuVolumeInput.addEventListener('input', () => setVolume());
    this.sideMenuVolumeInput.addEventListener('wheel', e => {
      if (e.deltaY < 0) this.sideMenuVolumeInput.valueAsNumber += 2;
      else this.sideMenuVolumeInput.value -= 2;
      setVolume();
    });
    this.sideMenuVolumeInput.value = localStorage.getItem("volume") || 50;
    setVolume();
  }

}
