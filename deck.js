const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "8",
  "9",
  "9",
  "10",
  "10",
  "J",
  "J",
  "Q",
  "Q",
  "K",
  "K",
  "A",
  "A",
];
const mods = [
  `Duel`,
  `Duel`,
  `Duel`,
  `Wells Fargo`,
  `Stagecoach`,
  `Stagecoach`,
  `Dynamite`,
  `Appaloosa`,
  `Horse`,
  `Horse`,
  `Saloon`,
  `Volcanic`,
  `Volcanic`,
  `Schofield`,
  `Schofield`,
  `Schofield`,
  `Remington`,
  `Rev. Carabine`,
  `Winchester`,
  `Jail`,
  `Jail`,
  `Jail`,
  `Gatling`,
  `Barrel`,
  `Injuns!`,
  `Barrel`,
  `Injuns!`,
  `Mistress`,
  `Mistress`,
  `Mistress`,
  `Mistress`,
  `Panic!`,
  `Panic!`,
  `Panic!`,
  `Panic!`,
  `Beer`,
  `Beer`,
  `Beer`,
  `Beer`,
  `Beer`,
  `Beer`,
  `General Store`,
  `General Store`,
];

function fillmods() {
  for (let i = 0; i < 25; i++) {
    let card = "Bang!";
    mods.push(card);
  }

  for (let i = 0; i < 12; i++) {
    let card = "Missed!";
    mods.push(card);
  }
}

fillmods();

function getDeck() {
  let deck = new Array();
  let card = {};

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      card = { Value: values[x], Suit: suits[i] };
      deck.push(card);
    }
  }

  const moddedDeck = deck.map((item, i) => {
    return { Value: item.Value, Suit: item.Suit, Modificanto: mods[i] };
  });

  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * moddedDeck.length);
    let location2 = Math.floor(Math.random() * moddedDeck.length);
    let tmp = moddedDeck[location1];

    moddedDeck[location1] = moddedDeck[location2];
    moddedDeck[location2] = tmp;
  }

  return moddedDeck;
}

export const usedCards = [];
export const deck = getDeck();
