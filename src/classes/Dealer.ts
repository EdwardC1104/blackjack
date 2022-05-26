import Player from "./Player";

export default class Dealer extends Player {
  getIsStanding() {
    return this.hand.getValue() > 17;
  }
}
