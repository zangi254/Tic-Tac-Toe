(function () {
    let playerRound = 1;
    const DOM = () => {
    
      const cells = document.querySelectorAll('.square');
      const showWinner = document.querySelector('#show-winner');
      const showWinnerDiv = document.querySelector('#show-winner-div');
      const player1Name = document.querySelector('#player1-info input').value;
      const player2Name = document.querySelector('#player2-info input').value;
      const playAgainBtn = document.querySelector('#play-again');
      
      return {
     
        cells,
        showWinner,
        showWinnerDiv,
        player1Name,
        player2Name,
        playAgainBtn
      
      };
    
    };
    
    
    
    
    const Player = (playerName) => {
    
      const whichPlayer = playerName === 'player1' ? 'player1' : 'player2';
      const playerMark = playerName === 'player1' ? 'X' : 'O';
      const move = [];
      
      
      return {
        move,
        whichPlayer,
        playerMark,
      }
    
    }
    
    
    const Gameboard = (() => {
    
      const gameboard = ['', '', '', '', '', '', '', '', ''];
      const checkIfWin = [];
    
      function startApp() {
        renderGameboard();
        cleanGameboard();
      }
    
      function renderGameboard() {
        const gameboardDiv = document.querySelector('#game-board');
        gameboard.forEach(cell => {
          const gameboardSquares = document.createElement('div');
          gameboardSquares.classList.add('square'); 
          gameboardDiv.appendChild(gameboardSquares);
        });
    
      }
      startApp();
      return {
        gameboard,
        checkIfWin
      }  
    })();
    
    const markGameboard = (function () {
     
      
      const player1 = Player('player1');
      const player2 = Player('player2');
      const gameboard = Gameboard.gameboard;
      const cells = DOM().cells;
    
      cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
          if (playerRound === 1) {
    
            if (!cell.dataset.marked) {
              cell.textContent = `${player1.playerMark}`;
              cell.classList.add('x');
              cell.dataset.marked = 'marked';
    
              player1.move.push(index);
              Gameboard.checkIfWin.push(`X${index}`);
              checkWin(player1, Gameboard.checkIfWin);
              playerRound = 2;
            } else {
              return;
            }
    
          } else {
    
            if (!cell.dataset.marked) {
              cell.textContent = `${player2.playerMark}`;
              cell.classList.add('o');
              cell.dataset.marked = 'marked';
              player2.move.push(index);
              Gameboard.checkIfWin.push(`O${index}`);
              checkWin(player2, Gameboard.checkIfWin);
              playerRound = 1;
            } else {
              return;
            }
            
          }
          
        });
      });
    
      return { player1, player2 };
    
    })();
    
    
    function checkWin(player, winCondition) {
    
      function declareWinner() {
        if (playerRound === 1) {
          DOM().showWinner.textContent = `${DOM().player1Name || player.whichPlayer} Wins`;
        } else {
          DOM().showWinner.textContent = `${DOM().player2Name || player.whichPlayer} Wins`;
        }
        DOM().showWinnerDiv.style.display = 'block';
        
        stopGameAfterWinOrTie();
    
      }
    
      function DeclareTie() {
        DOM().showWinnerDiv.style.display = 'block';
        DOM().showWinner.textContent = `It's a tie`;
        stopGameAfterWinOrTie();
    
      }
    
      if (winCondition.length === 9) {
        DeclareTie();
      } else if (player.move.includes(0)) {
        if (player.move.includes(1)) {
          if (player.move.includes(2)) {
            declareWinner();
            
          }
        } else if (player.move.includes(3)) {
            if (player.move.includes(6)) {
              declareWinner();
              
            }
        } else if (player.move.includes(4)) {
            if (player.move.includes(8)) {
              declareWinner();
              
            }
        }
      } else if (player.move.includes(1) && player.move.includes(4) && player.move.includes(7)) {
        declareWinner();
        
      } else if (player.move.includes(2)) {
          if (player.move.includes(4)) {
            if (player.move.includes(6)) {
              declareWinner();
              
            }
          } else if (player.move.includes(5)) {
              if (player.move.includes(8)) {
                declareWinner();
                
              }
          }
      } else if (player.move.includes(3) && player.move.includes(4) && player.move.includes(5)) {
          declareWinner();
          
      } else if (player.move.includes(6) && player.move.includes(7) && player.move.includes(8)) {
          declareWinner();
          
      }
    
    
    }
    
    function cleanGameboard(gboard, playerMoves) {
    
      DOM().playAgainBtn.addEventListener('click', () => {
        DOM().cells.forEach(cell => {
          cell.textContent = '';
          delete cell.dataset.marked;
        });
        
        DOM().showWinner.textContent = '';
        DOM().showWinnerDiv.style.display = 'none';
    
        markGameboard.player1.move = [];
        markGameboard.player2.move = [];
        Gameboard.checkIfWin = [];
      });
    
    }
    
    function stopGameAfterWinOrTie() {
      DOM().cells.forEach(cell => {
        cell.dataset.marked = 'marked';
      });
    }
    })();