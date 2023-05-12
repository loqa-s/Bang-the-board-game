import { gamePlayers } from "./players.js";
import { characters } from "./characters.js";
import { gameState } from "./script.js";
import { usedCards } from "./deck.js";

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

const findCardInHand = function (cardModificanto) {
  // Проверяем, есть ли в руке нужная карта
  let tempCards = gamePlayers[gameState.whoseTurn - 1].cardsInHand;
  let checkIfCardsInHand = tempCards.some(
    (card) => card.Modificanto === String(cardModificanto)
  );
  return checkIfCardsInHand;
};

const usedCardIntoUsedCardsDeck = function (cardModificanto) {
  // Индексируем ипользуемые карты и убираем их из руки игрока, при использовании
  const tempPlayer = gamePlayers[gameState.whoseTurn - 1];
  const tempPlayerCardsInHand = tempPlayer.cardsInHand;
  const checkIndexOfaCard = tempPlayerCardsInHand.findIndex(
    (card) => card.Modificanto === String(cardModificanto)
  );
  usedCards.push(tempPlayerCardsInHand.splice(checkIndexOfaCard, 1));

  /*
    TODO: эта функция должна убрать багу с вложенностью объектов у usedCards, но ее нужно доделать
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

const healthCheck = function () {
  // функция сравнивает кол-во жизней у изначального персонажа и актуальные
  const turnPlayer = gamePlayers[gameState.whoseTurn - 1];
  if (turnPlayer.lives === characters[turnPlayer.characterID].lives) {
    return false;
  } else {
    return true;
  }
};

const useFunctionalCards = function (cardModificanto) {
  // Функция эмулирует использование функциональных карт (пока это только бэнг и пиво)
  let turnPlayer = gamePlayers[gameState.whoseTurn - 1];
  if (gameState.turnCounter <= 1) {
    alert(`Игра еще не началась!`);
    return;
  }
  // Если карта БЭНГ
  if (cardModificanto === "Bang!") {
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
  }
  //Если карта ПИВО
  if (cardModificanto === "Beer") {
    if (findCardInHand(cardModificanto)) {
      if (healthCheck()) {
        turnPlayer.lives++;
        usedCardIntoUsedCardsDeck(cardModificanto);
        alert(`Пиво = жизнь. +1 жизнь за выпитое пиво!`);
        console.log(
          `${turnPlayer.character} +1 жизнь. Теперь их ${turnPlayer.lives}`
        );
      } else {
        alert(`Ваши жизни и так полные, куда еще пиво-то?`);
      }
    } else {
      alert(`У тебя нет пива, приятель`);
    }
  }
};

const useBuffCards = function () {};

export { useFunctionalCards };
