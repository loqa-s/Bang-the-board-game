import { deck } from "./deck.js";
import { makePlayers, gamePlayers } from "./players.js";

let player1Cards = [];

// тут блок чисто про генерацию колоды

console.log(makePlayers());

console.log(deck);

console.log(`Сейчас в колоде ${deck.length} карт`);

// тут берем количество карт, исходя из кол-ва жизней

// console.log(`У вас ${player00.lives} жизни, поэтому вы берете ${player00.lives} карты из колоды!`);

function getCardStart () {
    for (let i = 0; i < gamePlayers[0].lives; i++) {
        let shiftedCards = deck.shift();
        player1Cards.push(shiftedCards);
    }
    return player1Cards; 
}

console.log(`Сейчас у вас в руке:`);
console.log(getCardStart());
console.log(`Сейчас в колоде ${deck.length} карт`);

function getCardTurn () {
    for (let i = 0; i < 2; i++) {
        let shiftedCards = deck.shift();
        player1Cards.push(shiftedCards);
    }
    return player1Cards; 
}

getCardTurn()
console.log(`Сейчас ваш ход, поэтому вы берете из колоды 2 карты`);
console.log(`Сейчас у вас в руке:`);
console.log(player1Cards);
console.log(`Сейчас в колоде ${deck.length} карт`);

