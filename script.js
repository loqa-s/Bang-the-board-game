import { deck } from "./deck.js";
import { makePlayers, gamePlayers } from "./players.js";

const btnTurn = document.querySelector(`.btn--turn`);

makePlayers();

let initialState = {
    numberPlayers: gamePlayers.length,
    whoseTurn: 1,
    gameOver: false,
}

console.log(initialState);

const gameTurn = function () {

    let turnPlayer = {};

    function getCardStart (player) {
    // Берем количество карт из колоды, исходя из количества жизней.
        for (let i = 0; i < player.lives; i++) {
            let shiftedCards = deck.shift();
            player.cardsInHand.push(shiftedCards);
        }; 
    };

    const turnState = function () {
        turnPlayer = gamePlayers[initialState.whoseTurn-1]; 
        console.log(`Сейчас ход: ${turnPlayer.character}. Игрок ${initialState.whoseTurn} в списке`);
        (initialState.whoseTurn === gamePlayers.length) ? initialState.whoseTurn = 1 : initialState.whoseTurn++;
        if (gamePlayers[initialState.whoseTurn-1].isFirstTurn) {
            getCardStart(turnPlayer);
            gamePlayers[initialState.whoseTurn-1].isFirstTurn = false;
            console.log(`gamePlayers[initialState.whoseTurn-1].isFirstTurn =`, gamePlayers[initialState.whoseTurn-1].isFirstTurn);
        };
        console.log(turnPlayer.cardsInHand);
        console.log(`Сейчас в колоде ${deck.length} карт`);
    }

    if (initialState.whoseTurn === 1) {
        turnState();
        return;
    };

    if (initialState.whoseTurn === 2) {
        turnState();
        return;
    };

    if (initialState.whoseTurn === gamePlayers.length) {
        turnState();
        return;
    };

    console.log(`Сейчас ход игрока ${initialState.whoseTurn}. Это - ${turnPlayer}`);
    
}

console.log(gamePlayers);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// тут берем количество карт, исходя из кол-ва жизней
// console.log(`У вас ${player00.lives} жизни, поэтому вы берете ${player00.lives} карты из колоды!`);

function getCardTurn () {
    for (let i = 0; i < 2; i++) {
        let shiftedCards = deck.shift();
        player1Cards.push(shiftedCards);
    }
    return player1Cards; 
}

btnTurn.addEventListener(`click`, function () {
    gameTurn();
  });