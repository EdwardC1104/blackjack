import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  decrementNumberOfPlayers,
  incrementNumberOfPlayers,
} from "../../state/game/gameSlice";
import { RootState } from "../../state/store";
import Background from "../components/Background";
import Button from "../components/Button";
import NumberPicker from "../components/NumberPicker";
import ScreenTitle from "../components/ScreenTitle";

interface Props {
  navigation: any;
}

export default function NumberOfPlayers({ navigation }: Props) {
  const numberOfPlayers = useSelector(
    (state: RootState) => state.game.numberOfPlayers
  );

  const dispatch = useDispatch();

  return (
    <Background noPadding>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <ScreenTitle>how many players?</ScreenTitle>
        <NumberPicker
          currentNumber={numberOfPlayers}
          increment={() => dispatch(incrementNumberOfPlayers())}
          decrement={() => dispatch(decrementNumberOfPlayers())}
        />
        <Button
          title="select"
          onPress={() => navigation.navigate("SelectPlayers")}
          raised
        />
      </View>
    </Background>
  );
}
