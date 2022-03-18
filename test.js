const readline = require('readline');

const chance = 10;
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
  } while (duplicatedCheck(answer));
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
  Number(val[0]) === 0 || Number(val[1]) === 0 || Number(val[2]) === 0;

const term = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

term.on('line', (line) => {
  if (line === 'q') return closeGame();
  if (line === 'r') return resetGame();

  if (!validCheck(line)) return printLine();

  for (let i = 0; i < answer.length; i++) {
    if (answer.includes(Number(line[i]))) {
      if (answer[i] === Number(line[i])) strikeCount++;
      else ballCount++;
    }
  }
  if (strikeCount === 3 || ++tryCount >= chance) {
    endGame();
  }

  console.log(
    `${tryCount}번째 시도 ${line} - ${ballCount}볼, ${strikeCount}스트라이크`
  );
  ballCount = strikeCount = 0;
  printLine();
});

const printLine = () => {
  term.output.write('3개의 숫자를 입력해주세요(종료: q, 재시작: r): ');
};

const endGame = () => {
  if (strikeCount === 3)
    console.log(`${tryCount}번만에 정답을 맞추셨습니다. 축하합니다!`);
  else return console.log(`실패하셨습니다. 정답은 ${answer}입니다.`);

  // closeGame();
  resetGame();
};

const closeGame = () => {
  console.log('종료합니다.');
  term.close();
};

const resetGame = () => {
  strikeCount = 0;
  ballCount = 0;
  tryCount = 0;
  console.clear();
  console.log('새 게임을 시작합니다. \n');
  printLine();
  startGame();
};

resetGame();
