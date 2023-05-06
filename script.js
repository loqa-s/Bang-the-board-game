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

const turnChanger = () => {
  //меняем ходы в gameState, определяя чей сейчас ход.
  gameState.whoseTurn === gameState.numberPlayers
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

  gameState.turnCounter++;
  console.log(`Держит в руке ${turnPlayer.cardsInHand.length} карты!`);
  console.log(turnPlayer.cardsInHand);
  console.log(`В колоде ${deck.length} карт`);
  console.log(gameState.whoseTurn);
  console.log(gameState.turnCounter);
};

const useCards = function () {
  if (gameState.whoseTurn - 1 <= 0) {
    alert(`Ты сейчас ${gameState.whoseTurn - 1}, поэтому тебе нельзя`);
    return;
  }
  const targetedPlayer = prompt(
    `В кого выстрелить, брат? 1? 2? 3? Ты, кстати, ${gameState.whoseTurn - 1}`
  );
};

let gameState = {
  // Игровое состояние
  numberPlayers: gamePlayers.length,
  whoseTurn: 0,
  turnCounter: 0,
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
  turnChanger();
});

btnUseCard.addEventListener(`click`, function () {
  useCards();
  console.log(gameState.turnCounter);
});
