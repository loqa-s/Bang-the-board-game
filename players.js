import { characters } from "./characters.js";

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

//////////////////////////////////////////////////////////

class Player {
    constructor (_nickName, _character, _lives, _role, _note, _cardsInHand, _cardsOnTable, _isKilled, _isFirstTurn) {
        this.nickName = _nickName,
        this.character = _character,
        this.lives = _lives,
        this.role = _role,
        this.note = _note,
        this.cardsInHand = _cardsInHand,
        this.cardsOnTable = _cardsOnTable,
        this.isKilled = _isKilled,
        this.isFirstTurn = _isFirstTurn
    }
};

let lobbyPlayers = 3;
export let gamePlayers = [];

const createPlayer = function() {
    let player = new Player(
        `PUP`, 
        characters[numberCharacter].name, 
        characters[numberCharacter].lives,
        roles[numberRole],
        characters[numberCharacter].note,
        [],
        [],
        false,
        true,
        );
    return player;
}

export const makePlayers = function() {

    for (let i = 0; i < lobbyPlayers; i++) {
        randomNumbers();
        let temp = createPlayer();
        gamePlayers.push(temp);
    }
    return gamePlayers;
}