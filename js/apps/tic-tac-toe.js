export class ticTacToe {
    
  appSettings = {
    appName: "Tic Tac Toe",
    actionItem: "tic-tac-toe",
    appWidth: 600,
    appHeight: 800,
    disableResize: false,
    game: true,
    desktop: false,
    menuBar: false,
    body: this.appBody(),
    init: this.appJS,
  };

  appBody() {

    return `
    <div class="window__body tic-tac-toe light">
      <main>
        <h1 class="main-title">Tic Tac Toe</h1>
        <h2 class="status">Let's Play!</h2>
        <div class="game-board">
          <div class="game-board__column col1">
            <div data-field="0" class="game-board__column__square sq0"></div>
            <div data-field="1" class="game-board__column__square sq1"></div>
            <div data-field="2" class="game-board__column__square sq2"></div>
          </div>
          <div class="game-board__column col2">
            <div data-field="3" class="game-board__column__square sq3"></div>
            <div data-field="4" class="game-board__column__square sq4"></div>
            <div data-field="5" class="game-board__column__square sq5"></div>
          </div>
          <div class="game-board__column col3">
            <div data-field="6" class="game-board__column__square sq6"></div>
            <div data-field="7" class="game-board__column__square sq7"></div>
            <div data-field="8" class="game-board__column__square sq8"></div>
          </div>
        </div>
        <button class="restart-game">Start again</button>
      </main>
      <button class="toggle-darkmode">Dark mode</button>
    </div>
    `;
  }

  appJS() {
    const gameBody = document.querySelector('.window__body.tic-tac-toe');
    const gameBodyMain = gameBody.querySelector('main');
    const statusHeader = document.querySelector('h2.status');
    const gameWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const player1 = document.createElement('div');
    const player2 = document.createElement('div');
    let countRounds;
    let gameActive;
    let gameBoard;
    
    const boardFields = document.querySelectorAll('.game-board__column__square');
    boardFields.forEach(boardField => boardField.addEventListener('click', makeMove));
    
    const startAgainButton = document.querySelector('.restart-game');
    startAgainButton.addEventListener('click', newGame);
    
    const btnToggleDarkMode = document.querySelector(".toggle-darkmode");
    btnToggleDarkMode.addEventListener('click', toggleDarkMode);
    
    function newGame() {
      countRounds = 0;
      gameActive = true;
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      boardFields.forEach(boardField => { boardField.innerHTML = ''; boardField.classList.remove('grey'); });
      statusHeader.innerText = `Let's play!`;
      if (Math.floor(Math.random() * 2)) {
        player1.className = "cross";
        player2.className = "heart";
      } else {
        player1.className = "heart";
        player2.className = "cross";
      }
    }
    
    function makeMove(event) {
      const field = event.target.dataset.field;
      if (field >= 0 && field <= 8 && gameBoard[field] == '' && gameActive == true) {
        const playerMove = countRounds % 2 === 0 ? player2 : player1;
        event.target.appendChild(playerMove.cloneNode());
        gameBoard[field] = playerMove;
        countRounds++;
        checkGame(playerMove.className);
      }
    }
    
    function checkGame(playerName) {
      playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const gameWin = gameWins[i];
        let a = gameBoard[gameWin[0]];
        let b = gameBoard[gameWin[1]];
        let c = gameBoard[gameWin[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          makeOtherFieldsGray(gameWin);
          break;
        }
      }
      if (roundWon) {
        gameActive = false;
        statusHeader.innerText = playerName + ' wins!';
      }
      if (!roundWon && countRounds === 9) {
        gameActive = false;
        statusHeader.innerText = 'Nobody wins';
      }
    }
    
    function makeOtherFieldsGray(gameWin) {
      boardFields.forEach(boardField => {
        const fieldName = +boardField.dataset.field;
        if (gameWin.indexOf(fieldName) === -1) boardField.classList.add("grey");
      });
    }
    
    function toggleDarkMode() {
      if (gameBody.classList.contains('light')) {
        gameBody.classList.remove('light');
        gameBody.classList.add('dark');
        btnToggleDarkMode.innerText = "Light mode";
      } else {
        gameBody.classList.remove('dark');
        gameBody.classList.add('light');
        btnToggleDarkMode.innerText = "Dark mode";
      }
    }

    function scaleBoard() {
      const gameBodyHeight = gameBody.clientHeight;
      const gameBodyMainHeight = gameBodyMain.clientHeight;
      let scale = 1.1;
      if(gameBodyHeight < gameBodyMainHeight * scale) gameBodyMain.style.transform = 'scale(1.0)';
      while ((gameBodyHeight > gameBodyMainHeight * scale) && (scale < 3.1)) {
        gameBodyMain.style.transform = 'scale('+scale+')';
        scale += 0.1;
      }
    }
    
    new ResizeObserver(scaleBoard).observe(gameBody);
    newGame();
  }

  returnSettings() {
    return this.appSettings;
  }
}
