import { createSlice } from "@reduxjs/toolkit";
import Dealer from "../../classes/Dealer";
import Deck from "../../classes/Deck";
import Player from "../../classes/Player";
import { addWinner } from "../../database";

interface GameState {
  numberOfPlayers: 1 | 2 | 3 | 4 | 5;
  selectedPlayers: User[];
  deck: Deck;
  players: Player[];
  results: {
    playerId: Player["id"];
    didWin: boolean;
  }[];
  // activePlayer: string;
}

const initialState: GameState = {
  numberOfPlayers: 1,
  selectedPlayers: [],
  deck: new Deck(),
  players: [],
  results: [],
  // activePlayer: "",
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
        (player) => player.id !== action.payload
      );
    },
    // setActivePlayer: (state, action) => {
    //   state.activePlayer = action.payload;
    // },
    initialiseGame: (state) => {
      state.deck.shuffle();
      state.players = [
        ...state.selectedPlayers.map((user) => {
          return new Player(user.id, user.name, user.avatar);
        }),
        new Dealer("dealer", "dealer", "dealer"),
      ];

      state.results = [];

      state.players.forEach((player) => {
        let dealtCard = state.deck.dealCard();
        state.deck.removeCard(dealtCard);
        player.addCard(dealtCard);

        dealtCard = state.deck.dealCard();
        state.deck.removeCard(dealtCard);
        player.addCard(dealtCard);

        return player;
      });
    },
    hit: (state, action) => {
      state.players = state.players.map((player) => {
        if (player.id === action.payload) {
          const dealtCard = state.deck.dealCard();
          state.deck.removeCard(dealtCard);
          player.addCard(dealtCard);
        }

        return player;
      });
    },
    stand: (state, action) => {
      state.players = state.players.map((player) => {
        if (player.id === action.payload) {
          player.setIsStanding(true);
        }

        return player;
      });
    },
    cycleActivePlayer: (state) => {
      // state.players = state.players = [
      //   state.players[0],
      //   ...state.players.slice(2),
      //   state.players[1],
      // ];
      state.players = state.players = [
        ...state.players.slice(1),
        state.players[0],
      ];
      // console.log(state.players.map((player) => player.name));
    },
    calculateResults: (state) => {
      const dealer = state.players.find(
        (player: Player) => player.id === "dealer"
      ) as Player;

      state.results = state.players
        .filter((player) => player.id !== "dealer")
        .map((player) => {
          const didWin =
            (player.getValue() > dealer.getValue() && !player.getIsBust()) ||
            (dealer.getIsBust() && !player.getIsBust());

          addWinner(player.id, didWin);

          return {
            playerId: player.id,
            didWin,
          };
        });
    },
  },
});

export default gameSlice.reducer;
export const {
  incrementNumberOfPlayers,
  decrementNumberOfPlayers,
  addSelectedPlayer,
  removeSelectedPlayer,
  initialiseGame,
  hit,
  stand,
  cycleActivePlayer,
  calculateResults,
} = gameSlice.actions;
