'use strict';

let result = 0;

const play = document.querySelector('.start');
const fieldRows = document.querySelectorAll('.field-row');
const gameScore = document.querySelector('.game-score');

const gameGround = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function changingCellInfo() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      fieldRows[i].querySelectorAll('.field-cell')[j]
        .className = `field-cell${gameGround[i][j]
          ? ` field-cell--${gameGround[i][j]}`
          : ''}`;

      fieldRows[i].querySelectorAll('.field-cell')[j]
        .textContent = gameGround[i][j]
          ? gameGround[i][j]
          : '';
    }
  }
}

function cancellation() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      gameGround[i][j] *= 0;
    }
  }
}

function randomRow() {
  const randomV = Math.floor(Math.random() * 4);

  for (let i = 0; i < 4; i++) {
    if (gameGround[randomV][i] === 0) {
      return randomV;
    }
  }

  return randomRow();
}

function randomColumn(row) {
  const randomV = Math.floor(Math.random() * 4);

  if (gameGround[row][randomV] === 0) {
    return randomV;
  }

  return randomColumn(row);
}

function randomValue() {
  if (Math.floor(Math.random() * 10) === 9) {
    return 4;
  } else {
    return 2;
  }
}

function addNewValue() {
  const row = randomRow();
  const column = randomColumn(row);

  if (gameGround[row][column] === 0) {
    gameGround[row][column] += randomValue();
  }
}

function updateInfo() {
  let summZero = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (gameGround[i][j] === 2048) {
        document.querySelector('.message-win')
          .classList
          .toggle('hidden', false);
      }

      if (gameGround[i][j] === 0) {
        summZero++;
      }
    }
  }

  if (summZero === 0) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (gameGround[i][j] === gameGround[i + 1][j]) {
          ++summZero;
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameGround[i][j] === gameGround[i][j + 1]) {
          ++summZero;
        }
      }
    }

    if (summZero === 0) {
      document.querySelector('.message-lose').classList.toggle('hidden', false);
    }
  }

  gameScore.textContent = `${result}`;
}

function moveCellsUp() {
  let count = 0;

  for (let i = 3; i > 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (gameGround[i - 1][j] === 0
        && gameGround[i][j] !== 0) {
        gameGround[i - 1][j] += gameGround[i][j];
        gameGround[i][j] *= 0;
        count++;
      }
    }
  }

  return count;
}

function moveCellsDown() {
  let count = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (gameGround[i + 1][j] === 0
        && gameGround[i][j] !== 0) {
        gameGround[i + 1][j] += gameGround[i][j];
        gameGround[i][j] *= 0;
        count++;
      }
    }
  }

  return count;
}

function moveCellsLeft() {
  let count = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 3; j > 0; j--) {
      if (gameGround[i][j - 1] === 0
        && gameGround[i][j] !== 0) {
        gameGround[i][j - 1] += gameGround[i][j];
        gameGround[i][j] *= 0;
        count++;
      }
    }
  }

  return count;
}

function moveCellsRight() {
  let count = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameGround[i][j + 1] === 0 && gameGround[i][j] !== 0) {
        gameGround[i][j + 1] += gameGround[i][j];
        gameGround[i][j] *= 0;
        count++;
      }
    }
  }

  return count;
}

function keyPressed(key) {
  switch (key) {
    case 'ArrowUp':
      let countUp = 0;

      countUp += moveCellsUp();
      countUp += moveCellsUp();
      countUp += moveCellsUp();

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          if (gameGround[i][j] === gameGround[i + 1][j]
            && gameGround[i][j] !== 0) {
            gameGround[i][j] *= 2;
            gameGround[i + 1][j] *= 0;
            result += gameGround[i][j];
            countUp++;

            countUp += moveCellsUp();
            countUp += moveCellsUp();
          }
        }
      }

      if (countUp === 0) {
        updateInfo();
        break;
      }

      addNewValue();
      changingCellInfo();
      updateInfo();
      break;

    case 'ArrowDown':
      let countDown = 0;

      countDown += moveCellsDown();
      countDown += moveCellsDown();
      countDown += moveCellsDown();

      for (let i = 3; i > 0; i--) {
        for (let j = 0; j < 4; j++) {
          if (gameGround[i][j] === gameGround[i - 1][j]
            && gameGround[i][j] !== 0) {
            gameGround[i][j] *= 2;
            gameGround[i - 1][j] *= 0;
            result += gameGround[i][j];
            countDown++;

            countDown += moveCellsDown();
            countDown += moveCellsDown();
          }
        }
      }

      if (countDown === 0) {
        updateInfo();
        break;
      }

      addNewValue();
      changingCellInfo();
      updateInfo();
      break;

    case 'ArrowLeft':
      let countLeft = 0;

      countLeft += moveCellsLeft();
      countLeft += moveCellsLeft();
      countLeft += moveCellsLeft();

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameGround[i][j] === gameGround[i][j + 1]
            && gameGround[i][j] !== 0) {
            gameGround[i][j] *= 2;
            gameGround[i][j + 1] *= 0;
            result += gameGround[i][j];
            countLeft++;

            countLeft += moveCellsLeft();
            countLeft += moveCellsLeft();
          }
        }
      }

      if (countLeft === 0) {
        updateInfo();
        break;
      }

      addNewValue();
      changingCellInfo();
      updateInfo();
      break;

    case 'ArrowRight':
      let countRight = 0;

      countRight += moveCellsRight();
      countRight += moveCellsRight();
      countRight += moveCellsRight();

      for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
          if (gameGround[i][j] === gameGround[i][j - 1]
            && gameGround[i][j] !== 0) {
            gameGround[i][j] *= 2;
            gameGround[i][j - 1] *= 0;
            result += gameGround[i][j];
            countRight++;

            countRight += moveCellsRight();
            countRight += moveCellsRight();
          }
        }
      }

      if (countRight === 0) {
        updateInfo();
        break;
      }

      addNewValue();
      changingCellInfo();
      updateInfo();
      break;
  }
}

play.addEventListener('click', () => {
  play.classList.add('restart');
  play.classList.remove('start');
  play.textContent = 'Restart';
  result = 0;

  document.querySelector('.message-start').classList.toggle('hidden', true);
  document.querySelector('.message-lose').classList.toggle('hidden', true);
  document.querySelector('.message-win').classList.toggle('hidden', true);

  cancellation();
  addNewValue();
  changingCellInfo();
  updateInfo();
});

document.addEventListener('keydown', (e) => {
  keyPressed(e.key);
});

// Exp
const gameField = document.querySelector('.game-field');

let startPointX;
let startPointY;
let moved = false;

function touch(e) {
  e.preventDefault();

  startPointX = e.changedTouches[0].pageX;
  startPointY = e.changedTouches[0].pageY;
}

function move(e) {
  if (moved) {
    return;
  }

  e.preventDefault();

  if (e.changedTouches[0].pageX > startPointX + gameField.offsetWidth / 4) {
    keyPressed('ArrowRight');

    moved = true;
  }

  if (e.changedTouches[0].pageX < startPointX - gameField.offsetWidth / 4) {
    keyPressed('ArrowLeft');

    moved = true;
  }

  if (e.changedTouches[0].pageY < startPointY - gameField.offsetHeight / 4) {
    keyPressed('ArrowUp');

    moved = true;
  }

  if (e.changedTouches[0].pageY > startPointY + gameField.offsetHeight / 4) {
    keyPressed('ArrowDown');

    moved = true;
  }
}

gameField.addEventListener('touchmove', move);
gameField.addEventListener('touchstart', touch);

gameField.addEventListener('touchend', () => {
  setTimeout(() => {
    moved = !moved;
  }, 200);
});
