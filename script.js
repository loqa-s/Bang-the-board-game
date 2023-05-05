import { deck } from "./deck.js";
import { makePlayers } from "./players.js";

const btnTurn = document.querySelector(`.btn--turn`);
const btnUseCard = document.querySelector(`.btn--useCard`);

const gamePlayers = makePlayers();

const getCardStart = (player) => {
  // В самом начале берем то количество карт, сколько у нас жизней
  if (gamePlayers[gameState.whoseTurn - 1].isFirstTurn) {
    for (let i = 0; i < player.lives; i++) {
      let shiftedCards = deck.shift();
      player.cardsInHand.push(shiftedCards);
    }
    gamePlayers[gameState.whoseTurn - 1].isFirstTurn = false;
  }
};

const getCardTurn = () => {
  // Каждый ход берем две карты из колоды
  for (let i = 0; i < 2; i++) {
    let shiftedCards = deck.shift();
    player1Cards.push(shiftedCards);
  }
  return player1Cards;
};

const checkIfLastPlayer = () => {
  //Смотрим последний ли игрок по порядку, чтобы сделать круг
  gameState.whoseTurn > gamePlayers.length
    ? (gameState.whoseTurn = 1)
    : gameState.whoseTurn++;
};

const turnState = function () {
  // Функция смотрит чей ход и сколько карт нужно брать
  let turnPlayer = gamePlayers[gameState.whoseTurn - 1];
  console.log(
    `Сейчас ход: ${turnPlayer.character}. Игрок ${gameState.whoseTurn} в списке`
  );
  getCardStart(turnPlayer);

  console.log(`Держит в руке ${turnPlayer.cardsInHand.length} карты!`);
  console.log(turnPlayer.cardsInHand);
  console.log(`В колоде ${deck.length} карт`);
  console.log(gameState.whoseTurn);
};

const useCards = function () {
  if (gameState.whoseTurn - 1 === 0) {
    alert(`нельзя`);
    return;
  }
  const targetedPlayer = prompt(
    `В кого выстрелить, брат? 1? 2? 3? Ты, кстати, ${gameState.whoseTurn - 1}`
  );
};

let gameState = {
  // Игровое состояние
  numberPlayers: gamePlayers.length,
  whoseTurn: 1,
  gameOver: false,
};

console.log(gameState);

const gameTurn = function () {
  // Система ходов
  if (gameState.whoseTurn === 1) {
    turnState();
    return;
  }

  if (gameState.whoseTurn === 2) {
    turnState();
    return;
  }

  if (gameState.whoseTurn === gamePlayers.length) {
    turnState();
    return;
  }
};

console.log(gamePlayers);

btnTurn.addEventListener(`click`, function () {
  gameTurn();
  checkIfLastPlayer();
});

btnUseCard.addEventListener(`click`, function () {
  useCards();
});
