import { deck } from "./deck.js";

// тут наполняем игрока

const characters = {
    1: {name: `Barking Man`, lives: 4, note: `kills on sight`},
    2: {name: `Curly Gal`, lives: 4, note: `curly but deadly`},
    3: {name: `Bob Pit`, lives: 3, note: `lives in a pit`}
};

const roles = {
    1: `bandit`,
    2: `renegate`,
    3: `deputy`,
    4: `sheriff`
}

let numberCharacter;
let numberRole;

const randomNumbers = function() {
    numberCharacter = Math.trunc(Math.random() * 3) + 1;
    numberRole = Math.trunc(Math.random() * 4) + 1;
    return numberCharacter, numberRole;
}

randomNumbers();

console.log(numberCharacter, numberRole);

let player1Cards = [];

let player1 = {
    character: characters[numberCharacter].name,
    lives: characters[numberCharacter].lives,
    role: roles[numberRole],
    note: characters[numberCharacter].note,
    cardsInHand: player1Cards,
    cardsOnTable: [],
    isKilled: false
};

console.log(player1);

// тут блок чисто про генерацию колоды


console.log(deck);

console.log(`Сейчас в колоде ${deck.length} карт`);

// тут берем количество карт, исходя из кол-ва жизней

console.log(`У вас ${player1.lives} жизни, поэтому вы берете ${player1.lives} карты из колоды!`);

function getCardStart () {
    for (let i = 0; i < player1.lives; i++) {
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
