import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  numberOfPlayers: 1 | 2 | 3 | 4 | 5;
  selectedPlayers: string[];
}

const initialState: GameState = {
  numberOfPlayers: 1,
  selectedPlayers: [],
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
  },
});

export default gameSlice.reducer;
export const {
  incrementNumberOfPlayers,
  decrementNumberOfPlayers,
  addSelectedPlayer,
  removeSelectedPlayer,
} = gameSlice.actions;
