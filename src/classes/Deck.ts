import { immerable, produce } from "immer";
import Card, { Rank, Suit } from "./Card";

export default class Deck {
  readonly cards: Card[];

  [immerable] = true;

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
    return produce(this, (draft) => {
      draft.cards = draft.cards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    });
  }

  dealCard() {
    return this.cards[this.cards.length - 1];
  }

  removeCard(cardToRemove: Card) {
    return produce(this, (draft) => {
      draft.cards = draft.cards.filter(
        (card) => !card.isIdentical(cardToRemove)
      );
    });
  }
}
