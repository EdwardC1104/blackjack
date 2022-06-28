import Card from "./Card";

export default class Player {
  readonly hand: Card[];
  isStanding: boolean;
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.hand = [];
    this.isStanding = false;
  }

  getIsStanding() {
    return this.isStanding;
  }

  setIsStanding(isStanding: boolean) {
    this.isStanding = isStanding;
  }

  getIsBust() {
    return this.getValue() > 21;
  }

  addCard(card: Card) {
    this.hand.push(card);
  }

  getValue() {
    // This doesn't work if you have multiple aces
    const valueDictionary = {
      ace: 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      jack: 10,
      queen: 10,
      king: 10,
    };

    const altValueDictionary = {
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
      jack: 10,
      queen: 10,
      king: 10,
    };

    let totalValue = 0;
    let altTotalValue = 0;

    for (const card of this.hand) {
      totalValue += valueDictionary[card.rank];
      altTotalValue += altValueDictionary[card.rank];
    }

    if (altTotalValue <= 21 && altTotalValue >= totalValue)
      return altTotalValue;

    return totalValue;
  }
}
