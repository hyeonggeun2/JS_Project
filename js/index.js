const SIZE = 19;
let state = 1;

const stateArr = new Array (SIZE + 2);
for( let i = 0; i < SIZE + 2; i++){
  stateArr[i] = new Array(SIZE + 2);
  stateArr[i].fill(0);
}

const $space = document.querySelector('.space');

const drowSpace = () => {
  let html = '';

  // 2차원 배열 생성
  let space = new Array(SIZE);
  for (let i = 0; i < SIZE; i++)
    space[i] = new Array(SIZE);

  for (let i = 0; i < SIZE; i++){
    html += '<tr>'
    for (let j = 0; j < SIZE; j++){
      html += `<td class="space-box" id="${i},${j}"></td>`
    }
    html += '</tr>'
  }

  $space.innerHTML = html;
};

const position = (id, x, y) =>{
  let [col, row] = id.split(',');
  return stateArr[+col + x + 1][+row + y + 1];
};

const checkLeftDiagonal = (id, color, checkArr) => {
  let count = 1;
  for (let i = 1; position(id, -i, -i) === color; i++) count++;
  for (let i = 1; position(id, i, i) === color; i++) count++;
  if(count === 5) checkArr.push(5);
  if(count === 3) checkArr.push(3);
};
const checkRightDiagonal = (id, color, checkArr) => {
  let count = 1;
  for (let i = 1; position(id, i, -i) === color; i++) count++;
  for (let i = 1; position(id, -i, i) === color; i++) count++;
  if(count === 5) checkArr.push(5);
  if(count === 3) checkArr.push(3);
};
const checkHorizon = (id, color, checkArr) => {
  let count = 1;
  for (let i = 1; position(id, -i, 0) === color; i++) count++;
  for (let i = 1; position(id, i, 0) === color; i++) count++;
  if(count === 5) checkArr.push(5);
  if(count === 3) checkArr.push(3);
};
const checkVertical = (id, color, checkArr) => {
  let count = 1;
  for (let i = 1; position(id, 0, -i) === color; i++) count++;
  for (let i = 1; position(id, 0, i) === color; i++) count++;
  if(count === 5) checkArr.push(5);
  if(count === 3) checkArr.push(3);
};

const victory = (id, color) => {
  const checkArr = [];
  checkLeftDiagonal(id, color, checkArr);
  checkRightDiagonal(id, color, checkArr);
  checkHorizon(id, color, checkArr);
  checkVertical(id, color, checkArr);
  if (checkArr.indexOf(5) !== -1) console.log('victory');
}

const check33 = (id, color) => {
  const checkArr = [0];
  let res = 0;
  checkLeftDiagonal(id, color, checkArr);
  checkRightDiagonal(id, color, checkArr);
  checkHorizon(id, color, checkArr);
  checkVertical(id, color, checkArr);

  for (let i = 0; checkArr[i] !== undefined; i++){
    if (checkArr[i] === 3) res++;
  }
  if (res >= 2) console.log('no 33!');
};


$space.onclick = ({ target }) => {
  let [row, col] = target.id.split(',');
  if(!target.classList.contains('space-box') || target.innerHTML) return;

  if(state === 1){
    target.innerHTML = '<div class="black-circle"></div>';
    stateArr[+row + 1][+col + 1] = 1
    state = 2;
  }
  else {
    target.innerHTML = '<div class="white-circle"></div>';
    stateArr[+row + 1][+col + 1] = 2
    state = 1;
  }
  active()
  victory(target.id, stateArr[+row + 1][+col + 1]);
  check33(target.id, stateArr[+row + 1][+col + 1]);
};

function active() {
  if (state === 1 ) {
    document.querySelector('.player-2-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  } else {
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-2-panel').classList.toggle('active');
  }
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  window.location.reload();

  // activePlayer = 1;

  // document.querySelector('.player-1-panel').classList.remove('active');
  // document.querySelector('.player-2-panel').classList.remove('active');

  // document.querySelector('.player-1-panel').classList.add('active');
}


window.onload = drowSpace;