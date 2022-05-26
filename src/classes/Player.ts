import { immerable, produce } from "immer";
import Hand from "./Hand";

export default class Player {
  readonly hand: Hand;
  readonly isStanding: boolean;

  [immerable] = true;

  constructor() {
    this.hand = new Hand();
    this.isStanding = false;
  }

  getIsStanding() {
    return this.isStanding;
  }

  setIsStanding(isStanding: boolean) {
    return produce(this, (draft) => {
      draft.isStanding = isStanding;
    });
  }

  getIsBust() {
    return this.hand.getValue() > 21;
  }
}
