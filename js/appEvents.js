export class appEvents {
  constructor(actionItem) {
    this.desktop = document.querySelector("main.desktop");
    this.appsWrapper = document.querySelector(".renderApps");
    this.app = document.querySelector(".renderApps .window[data-app-name="+actionItem+"]");
    this.fullScreenPreview = document.querySelector("main.desktop .fullScreenPreview");

    this.addAppsEvents(this.app);
  }

  addAppsEvents(window) {
    let app = {};
    app.window = window;
    app.windowHeader = app.window.querySelector(".window__head__title");
    app.minimalizeBtn = app.window.querySelector(".head-icon.minimalize");
    app.fullBtn = app.window.querySelector(".head-icon.full");
    app.closeBtn = app.window.querySelector(".head-icon.close");

    app.windowHeader.addEventListener("dblclick", () => app.fullBtn && app.toggleWindowFullscreen());

    app.window.addEventListener('mouseup', e => {
      if(e.target == app.minimalizeBtn) app.minimalizeWindow();
      if(e.target == app.fullBtn) app.toggleWindowFullscreen();
      if(e.target == app.closeBtn) app.closeWindow();
    });

    app.window.addEventListener('mousedown', () => this.appsWrapper.lastElementChild !== app.window && this.appsWrapper.appendChild(app.window));

    // Window head functions
    app.toggleWindowFullscreen = () => {
      if (app.window.classList.contains("full")) {
        app.window.classList.remove("full");
        app.window.style.left = `${this.desktop.offsetWidth / 2 - app.window.offsetWidth / 2}px`;
        app.window.style.top = `${this.desktop.offsetHeight / 2 - app.window.offsetHeight / 2}px`;
        if(app.fullBtn) app.fullBtn.classList.remove("svg-icon--resizeSmall");
        if(app.fullBtn) app.fullBtn.classList.add("svg-icon--resize");
      } else {
        app.window.classList.add("full");
        app.window.style.left = "0px";
        app.window.style.top = "0px";
        if(app.fullBtn) app.fullBtn.classList.remove("svg-icon--resize");
        if(app.fullBtn) app.fullBtn.classList.add("svg-icon--resizeSmall");
      }
    }
  
    app.minimalizeWindow = () => app.window.classList.remove("active");

    app.closeWindow = () => {
      app.window.remove();
      const menuBarIcon = document.querySelector(`.menu-box [data-action-app="${app.window.dataset.appName}"]`);
      if(menuBarIcon) {
        menuBarIcon.classList.remove('active');
        if(!menuBarIcon.dataset.pinnedApp) menuBarIcon.remove();
      }
      app = {};
    }

    // Move window functions
    app.onMouseMove = e => !app.window.classList.contains("full") && app.moveAt(e.pageX, e.pageY);

    app.moveAt = (pageX, pageY) => {
      let left = pageX - app.shiftX;
      let top = pageY - app.shiftY;

      if(left < 15 && left > -20) left = 0;
      if(left <= -20) app.fullBtn ? left = -20 : left = 0;
      if(left > this.desktop.offsetWidth - app.window.offsetWidth - 15 && left < this.desktop.offsetWidth - app.window.offsetWidth + 20) left = this.desktop.offsetWidth - app.window.offsetWidth;
      if(left >= this.desktop.offsetWidth - app.window.offsetWidth + 20) app.fullBtn ? left = this.desktop.offsetWidth - app.window.offsetWidth + 20 : left = this.desktop.offsetWidth - app.window.offsetWidth;
      if(top < 10 && top > -15) top = 0;
      if(top <= -15) app.fullBtn ? top = -15 : top = 0;
      if(top > this.desktop.offsetHeight - app.window.offsetHeight - 10 && top < this.desktop.offsetHeight - app.window.offsetHeight + 15) top = this.desktop.offsetHeight - app.window.offsetHeight;
      if(top >= this.desktop.offsetHeight - app.window.offsetHeight + 15) app.fullBtn ? top = this.desktop.offsetHeight - app.window.offsetHeight + 15 : top = this.desktop.offsetHeight - app.window.offsetHeight;
      
      app.window.style.top = top + "px";
      app.window.style.left = left + "px";

      if(app.fullBtn) {
        if(left <= -20 || left >= this.desktop.offsetWidth - app.window.offsetWidth + 20 || top <= -15 || top >= this.desktop.offsetHeight - app.window.offsetHeight + 15) this.fullScreenPreview.classList.add("active");
        if(left > -20 && left < this.desktop.offsetWidth - app.window.offsetWidth + 20 && top > -15 && top < this.desktop.offsetHeight - app.window.offsetHeight + 15) this.fullScreenPreview.classList.remove("active");
      }
    };

    app.checkToggleFullscreen = () => {
      if (app.fullBtn && !app.window.classList.contains("full") && this.fullScreenPreview.classList.contains("active")) {
        app.toggleWindowFullscreen(app.window, app.fullBtn);
        this.fullScreenPreview.classList.remove("active");
      }
    };

    // Move window
    app.windowHeader.addEventListener("mousedown", e => {
      app.shiftX = e.clientX - app.window.getBoundingClientRect().left;
      app.shiftY = e.clientY - app.window.getBoundingClientRect().top;

      document.addEventListener("mousemove", app.onMouseMove);

      document.onmouseup = () => {
        document.removeEventListener("mousemove", app.onMouseMove);
        document.onmouseup = null;
        app.checkToggleFullscreen();
      };
    });
  }
}
