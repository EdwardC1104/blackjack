import { ImageURISource } from "react-native";

type Cards = {
  [key: string]: ImageURISource;
};

const cards: Cards = {
  _ace_of_clubs: require("./ace_of_clubs.png"),
  _ace_of_diamonds: require("./ace_of_diamonds.png"),
  _ace_of_hearts: require("./ace_of_hearts.png"),
  _ace_of_spades: require("./ace_of_spades.png"),
  _2_of_clubs: require("./2_of_clubs.png"),
  _2_of_diamonds: require("./2_of_diamonds.png"),
  _2_of_hearts: require("./2_of_hearts.png"),
  _2_of_spades: require("./2_of_spades.png"),
  _3_of_clubs: require("./3_of_clubs.png"),
  _3_of_diamonds: require("./3_of_diamonds.png"),
  _3_of_hearts: require("./3_of_hearts.png"),
  _3_of_spades: require("./3_of_spades.png"),
  _4_of_clubs: require("./4_of_clubs.png"),
  _4_of_diamonds: require("./4_of_diamonds.png"),
  _4_of_hearts: require("./4_of_hearts.png"),
  _4_of_spades: require("./4_of_spades.png"),
  _5_of_clubs: require("./5_of_clubs.png"),
  _5_of_diamonds: require("./5_of_diamonds.png"),
  _5_of_hearts: require("./5_of_hearts.png"),
  _5_of_spades: require("./5_of_spades.png"),
  _6_of_clubs: require("./6_of_clubs.png"),
  _6_of_diamonds: require("./6_of_diamonds.png"),
  _6_of_hearts: require("./6_of_hearts.png"),
  _6_of_spades: require("./6_of_spades.png"),
  _7_of_clubs: require("./7_of_clubs.png"),
  _7_of_diamonds: require("./7_of_diamonds.png"),
  _7_of_hearts: require("./7_of_hearts.png"),
  _7_of_spades: require("./7_of_spades.png"),
  _8_of_clubs: require("./8_of_clubs.png"),
  _8_of_diamonds: require("./8_of_diamonds.png"),
  _8_of_hearts: require("./8_of_hearts.png"),
  _8_of_spades: require("./8_of_spades.png"),
  _9_of_clubs: require("./9_of_clubs.png"),
  _9_of_diamonds: require("./9_of_diamonds.png"),
  _9_of_hearts: require("./9_of_hearts.png"),
  _9_of_spades: require("./9_of_spades.png"),
  _jack_of_clubs: require("./jack_of_clubs.png"),
  _jack_of_diamonds: require("./jack_of_diamonds.png"),
  _jack_of_hearts: require("./jack_of_hearts.png"),
  _jack_of_spades: require("./jack_of_spades.png"),
  _queen_of_clubs: require("./queen_of_clubs.png"),
  _queen_of_diamonds: require("./queen_of_diamonds.png"),
  _queen_of_hearts: require("./queen_of_hearts.png"),
  _queen_of_spades: require("./queen_of_spades.png"),
  _king_of_clubs: require("./king_of_clubs.png"),
  _king_of_diamonds: require("./king_of_diamonds.png"),
  _king_of_hearts: require("./king_of_hearts.png"),
  _king_of_spades: require("./king_of_spades.png"),
};

const getPlayingCardAsset = (suit: string, value: string) => {
  return cards[`_${value}_of_${suit}`];
};

const getCardBackAsset = () => {
  return require("./back.png");
};

export { getPlayingCardAsset, getCardBackAsset };
