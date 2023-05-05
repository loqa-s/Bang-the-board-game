import { characters } from "./characters.js";

const roles = {
  1: `bandit`,
  2: `renegate`,
  3: `deputy`,
  4: `sheriff`,
};

const rollRole = function () {
  numberRole = Math.trunc(Math.random() * 4) + 1;
  return numberRole;
};

const rollCharacter = function () {
  numberCharacter = Math.trunc(Math.random() * 3) + 1;
  return numberCharacter;
};

//////////////////////////////////////////////////////////

const createPlayer = function () {
  let player = {
    nickName: `TESTING`,
    character: characters[numberCharacter].name,
    lives: characters[numberCharacter].lives,
    role: roles[numberRole],
    note: characters[numberCharacter].note,
    cardsInHand: [],
    cardsOnTable: [],
    isKilled: false,
    isFirstTurn: true,
  };
  return player;
};

let numberCharacter = 0;
let numberRole = 0;
let lobbyPlayers = 3;
let gamePlayers = [];

const makePlayers = function () {
  for (let i = 0; i < lobbyPlayers; i++) {
    rollRole();
    rollCharacter();
    let temp = createPlayer();
    gamePlayers.push(temp);
  }
  return gamePlayers;
};

export { makePlayers, gamePlayers };
