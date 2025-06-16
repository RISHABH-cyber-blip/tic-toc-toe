let gameOver = false; // Flag to check if the game is over
let topLeftval = 0, topMidval = 0, topRightval = 0;
let midLeftval = 0, midMidval = 0, midRightval = 0;
let bottomLeftval = 0, bottomMidval = 0, bottomRightval = 0;

  function playerMove(button) {
  // Mark player's move with "O"
  button.innerHTML = '<img src="O.png" class="O-img" alt="O">';
  button.disabled = true; // Prevents further clicking
  if (gameOver) return;

  // Let the computer make a move
  setTimeout(() => {
  if (!gameOver) computerMove(); // Only let the computer move if game is not over
  }, 100);
  }


  function computerMove() {
    const emptyBoxes = document.querySelectorAll('.inner-box:not([disabled])');
    if (emptyBoxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const selectedBox = emptyBoxes[randomIndex];
      selectedBox.innerHTML = '<img src="crosspngepng.png" class="X-img" alt="X">';
      selectedBox.disabled = true;

      const position = selectedBox.getAttribute("onclick").match(/'([^']+)'/)[1];
    if (position === 'topLeftval') topLeftval = 2;
    if (position === 'topMidval') topMidval = 2;
    if (position === 'topRightval') topRightval = 2;
    if (position === 'midLeftval') midLeftval = 2;
    if (position === 'midMidval') midMidval = 2;
    if (position === 'midRightval') midRightval = 2;
    if (position === 'bottomLeftval') bottomLeftval = 2;
    if (position === 'bottomMidval') bottomMidval = 2;
    if (position === 'bottomRightval') bottomRightval = 2;
    computerWin();
    }

  } 

  function checkWin(button, position) {
    if (gameOver) return; 
    if (position === 'topLeftval') topLeftval = 1;
    if (position === 'topMidval') topMidval = 1;
    if (position === 'topRightval') topRightval = 1;
    if (position === 'midLeftval') midLeftval = 1;
    if (position === 'midMidval') midMidval = 1;
    if (position === 'midRightval') midRightval = 1;
    if (position === 'bottomLeftval') bottomLeftval = 1;
    if (position === 'bottomMidval') bottomMidval = 1;
    if (position === 'bottomRightval') bottomRightval = 1;


    if ((topLeftval == 1 && topMidval == 1 && topRightval == 1) ||
        (topLeftval == 1 && midLeftval == 1 && bottomLeftval == 1) ||
        (topLeftval == 1 && midMidval == 1 && bottomRightval == 1) ||
        (topMidval == 1 && midMidval == 1 && bottomMidval == 1) ||
        (topRightval == 1 && midRightval == 1 && bottomRightval == 1) ||
        (midLeftval == 1 && midMidval == 1 && midRightval == 1) ||
        (bottomLeftval == 1 && bottomMidval == 1 && bottomRightval == 1) ||
        (bottomLeftval == 1 && midMidval == 1 && topRightval == 1)) {

      // Update the score
      score.Won += 1;
      localStorage.setItem('score', JSON.stringify(score));
      updateScoreElement();
      gameOver = true;
    }
    else{
      // Check for tie condition
      if (topLeftval + topMidval + topRightval + midLeftval + midMidval +
          midRightval + bottomLeftval + bottomMidval + bottomRightval === 18) {
        score.Tie += 1;
        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
        gameOver = true;
      }
    }
  }


  function computerWin(){
   if ((topLeftval == 2 && topMidval == 2 && topRightval == 2) ||
      (topLeftval == 2 && midLeftval == 2 && bottomLeftval == 2) ||
      (topLeftval == 2 && midMidval == 2 && bottomRightval == 2) ||
      (topMidval == 2 && midMidval == 2 && bottomMidval == 2) ||
      (topRightval == 2 && midRightval == 2 && bottomRightval == 2) ||
      (midLeftval == 2 && midMidval == 2 && midRightval == 2) ||
      (bottomLeftval == 2 && bottomMidval == 2 && bottomRightval == 2) ||
      (bottomLeftval == 2 && midMidval == 2 && topRightval == 2)) {
      // Update the score
      score.Loss += 1;
      localStorage.setItem('score', JSON.stringify(score));
      updateScoreElement();
      gameOver = true;
    }
    else{
      // Check for tie condition
      if (topLeftval + topMidval + topRightval + midLeftval + midMidval +
          midRightval + bottomLeftval + bottomMidval + bottomRightval === 18) {
        score.Tie += 1;
        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
        gameOver = true;
      }
    }
  }

  function resetGame() {
    gameOver = false; // Reset the game over flag
    topLeftval = 0; topMidval = 0; topRightval = 0;
    midLeftval = 0; midMidval = 0; midRightval = 0;
    bottomLeftval = 0; bottomMidval = 0; bottomRightval = 0;

    const buttons = document.querySelectorAll('.inner-box');
    buttons.forEach(button => {
      button.innerHTML = ''; // Clear the button content
      button.disabled = false; // Enable the button again
    });
  }


let score = { Won: 0, Loss: 0, Tie: 0 };
const storedScore = localStorage.getItem('score');
  if (storedScore) {
    score = JSON.parse(storedScore);
  }
  updateScoreElement();
  window.addEventListener('beforeunload', () => {
      localStorage.setItem('score', JSON.stringify(score));
    });


  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Won: ${score.Won}; Loss: ${score.Loss}; Tie: ${score.Tie}`;
  } 

  function resetScore() {
    score.Won = 0;
    score.Loss = 0;
    score.Tie = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    resetGame();
  }


  function updateScoreElement(){
     document.querySelector('.js-score')
  .innerHTML=`Won: ${score.Won};Loss: ${score.Loss}\;Tie: ${score.Tie}`;

} 