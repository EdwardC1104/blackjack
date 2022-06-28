import Card, { Rank, Suit } from "./Card";

export default class Deck {
  cards: Card[];

  constructor() {
    this.cards = [];

    const suits: Suit[] = ["clubs", "diamonds", "hearts", "spades"];
    const ranks: Rank[] = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
    ];

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  shuffle() {
    this.cards = this.cards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  dealCard() {
    return this.cards[this.cards.length - 1];
  }

  removeCard(cardToRemove: Card) {
    this.cards = this.cards.filter((card) => !card.isIdentical(cardToRemove));
  }
}
