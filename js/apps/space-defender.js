export class spaceDefender {
  constructor() {
    this.appSettings = {
      appName: "Space Defender",
      actionItem: "space-defender",
      appWidth: 850,
      appHeight: 650,
      game: true,
      desktop: true,
      menuBar: false,
      body: this.appBody(),
      init: this.appJS,
    };
  }

  appBody() {
    return `<div class="window__body space-defender">
      <div id="game-board">
        <div id="player"></div>
        <div class="points">
          <span class="img"></span>
          <span id="score">0</span>
        </div>
        <div id="lifes"></div>
        <div id="game-end" class="card">
          <h2>GAME OVER</h2>
          <h3>Everybody on earth is dead</h3>
          <br><br>
          <button id="start-again" class="button">Start again</button>
        </div>
        <div id="game-start" class="card">
          <h2>You are the last hope<br>for Planet Earth</h2>
          <h3>Kill the evil aliens and save humanity!</h3>
          <div class="wrap">
            <div class="bt_space">
              <div class="top"><span>Space</span></div>
              <div class="bottom">-</div>
            </div>
            <div class="bt_left">
              <div class="top"><span>&#8592;</span></div>
              <div class="bottom">-</div>
            </div>
            <div class="bt_right">
              <div class="top"><span>&#8594;</span></div>
              <div class="bottom">-</div>
            </div>
          </div>
          <button id="start" class="button">Start game</button>
        </div>
      </div>
    </div>`;
  }

  appJS() {

    // WORK IN PROGRESS

    class Player {
      constructor(settings) {
        this.lifes = settings.lifes || 3;
        this.score = 0;
        this.element = settings.element;
        this.boardElement = settings.boardElement;
      }
    
      getLifes() {
        return this.lifes;
      }
    
      setLifes(number) {
        this.lifes = number;
      }
    
      getScore() {
        return this.score;
      }
    
      setScore(score) {
        this.score = score;
      }
    
      addScore(score) {
        this.score += score;
      }
    
      moveX(direction) {
        const newPosition = this.element.offsetLeft + direction * 20;
        const minLeft = this.element.offsetWidth / 2;
        const maxRight = this.boardElement.offsetWidth - minLeft;
        
        if (newPosition >= minLeft && newPosition < maxRight) {
          this.element.style.left = `${newPosition}px`;
        }
      }
    
      moveY(direction) {
        const newPosition = this.element.offsetTop + direction * 10;
        const minTop = 0;
        const maxTop = this.boardElement.offsetHeight - this.element.offsetHeight;
      
        if (newPosition >= minTop && newPosition < maxTop) {
          this.element.style.top = `${newPosition}px`;
        }
      }
    }
    
    const gameBody = document.querySelector('.window__body.space-defender');
    const playerElement = gameBody.querySelector('#player');
    const boardElement = gameBody.querySelector('#game-board');
    const scoreElement = gameBody.querySelector('#score');
    const lifesElement = gameBody.querySelector('#lifes');
    const endGameElement = gameBody.querySelector('#game-end');
    const startAgainButton = gameBody.querySelector('#start-again');
    const startButton = gameBody.querySelector('#start');
    const newGameElement = gameBody.querySelector('#game-start');
    let moveBulletsInterval;
    let moveEnemiesInterval;
    let createEnemiesInterval;
    let bullets = [];
    let enemies = [];
    
    const player = new Player({
      element: playerElement,
      boardElement: boardElement,
    });
    
    const creatBullet = () => {
      if(bullets.length < 30) {
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.left = playerElement.offsetLeft+'px';
        bullet.style.top = playerElement.offsetTop+'px';
        boardElement.appendChild(bullet);
        bullets.push(bullet);
      }
    }
    
    const handleKeyboard = (e) => {
      switch (e.code) {
        case 'ArrowLeft': player.moveX(-1); break;
        case 'ArrowRight': player.moveX(1); break;
        case 'ArrowUp': player.moveY(-1); break;
        case 'ArrowDown': player.moveY(1); break;
        case 'Space': creatBullet();
      }
    }
    
    
    const checkCollision = (element, enemy) => {
      return (element.left > enemy.left && element.right < enemy.right) && (element.top < enemy.bottom - 35 && element.top > enemy.top);
    }
    
    const addScore = (points = 0) => {
      player.addScore(points);
      scoreElement.innerHTML = player.getScore();
    }
    
    const showLifes = () => {
      const html = Array(player.getLifes()).fill(0).map(() => '<div class="life"></div>').join('');
      lifesElement.innerHTML = html;
    }
    
    const checkBulletCollision = (bullet) => {
      const position = bullet.getBoundingClientRect();
    
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const enemyPostion = enemy.getBoundingClientRect();
    
        if (checkCollision(position, enemyPostion)) {
          addScore(1);
    
          const index = bullets.indexOf(bullet);
          bullets.splice(index, 1);
          bullet.remove();
    
          makeSplash(enemy.offsetLeft, enemy.offsetTop);
    
          enemies.splice(i, 1);
          enemy.remove();
    
          break;
        }
      }
    }
    
    const makeSplash = (left, top) => {
      const splash = document.createElement('div');
      splash.className = 'splash';
      splash.style.left = left+'px';
      splash.style.top = top+'px';
      boardElement.appendChild(splash);
      setTimeout(() => splash.remove(), 2000);
    }
    
    const moveBullets = () => {
      bullets.forEach((bullet, i) => {
        bullet.style.top = `${bullet.offsetTop - 10}px`;
    
        if (bullet.offsetTop <= 0) {
          bullets.splice(i, 1);
          bullet.remove();
        } else {
          checkBulletCollision(bullet);
        }
      });
    }
    
    const createEnemy = () => {
      const shouldCreate = Math.round(Math.random());
      if (!shouldCreate) return;
    
      const enemy = document.createElement('div');
      enemy.className = `enemy type${Math.floor(Math.random() * 15 + 1)}`;
      // enemy.className = `enemy type2`;
      enemy.style.top = -40 + 'px';
      enemy.style.left = Math.floor(Math.random() * (boardElement.offsetWidth - 140) + 60)+'px';
    
      boardElement.append(enemy);
      enemies.push(enemy);
    }
    
    const moveEnemies = () => {
      enemies.forEach((enemy, i) => {
        enemy.style.top = `${enemy.offsetTop + 1}px`;
        if (enemy.offsetTop >= boardElement.offsetHeight) {
          player.setLifes(player.getLifes() - 1);
          showLifes();
          enemies.splice(i, 1);
          enemy.remove();
          if (player.getLifes() === 0) gameOver();
        }
      });
    }
    
    const startAgain = () => {      
      enemies.forEach(enemy => enemy.remove());
      enemies = [];
      player.setScore(0);
      scoreElement.innerHTML = 0;
      player.setLifes(3);
      showLifes();
      playerElement.style = '';
      endGameElement.style.display = 'none';
      startGame();
    }
    
    const gameOver = () => {
      window.removeEventListener('keydown', handleKeyboard);
      enemies.forEach(enemy => enemy.style.animationPlayState = 'paused');
      bullets.forEach(bullet => bullet.remove());
      bullets = [];
      endGameElement.style.display = 'block';
      clearInterval(moveBulletsInterval);
      clearInterval(moveEnemiesInterval);
      clearInterval(createEnemiesInterval);
      boardElement.style.animation = 'none';
    }
    
    const startGame = () => {  
      window.addEventListener('keydown', handleKeyboard);
      moveBulletsInterval = setInterval(moveBullets, 50);
      moveEnemiesInterval = setInterval(moveEnemies, 12);
      createEnemiesInterval = setInterval(createEnemy, 700);
      newGameElement.style.display = 'none';
    }
  
    showLifes();
    startAgainButton.addEventListener('click', startAgain);
    startButton.addEventListener('click', startGame);

    const scaleBoard = () => {
      const gameBodyHeight = gameBody.clientHeight;
      const gameBodyMainHeight = boardElement.clientHeight;
      let scale = 1.1;
      if(gameBodyHeight < gameBodyMainHeight * scale) boardElement.style.transform = 'scale(1.0)';
      while ((gameBodyHeight > gameBodyMainHeight * scale) && (scale < 3.1)) {
        boardElement.style.transform = 'scale('+scale+')';
        scale += 0.1;
      }
    }
    
    new ResizeObserver(scaleBoard).observe(gameBody);
  }

  returnSettings() {
    return this.appSettings;
  }
}
