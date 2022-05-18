import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  numberOfPlayers: 1 | 2 | 3 | 4 | 5;
}

const initialState: GameState = {
  numberOfPlayers: 1,
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
  },
});

export default gameSlice.reducer;
export const { incrementNumberOfPlayers, decrementNumberOfPlayers } =
  gameSlice.actions;
