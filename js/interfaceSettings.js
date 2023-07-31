import { desktopEvents } from "./desktopEvents.js";

export class interfaceSettings {
    constructor(interfaceSettings) {
        this.desktop = document.querySelector('main.desktop');
        this.interfaceSettings = interfaceSettings || {};
        this.interfaceOptions = {
            backgroundImages: ['mountains', 'city', 'beach', 'forest', 'sky'],
            backgroundColors: ['dark-blue', 'green', 'grey'],
            desktopIconSizes: ['small', 'medium', 'big'],
            glassmorphism: ['on', 'off'],
            theme: ['theme-blue', 'theme-green', 'theme-red', 'theme-grey'],
            windowStyles: ['round', 'medium', 'square'],
            widgets: ['none', 'clock', 'calendar', 'weather', 'stocks'],
        }
        this.initSettings = {
          background: 'mountains',
          theme: 'light',
          glassmorphism: 'on',
          theme: 'theme-blue',
          windows: 'medium',
          icons: 'big',
          widgets: ['clock', 'calendar', 'none'],
        };
        this.currentInterfaceSettings = {
            background: this.interfaceSettings.background || localStorage.getItem("background") || this.initSettings.background,
            glassmorphism: this.interfaceSettings.glassmorphism || localStorage.getItem("glassmorphism") || this.initSettings.glassmorphism,
            theme: this.interfaceSettings.theme || localStorage.getItem("theme") || this.initSettings.theme,
            windows: this.interfaceSettings.windows || localStorage.getItem("windows") || this.initSettings.windows,
            icons: this.interfaceSettings.icons || localStorage.getItem("icons") || this.initSettings.icons,
            widgets: this.interfaceSettings.widgets || localStorage.getItem("widgets") || this.initSettings.widgets
        }
        
        this.setLocalStorage();
        this.setInterfaceSettings();
        if(this.interfaceSettings.widgets) new desktopEvents(true);
    }

    setLocalStorage() {
        window.localStorage.setItem("background", this.currentInterfaceSettings.background);
        window.localStorage.setItem("glassmorphism", this.currentInterfaceSettings.glassmorphism);
        window.localStorage.setItem("theme", this.currentInterfaceSettings.theme);
        window.localStorage.setItem("windows", this.currentInterfaceSettings.windows);
        window.localStorage.setItem("icons", this.currentInterfaceSettings.icons);
        window.localStorage.setItem("widgets", this.currentInterfaceSettings.widgets);
    }

    setInterfaceSettings() {
        this.desktop.dataset.background = localStorage.getItem("background");
        this.desktop.dataset.glassmorphism = localStorage.getItem("glassmorphism");
        this.desktop.dataset.theme = localStorage.getItem("theme");
        this.desktop.dataset.windows = localStorage.getItem("windows");
        this.desktop.dataset.icons = localStorage.getItem("icons");
    }
}