const SIZE = 19;
let state = 0;

const $space = document.querySelector('.space');

const drowSpace = () => {
  let html = '';

  // 2차원 배열 생성
  let space = new Array(SIZE);
  for (let i = 0; i < SIZE; i++){
    space[i] = new Array(SIZE);
    }
  
  for (let i = 0; i < SIZE; i++){
    html += '<tr>'
    for (let j = 0; j < SIZE; j++){
      // space[i][j] = `${i},${j}`;
      html += `<td class="space-box" id="${i},${j}"></td>`
    }
    html += '</tr>'
  }

  $space.innerHTML = html;
}

$space.onclick = ({ target }) => {
  console.log(target);
  if(!target.classList.contains('space-box') || target.innerHTML) return;
  if(state === 0){
    target.innerHTML = '<div class="black-circle"></div>';
    state = 1;
  }
  else {
    target.innerHTML = '<div class="white-circle"></div>';
    state = 0;
  }
};

window.onload = drowSpace;