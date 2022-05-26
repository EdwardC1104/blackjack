import { immerable } from "immer";

export type Suit = "clubs" | "diamonds" | "hearts" | "spades";
export type Rank =
  | "ace"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "jack"
  | "queen"
  | "king";

export default class Card {
  readonly rank: Rank;
  readonly suit: Suit;

  [immerable] = true;

  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getCardName() {
    return this.rank + " of " + this.suit;
  }

  isIdentical(otherCard: Card) {
    return this.rank === otherCard.rank && this.suit === otherCard.suit;
  }
}
