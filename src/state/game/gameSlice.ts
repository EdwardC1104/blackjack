import { createSlice } from "@reduxjs/toolkit";
import Deck from "../../classes/Deck";

interface GameState {
  numberOfPlayers: 1 | 2 | 3 | 4 | 5;
  selectedPlayers: string[];
  deck: Deck;
}

const initialState: GameState = {
  numberOfPlayers: 1,
  selectedPlayers: [],
  deck: new Deck(),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementNumberOfPlayers: (state) => {
      if (state.numberOfPlayers < 5) state.numberOfPlayers++;
    },
    decrementNumberOfPlayers: (state) => {
      if (state.numberOfPlayers > 1) state.numberOfPlayers--;
    },
    addSelectedPlayer: (state, action) => {
      state.selectedPlayers.push(action.payload);
    },
    removeSelectedPlayer: (state, action) => {
      state.selectedPlayers = state.selectedPlayers.filter(
        (player) => player !== action.payload
      );
    },
    shuffleDeck: (state) => {
      state.deck = state.deck.shuffle();
    },
  },
});

export default gameSlice.reducer;
export const {
  incrementNumberOfPlayers,
  decrementNumberOfPlayers,
  addSelectedPlayer,
  removeSelectedPlayer,
  shuffleDeck,
} = gameSlice.actions;
