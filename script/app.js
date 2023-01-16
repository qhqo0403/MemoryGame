const wrapper = document.querySelector('.card_wrapper');
const startBtn = document.querySelector('.start');
const currentLevel = document.querySelector('.level');
const currentMoves = document.querySelector('.moves_count');
const countNum = document.querySelector('.countNum');
const result = document.querySelector('.result');
const endText = result.querySelector('.end_txt');
const totalMoves = document.querySelector('.total_count');
const nextBtn = document.querySelector('.next');
const restartBtn = document.querySelector('.restart');

let card;
let interval;
let firstCard = false;
let secondCard = false;
let moveCount = 0;
let winCount = 0;
let level = 1;

const cards = [
  { name: "IRON-MAN", image: "marvel_01.jpg" },
  { name: "CAPTAIN-AMERICA", image: "marvel_02.jpg" },
  { name: "THOR", image: "marvel_03.jpg" },
  { name: "BLACK-WIDOW", image: "marvel_04.jpg" },
  { name: "HULK", image: "marvel_05.jpg" },
  { name: "SCARLET-WITCH", image: "marvel_06.jpg" },
  { name: "VISION", image: "marvel_07.jpg" },
  { name: "STRANGE", image: "marvel_08.jpg" },
  { name: "IRON-MAN", image: "marvel_01.jpg" },
  { name: "CAPTAIN-AMERICA", image: "marvel_02.jpg" },
  { name: "THOR", image: "marvel_03.jpg" },
  { name: "BLACK-WIDOW", image: "marvel_04.jpg" },
  { name: "HULK", image: "marvel_05.jpg" },
  { name: "SCARLET-WITCH", image: "marvel_06.jpg" },
  { name: "VISION", image: "marvel_07.jpg" },
  { name: "STRANGE", image: "marvel_08.jpg" }
];

const endResult = () => {
  wrapper.classList.add('hide');
  result.style.display = "flex";
  result.classList.remove('hide');
  currentLevel.classList.add('hide');
  currentMoves.classList.add('hide');
}

const movesCounter = () => {
  moveCount += 1;
  console.log(moveCount);
  countNum.innerText = moveCount;
  return moveCount;
}
;
const playMethod = () => {
  card = document.querySelectorAll('.card_container');
  let firstCardValue;
  let secondCardValue;
  
  function cardCheck(){
    if (firstCardValue === secondCardValue) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      firstCard = false;
      winCount += 1;
    } else {
      let [tempFirst, tempSecond] = [firstCard, secondCard];
      firstCard = false;
      secondCard = false;
      let notMatched = setTimeout(() => {
        tempFirst.classList.add('wrong');
        tempSecond.classList.add('wrong');
      }, 200);
      let delay = setTimeout(() =>{
        tempFirst.classList.remove('flip');
        tempSecond.classList.remove('flip');
        tempFirst.classList.remove('wrong');
        tempSecond.classList.remove('wrong');
      }, 900);
    }         
    if(winCount === Math.floor(card.length / 2)){
      setTimeout(endResult, 500);
      totalMoves.innerHTML = `Total moving count : ${moveCount}`;
    }
  }
  card.forEach( eachCard => {
    eachCard.addEventListener('click', () => {
      if(!eachCard.classList.contains('matched')){
        eachCard.classList.add('flip');
        if (!firstCard) {
          firstCard = eachCard;
          firstCardValue = eachCard.getAttribute('value');
        } else {
          movesCounter();
          secondCard = eachCard;
          secondCardValue = eachCard.getAttribute('value');
          cardCheck();
        }
      }
    });
  });
}

const hint = (level) => {
  card = document.querySelectorAll('.card_container');

  let open, close;
  if (level === 1) {
    open = 500;
    close = 8000;
  } else if ( level === 2) {
    open = 250;
    close = 4000;
  } else {
    open = 150;
    close = 2600;
  }

  card.forEach((eachCard, index) => {
    
    eachCard.classList.remove('flip');

    setTimeout(() => {
      eachCard.classList.add('flip');
    }, open * index);

    setTimeout(() => {
      eachCard.classList.remove('flip');
    }, close);
  });
}

const createBorad = (cards) => {
  cards.sort(() => 0.5 - Math.random()); 
  wrapper.innerHTML = '';
  wrapper.style.backgroundColor = 'white';
  currentMoves.classList.remove('hide');
  currentLevel.classList.remove('hide');
  currentLevel.innerText = `Lv.${level}`;
  for (let i = 0; i <= cards.length-1; i++) {
    wrapper.innerHTML += `
    <div class="card_container"  value="${cards[i].name}">
        <div class="card_back"><img src="images/backcard.gif" alt="back card" draggable="false"></div>
        <div class="card_front"><img src="images/${cards[i].image}" alt="MARVEL" draggable="false"></div>
    </div>
    `;
  }
  console.log(level);
  hint(level);
  playMethod();
}

nextBtn.addEventListener('click', () => {
  level++;
  if (level > 3){
    endText.innerText = 'You have cleard all levels!';
    endText.style.marginBottom = '20px';
    totalMoves.classList.add('hide');
    nextBtn.classList.add('hide');
  } else {
    countNum.innerText = 0;
    result.style.display = 'none';
    wrapper.classList.remove('hide');
    initializer();
  }
});

restartBtn.addEventListener('click', () => {
  result.style.display = 'none';
  wrapper.classList.remove('hide');
  level = 1;
  initializer();
});

startBtn.addEventListener('click', () => {
  startBtn.classList.add('hide');
  initializer();
});

const initializer = () => {
  createBorad(cards);
  winCount = 0;
  moveCount = 0;
};
