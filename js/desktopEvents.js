import { appEvents } from "./appEvents.js";
import { appsSettings } from "./appSettings.js";
import { widgetsSettings } from "./widgetSettings.js";

export class desktopEvents {
  constructor(updateWidgets) {
    this.desktop = document.querySelector("main.desktop");
    this.appsWrapper = document.querySelector(".renderApps");
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    if(!updateWidgets) {
      this.renderWidgets();
      this.renderTime();
      this.menusIconsEvents();
      this.appsIconsEvents();
      this.toggleDesktopFullscreen();
    } else {
      this.renderWidgets();
      this.appsIconsEvents(updateWidgets);
    }
  }

  renderAppWindow(appSettings) {
    const appBody = `
    <div class="window active" data-app-name="${appSettings.actionItem}" style="
      width: ${appSettings.appWidth}px;
      height: ${appSettings.appHeight}px;
      left: ${this.desktop.offsetWidth / 2 - appSettings.appWidth / 2}px;
      top: ${this.desktop.offsetHeight / 2 - appSettings.appHeight / 2}px;
    ">
      <div class="window__head">
        <span class="window__head__title">${appSettings.appName}</span>
        <div class="window__head__icons">
          <div class="head-icon minimalize svg-icon svg-icon--minimalize"></div>
          ${ !appSettings.disableResize ? '<div class="head-icon full svg-icon svg-icon--resize"></div>' : '' }
          <div class="head-icon close svg-icon svg-icon--close"></div>
        </div>
      </div>
      ${appSettings.body}
    </div>
    `;
    this.appsWrapper.insertAdjacentHTML("beforeend", appBody);
  }

  renderWidgets() {
    const widgetsWrapper = document.querySelector('.widgets');
    const widgetsList = localStorage.getItem('widgets').split(',');
    widgetsWrapper.innerHTML = '';
    widgetsList.forEach(widget => {
      const widgetData = new widgetsSettings(widget);
      widgetsWrapper.insertAdjacentHTML('beforeend', widgetData.body);
      if(widgetData.init) widgetData.init();
    });
  }

  renderTime() {
    const checkTime = i => i < 10 ? '0' + i : i;
    const today = new Date();
    const month = today.getMonth();
    const day = checkTime(today.getDate());
    const hour = checkTime(today.getHours());
    const min = checkTime(today.getMinutes());
    document.querySelector(".menu-box__time").innerHTML = hour + ':' + min;
    document.querySelector(".menu-box__time.date").innerHTML = this.monthNames[month] + ' ' + day;
    setTimeout(() => this.renderTime(), 1000);
  }

  menusIconsEvents() {
    const desktopMenuIcons = document.querySelectorAll("[data-action-menu]");
    desktopMenuIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        const menu = document.querySelector(`[data-app-name='${icon.dataset.actionMenu}']`);
        if (menu) {
          if (menu.classList.contains("active")) this.hideMenus();
          else {
            menu.classList.add("active");
            const hideMenuOnClick = e => {
              if(e.target !== icon && e.target.parentNode !== icon && e.target !== menu && e.target.parentNode !== menu && e.target.parentNode.parentNode !== menu) {
                this.hideMenus();
                this.desktop.removeEventListener('mouseup', hideMenuOnClick);
              }
            }
            this.desktop.addEventListener('mouseup', hideMenuOnClick);
          }
        } else alert(`Menu ${icon.dataset.actionMenu} does not exist`);
      });
    });
  }

  addAppToMenuBar(appSettings) {
    const menuAppsWrapper = document.querySelector(".menu-box__menu-apps");
    let menuBarIcon = document.querySelector(`.menu-box [data-action-app="${appSettings.actionItem}"]`);
    if(!menuBarIcon) {
      const iconHtml = `
        <div class="menu-box__menu-item" data-action-app="${appSettings.actionItem}">
          <i class="menu-bar-icon svg-icon svg-icon--${appSettings.actionItem}"></i>
        </div>
      `;
      menuAppsWrapper.insertAdjacentHTML("beforeend", iconHtml);
      menuBarIcon = document.querySelector(`.menu-box [data-action-app="${appSettings.actionItem}"]`);
      menuBarIcon.addEventListener("click", () => this.addAppIconEvent(menuBarIcon));
    }
    if(menuBarIcon) menuBarIcon.classList.add('active');
  }

  appsIconsEvents(updateWidgets) {
    const appsIcons = updateWidgets ? document.querySelectorAll(".widget-box[data-action-app]") : document.querySelectorAll("[data-action-app]");
    appsIcons.forEach(icon => icon.addEventListener("click", () => this.addAppIconEvent(icon)));
  }

  addAppIconEvent(icon) {
    const window = document.querySelector(`[data-app-name='${icon.dataset.actionApp}']`);
    if (window) {
      if (window.classList.contains("active")) {
        if(this.appsWrapper.lastElementChild !== window) this.appsWrapper.appendChild(window);
        else window.classList.remove("active");
      } else {
        window.classList.add("active");
        if(this.appsWrapper.lastElementChild !== window) this.appsWrapper.appendChild(window);
      }
    } else {
      const appSetting = new appsSettings(icon.dataset.actionApp);
      this.renderAppWindow(appSetting);
      this.addAppToMenuBar(appSetting);
      new appEvents(appSetting.actionItem);
      if(appSetting.init) appSetting.init();
    }
  }

  hideMenus() {
    const desktopMenus = document.querySelectorAll(".app-menu, .side-menu");
    desktopMenus.forEach(menu => menu.classList.remove("active"));
  }

  toggleDesktopFullscreen() {
    const fullScreenBtn = document.querySelector('[data-action-special="fullScreen"]');
    const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
    fullScreenBtn.addEventListener("click", () => {
      const isFullscreen = typeof window.fullScreen !== 'undefined' ? window.fullScreen : window.screenTop && window.screenY;
      if (isFullscreen) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozExitFullScreen) document.mozExitFullScreen();
        else if (document.webkitExitFullScreen) document.webkitExitFullScreen();
        fullScreenBtnIcon.classList.remove("svg-icon--fullScreenClose");
        fullScreenBtnIcon.classList.add("svg-icon--fullScreen");
      } else {
        if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
        else if (document.documentElement.mozRequestFullScreen) document.documentElement.mozRequestFullScreen();
        else if (document.documentElement.webkitRequestFullScreen) document.documentElement.webkitRequestFullScreen();
        fullScreenBtnIcon.classList.remove("svg-icon--fullScreen");
        fullScreenBtnIcon.classList.add("svg-icon--fullScreenClose");
      }
    });
  }
}
