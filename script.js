
// тут наполняем игрока

const characters = {
    1: {name: `Barking Man`, lives: 4, note: `kills on sight`},
    2: {name: `Curly Gal`, lives: 4, note: `curly but deadly`},
    3: {name: `Bob Pit`, lives: 3, note: `lives in a pit`}
};

const roles = {
    1: `bandit`,
    2: `renegate`,
    3: `sheriffsCutie`,
    4: `sheriff`
}

const randomNumbers = function() {
    numberCharacter = Math.trunc(Math.random() * 3) + 1;
    numberRole = Math.trunc(Math.random() * 4) + 1;
    return numberCharacter, numberRole;
}

randomNumbers()

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

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["2", "3", "4", "5", "6", "7", "8", "8", "9", "9", "10", "10", "J", "J", "Q", "Q", "K", "K", "A", "A"];
const Mods = [`Duel`, `Duel`, `Duel`, `Wells Fargo`, `Stagecoach`, `Stagecoach`, `Dynamite`, `Appaloosa`, `Horse`, `Horse`, `Saloon`, `Volcanic`, `Volcanic`, `Schofield`, `Schofield`, `Schofield`, `Remington`, `Rev. Carabine`, `Winchester`, `Jail`, `Jail`, `Jail`, `Gatling`, `Barrel`, `Injuns!`, `Barrel`, `Injuns!`, `Mistress`, `Mistress`, `Mistress`, `Mistress`, `Panic!`, `Panic!`, `Panic!`, `Panic!`, `Beer`, `Beer`, `Beer`, `Beer`, `Beer`, `Beer`, `General Store`, `General Store`];


function getDeck() {

    let deck = new Array();

    for(let i = 0; i < 25; i++) {
        let card = 'Bang!'; 
        Mods.push(card);
    };

    for(let i = 0; i < 12; i++) {
        let card = 'Missed!';
        Mods.push(card);
    }

    let card = {};

	for(let i = 0; i < suits.length; i++) {
		for(let x = 0; x < values.length; x++) {
			card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	};

    const moddedDeck = deck.map((item, i) => {
        return {Value: item.Value, Suit: item.Suit, Modificanto: Mods[i]};
    });

	for (let i = 0; i < 1000; i++) {
		let location1 = Math.floor((Math.random() * moddedDeck.length));
		let location2 = Math.floor((Math.random() * moddedDeck.length));
		let tmp = moddedDeck[location1];

		moddedDeck[location1] = moddedDeck[location2];
		moddedDeck[location2] = tmp;
	
    };

	return moddedDeck;
};

const deck = getDeck();
console.log(deck);

console.log(`Сейчас в колоде ${deck.length} карт`);

// тут берем количество кард, исходя из кол-ва жизней

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
