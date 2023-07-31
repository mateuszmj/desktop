import { interfaceSettings } from "../interfaceSettings.js";

export class settings {
    
  appSettings = {
    appName: "Interface settings",
    actionItem: "settings",
    appWidth: 900,
    appHeight: 600,
    disableResize: false,
    game: false,
    desktop: false,
    menuBar: false,
    body: this.appBody(),
    init: this.appJS,
  };

  appBody() {
    const settingOptions = new interfaceSettings().interfaceOptions;
    const currentWidgets = localStorage.getItem("widgets").split(',');

    return `
    <div class="window__body settings transparent">
      <div class="settings__menu">
        <button class="settings__menu__button active" data-settings-btn="background">Desktop background</button>
        <button class="settings__menu__button" data-settings-btn="windows-icons">Windows & Icons</button>
        <button class="settings__menu__button" data-settings-btn="widgets">Widgets</button>
      </div>

      <div class="settings__body">
        <div class="settings__body__page active" data-settings-page="background">
          <h3 class="page-header">Background images</h3>
          <div class="select-style" data-settings-element="background">
            ${settingOptions.backgroundImages.map(item => {
              const isActive = localStorage.getItem("background") === item ? 'active' : '';
              return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'></button>'
            }).join('')}
          </div>
          <h3 class="page-header">Solid colors</h3>
          <div class="select-style" data-settings-element="background">
          ${settingOptions.backgroundColors.map(item => {
              const isActive = localStorage.getItem("background") === item ? 'active' : '';
              return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'></button>'
            }).join('')
          }
          </div>
        </div>
        
        <div class="settings__body__page" data-settings-page="windows-icons">
          <h3 class="page-header">Glassmorphism</h3>
          <div class="select-style" data-settings-element="glassmorphism">
          ${settingOptions.glassmorphism.map(item => {
              const isActive = localStorage.getItem("glassmorphism") === item ? 'active' : '';
              return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'>'+item.charAt(0).toUpperCase() + item.slice(1)+'</button>'
            }).join('')
          }
          </div>
          <h3 class="page-header">Windows style</h3>
          <div class="select-style" data-settings-element="windows">
            ${settingOptions.windowStyles.map(item => {
              const isActive = localStorage.getItem("windows") === item ? 'active' : '';
              return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'>'+item.charAt(0).toUpperCase() + item.slice(1)+'</button>'
            }).join('')}
          </div>
          <h3 class="page-header">Theme color</h3>
          <div class="select-style" data-settings-element="theme">
            ${settingOptions.theme.map(item => {
              const isActive = localStorage.getItem("theme") === item ? 'active' : '';
              return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'></button>'
            }).join('')}
          </div>
          <h3 class="page-header">Desktop icons size</h3>
          <div class="select-style" data-settings-element="icons">
          ${settingOptions.desktopIconSizes.map(item => {
              const isActive = localStorage.getItem("icons") === item ? 'active' : '';
              return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'>'+item.charAt(0).toUpperCase() + item.slice(1)+'</button>'
            }).join('')
          }
          </div>
        </div>

        <div class="settings__body__page" data-settings-page="widgets">
          <h3 class="page-header">Top Widget</h3>
          <div class="select-style" data-settings-element="widgets-top">
          ${settingOptions.widgets.map(item => {
            const isActive = currentWidgets[0] === item ? 'active' : '';
            return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'>'+item.charAt(0).toUpperCase() + item.slice(1)+'</button>'
          }).join('')}
          </div>
          <h3 class="page-header">Middle Widget</h3>
          <div class="select-style" data-settings-element="widgets-middle">
          ${settingOptions.widgets.map(item => {
            const isActive = currentWidgets[1] === item ? 'active' : '';
            return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'>'+item.charAt(0).toUpperCase() + item.slice(1)+'</button>'
          }).join('')}
          </div>
          <h3 class="page-header">Bottom Widget</h3>
          <div class="select-style" data-settings-element="widgets-bottom">
          ${settingOptions.widgets.map(item => {
            const isActive = currentWidgets[2] === item ? 'active' : '';
            return '<button class="select-style__item ' + isActive +'" data-setting-name='+item+'>'+item.charAt(0).toUpperCase() + item.slice(1)+'</button>'
          }).join('')}
          </div>
        </div>
      </div>
    </div>
    `;
  }

  appJS() {
    const windowBody = document.querySelector(`.window__body.settings`);
    const settingsBtns = windowBody.querySelectorAll(`.settings__menu__button`);
    const settingsPages = windowBody.querySelectorAll(`.settings__body__page`);
    
    const settingBackgrounds = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="background"] .select-style__item`);
    const settingIcons = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="icons"] .select-style__item`);
    const settingGlassmorphism = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="glassmorphism"] .select-style__item`);
    const settingTheme = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="theme"] .select-style__item`);
    const settingWindows = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="windows"] .select-style__item`);
    
    const settingWidgetsTop = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="widgets-top"] .select-style__item`);
    const settingWidgetsMiddle = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="widgets-middle"] .select-style__item`);
    const settingWidgetsBottom = windowBody.querySelectorAll(`.settings__body__page .select-style[data-settings-element="widgets-bottom"] .select-style__item`);
    
    const currentWidgets = localStorage.getItem("widgets").split(',');
    
    settingsBtns.forEach(btn => btn.addEventListener('click', () => {
      settingsPages.forEach(page => page.dataset.settingsPage === btn.dataset.settingsBtn ? page.classList.add('active') : page.classList.remove('active'));
      settingsBtns.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
    }));

    settingBackgrounds.forEach(background => background.addEventListener('click', () => {
      new interfaceSettings({background: background.dataset.settingName});
      settingBackgrounds.forEach(background => background.classList.remove('active'));
      background.classList.add('active');
    }));

    settingIcons.forEach(iconStyle => iconStyle.addEventListener('click', () => {
      new interfaceSettings({icons: iconStyle.dataset.settingName});
      settingIcons.forEach(iconStyle => iconStyle.classList.remove('active'));
      iconStyle.classList.add('active');
    }));

    settingGlassmorphism.forEach(glassmorphism => glassmorphism.addEventListener('click', () => {
      new interfaceSettings({glassmorphism: glassmorphism.dataset.settingName});
      settingGlassmorphism.forEach(glassmorphism => glassmorphism.classList.remove('active'));
      glassmorphism.classList.add('active');
    }));

    settingTheme.forEach(theme => theme.addEventListener('click', () => {
      new interfaceSettings({theme: theme.dataset.settingName});
      settingTheme.forEach(theme => theme.classList.remove('active'));
      theme.classList.add('active');
    }));

    settingWindows.forEach(windowStyle => windowStyle.addEventListener('click', () => {
      new interfaceSettings({windows: windowStyle.dataset.settingName});
      settingWindows.forEach(windowStyle => windowStyle.classList.remove('active'));
      windowStyle.classList.add('active');
    }));

    settingWidgetsTop.forEach(widget => widget.addEventListener('click', () => {
      currentWidgets[0] = widget.dataset.settingName;
      new interfaceSettings({widgets: currentWidgets});
      settingWidgetsTop.forEach(widget => widget.classList.remove('active'));
      widget.classList.add('active');
    }));

    settingWidgetsMiddle.forEach(widget => widget.addEventListener('click', () => {
      currentWidgets[1] = widget.dataset.settingName;
      new interfaceSettings({widgets: currentWidgets});
      settingWidgetsMiddle.forEach(widget => widget.classList.remove('active'));
      widget.classList.add('active');
    }));

    settingWidgetsBottom.forEach(widget => widget.addEventListener('click', () => {
      currentWidgets[2] = widget.dataset.settingName;
      new interfaceSettings({widgets: currentWidgets});
      settingWidgetsBottom.forEach(widget => widget.classList.remove('active'));
      widget.classList.add('active');
    }));
  }

  returnSettings() {
    return this.appSettings;
  }
}
