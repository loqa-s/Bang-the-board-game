import { deck, usedCards } from "./deck.js";
import { makePlayers } from "./players.js";

const btnTurn = document.querySelector(`.btn--turn`);
const btnUseCard = document.querySelector(`.btn--useCard`);

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
  getCardTurn(turnPlayer);
  console.log(
    `Сейчас ход: ${turnPlayer.character}. Игрок ${gameState.whoseTurn} в списке`
  );
  // getCardStart(turnPlayer);

  gameState.turnCounter++;

  console.log(`Игрок берет две карты из колоды`);
  console.log(`Теперь у игрока в руке ${turnPlayer.cardsInHand.length} карты!`);
  console.log(turnPlayer.cardsInHand);
  console.log(`В колоде ${deck.length} карт`);
};

const useCards = function () {
  // Функция эмулирует использование карт (пока это только бэнг)
  if (gameState.turnCounter <= 1) {
    alert(`Игра еще не началась!`);
    return;
  }
  const hasBang = gamePlayers[gameState.whoseTurn - 1].cardsInHand.some(
    (card) => card.Modificanto === "Bang!"
  );
  if (hasBang) {
    const targetedPlayer = Number(
      prompt(
        `В кого cтреляем, ковбой? 0? 1? 2? Ты, кстати, ${
          gameState.whoseTurn - 1
        }`
      )
    );

    let shiftedCards;

    gamePlayers[targetedPlayer].lives--;
    console.log(
      `Жизней у ${gamePlayers[targetedPlayer].character}`,
      gamePlayers[targetedPlayer].lives
    );
  } else {
    alert(`У тебя нет бэнга, приятель`);
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
  console.log(`Ход по gameTurn: `, gameState.turnCounter);
});

btnUseCard.addEventListener(`click`, function () {
  useCards();
  console.log(`Ход по useCards: `, gameState.turnCounter);
});
