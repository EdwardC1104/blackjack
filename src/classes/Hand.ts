import Card from "./Card";

export default class Hand {
  readonly cards: Card[];

  constructor() {
    this.cards = [];
  }

  getValue() {
    const valueDictionary = {
      ace: 11,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      jack: 11,
      queen: 12,
      king: 13,
    };

    let totalValue = 0;

    for (const card of this.cards) {
      if (card.rank !== "ace") totalValue += valueDictionary[card.rank];
    }
    const numberOfAces = this.cards.reduce(
      (count, card) => count + (card.rank === "ace" ? 1 : 0),
      0
    );

    const aceValue = 11 + (numberOfAces - 1);

    if (totalValue + aceValue > 21) totalValue += numberOfAces;
    else totalValue += aceValue;

    return totalValue;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }
}
