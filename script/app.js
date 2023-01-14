const wrapper = document.querySelector('.card_wrapper');
const startBtn = document.querySelector('.start');
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
/* cardArray.sort(() => 0.5 - Math.random()); */
// let size;
// function randomValue(size = 4){
//   const tempArray = [...cards];
//   const cardValue = [];

//   size = (size * size) / 2;

//   for (let i = 0; i < size; i++){
//     const randomIndex = Math.floor(Math.random() * tempArray.length);
//     cardValue.push(tempArray[randomIndex]);
//     console.log(cardValue);
//     tempArray.splice(randomIndex, 1);
//   }
//   return cardValue;
// };
/* cards.sort(() => 0.5 - Math.random());  */
const endResult = () => {
  wrapper.classList.add('hide');
  result.style.display = "flex";
  result.classList.remove('hide');
}

const movesCounter = () => {
  moveCount += 1;
  return moveCount;
}

const playMethod = () => {
  card = document.querySelectorAll('.card_container');
  let firstCardValue;
  let secondCardValue;
  //console.log(card);

  card.forEach( eachCard => {
    eachCard.addEventListener('click', () => {
      if(!eachCard.classList.contains('matched')){
        eachCard.classList.add('flip');
        if (!firstCard) {  // 첫 번쨰 카드가 선택 되었을 때
          firstCard = eachCard;
          firstCardValue = eachCard.getAttribute('value');
        } else {
          movesCounter();
          secondCard = eachCard;
          secondCardValue = eachCard.getAttribute('value');
          //console.log(firstCard, secondCard, firstCardValue, secondCardValue);
          if (firstCardValue === secondCardValue) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            firstCard = false;
            winCount += 1;

            if(winCount === Math.floor(card.length / 2)){
              setTimeout(endResult, 500);
              totalMoves.innerHTML = `Total moving count : ${moveCount}`;
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() =>{
              tempFirst.classList.remove('flip');
              tempSecond.classList.remove('flip');
            }, 900);
          }
        }
      }
    }); // event handler
  }); // forEach
}

const hint = (level) => {
  card = document.querySelectorAll('.card_container');

  let open, close;
  if (level === 1) {
    open = 500;
    close = 8000;
  } else if ( level === 2) {
    open = 300;
    close = 4800;
  } else {
    open = 200;
    close = 3300;
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
    result.style.display = 'none';
    wrapper.classList.remove('hide');
    initializer()
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
