import Player from "./Player";

export default class Dealer extends Player {
  getIsStanding() {
    return this.getValue() >= 17 && !this.getIsBust();
  }
}
