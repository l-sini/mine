const readline = require('readline');

const chance = 9;
const answer = Array(3).fill(0);
let strikeCount;
let ballCount;
let tryCount;

function startGame() {
  do {
    let randomNum = Math.floor(Math.random() * 100000) % 1000;
    answer[0] = Math.floor(randomNum / 100);
    answer[1] = Math.floor((randomNum % 100) / 10);
    answer[2] = randomNum % 10;
  } while (!duplicatedCheck(startGame));
}

const validCheck = (input) => {
  let msg;
  if (Number.isNaN(Number(input))) {
    msg = '숫자를 입력해주세요';
  } else if (input.length !== 3) {
    msg = '3개의 숫자를 입력해주세요';
  } else if (duplicatedCheck(input)) {
    msg = '같은 숫자 또는 0을 제외한 숫자를 입력해 주세요';
  }

  if (msg) {
    console.log(msg);
    return false;
  }

  return true;
};

const duplicatedCheck = (val) =>
  zeroCheck(val) || val[0] === val[1] || val[1] === val[2] || val[0] === val[2];

const zeroCheck = (val) =>
  Number(val[0]) === 0 && Number(val[1]) === 0 && Number(val[2]) === 0;

const term = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printLine = () => {
  term.output.write('3개의 숫자를 입력해주세요(종료: q, 재시작: r): ');
};

const endGame = () => {};

const closeGame = () => {};

const resetGame = () => {};

resetGame();
