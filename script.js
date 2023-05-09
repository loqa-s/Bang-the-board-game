import { deck, usedCards } from "./deck.js";
import { makePlayers } from "./players.js";
import { useCards } from "./cards.js";

const btnTurn = document.querySelector(`.btn--turn`);
const btnUseCard = document.querySelector(`.btn--useCard`);
const btnUseCardBeer = document.querySelector(`.btn--useCard-Beer`);

const gamePlayers = makePlayers();

const getCardStart = () => {
  // В самом начале раздается то количество карт, сколько у нас жизней
  for (let i = 0; i < gamePlayers.length; i++) {
    for (let j = 0; j < gamePlayers[i].lives; j++) {
      let shiftedCards = deck.shift();
      gamePlayers[i].cardsInHand.push(shiftedCards);
    }
  }
};

const getCardTurn = (player) => {
  // Каждый ход берем две карты из колоды
  for (let i = 0; i < 2; i++) {
    let shiftedCards = deck.shift();
    player.cardsInHand.push(shiftedCards);
  }
  return player;
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
  if (turnPlayer.lives === 0) {
    console.log(
      `${turnPlayer.character} убит. Дальнейшая игра за персонажа невозможна.`
    );
  } else {
    getCardTurn(turnPlayer);
    console.log(
      `
      Сейчас ход ${turnPlayer.character}, ${gameState.whoseTurn} в списке. Он(а) берет 2 карты из колоды.
      Игрок: 
      🤠: ${turnPlayer.character}
      🩸: ${turnPlayer.lives} жизни
      🃏: В руке ${turnPlayer.cardsInHand.length} карт.`,
      turnPlayer.cardsInHand,
      `
      `
    );

    gameState.turnCounter++;

    console.log(`LOG: В колоде ${deck.length} карт`);
  }
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
  if (gameState.turnCounter === 0) {
    getCardStart();
    console.log(`Игра началась!`);
    gameState.turnCounter++;
    return;
  }
  turnChanger();
  gameTurn();
  console.log(`LOG: Ход по gameTurn: `, gameState.turnCounter);
});

btnUseCard.addEventListener(`click`, function () {
  useCards("Bang!");
  console.log(`LOG: Ход по useCards: `, gameState.turnCounter);
});

btnUseCardBeer.addEventListener(`click`, function () {
  useCards("Beer");
  console.log(`LOG: Ход по useCards-Beer: `, gameState.turnCounter);
});

export { gameState };
