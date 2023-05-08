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

const findCardInHand = function (cardWeAreLooking) {
  // Проверяем, есть ли в руке нужная карта
  let tempCards = gamePlayers[gameState.whoseTurn - 1].cardsInHand;
  let checkIfCardsInHand = tempCards.some(
    (card) => card.Modificanto === String(cardWeAreLooking)
  );
  return checkIfCardsInHand;
};

const doctorsOffice = function (playerNumber) {
  // функция следит за состоянием здоровья игрока, в которого кидают БЭНГ
  let tempPlayer = gamePlayers[playerNumber];
  if (!tempPlayer.isKilled) {
    if (tempPlayer.lives === 1) {
      tempPlayer.lives--;
      tempPlayer.isKilled = true;
      console.log(`⚰ Вы убили ${tempPlayer.character} ⚰`);
    } else {
      tempPlayer.lives--;
      console.log(`Жизней у ${tempPlayer.character} =`, tempPlayer.lives);
    }
  } else {
    alert(`${tempPlayer.character} уже убит. ⚰`);
  }
};

const usedCardIntoUsedCardsDeck = function (cardModificanto) {
  // Индексируем ипользуемые карты и убираем их из руки игрока, при использовании
  const tempPlayer = gamePlayers[gameState.whoseTurn - 1];
  const tempPlayerCardsInHand = tempPlayer.cardsInHand;
  const checkIndexOfaCard = tempPlayerCardsInHand.findIndex(
    (card) => card.Modificanto === String(cardModificanto)
  );
  usedCards.push(tempPlayerCardsInHand.splice(checkIndexOfaCard, 1));

  /*TODO: эта функция должна убрать багу с вложенностью объектов у usedCards, но ее нужно доделать
   и расположить в правильном месте, но пока она будет лежать здесь!

  function transformUsedCards() {
    return usedCards.map(function (cards) {
      return cards.reduce(function (a, c) {
        a[c[0]] = c[1];
        return a;
      }, {});
    });
  }
  */

  return checkIndexOfaCard;
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

const useCards = function (cardModificanto) {
  // Функция эмулирует использование карт (пока это только бэнг)
  if (gameState.turnCounter <= 1) {
    alert(`Игра еще не началась!`);
    return;
  }
  if (findCardInHand(cardModificanto)) {
    const targetedPlayerNumber = Number(
      prompt(
        `В кого cтреляем, ковбой? 0? 1? 2? Ты, кстати, ${
          gameState.whoseTurn - 1
        }`
      )
    );

    if (targetedPlayerNumber !== gameState.whoseTurn - 1) {
      doctorsOffice(targetedPlayerNumber);
      usedCardIntoUsedCardsDeck(cardModificanto);
    } else if (targetedPlayerNumber === gameState.whoseTurn - 1) {
      alert(`В себя стрелять не надо, подумай о близких`);
      return;
    } else {
      return;
    }
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
  console.log(`LOG: Ход по gameTurn: `, gameState.turnCounter);
});

btnUseCard.addEventListener(`click`, function () {
  useCards("Bang!");
  console.log(`LOG: Ход по useCards: `, gameState.turnCounter);
});
