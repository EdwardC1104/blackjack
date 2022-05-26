import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCardBackAsset, getPlayingCardAsset } from "../../../assets/cards";
import { shuffleDeck } from "../../state/game/gameSlice";
import Background from "../components/Background";
import Button from "../components/Button";
import PlayerHand from "../components/PlayerHand";
import ScreenTitle from "../components/ScreenTitle";

interface Props {
  navigation: any;
}

export default function Game({ navigation }: Props) {
  // const dispatch = useDispatch();
  // const { player } = useSelector((state: any) => state.game);

  // useEffect(() => {
  //   dispatch(addCardToPlayer());
  // }, []);

  // useEffect(() => {
  //   console.log(player);
  // }, [player]);

  return (
    <Background>
      <ScreenTitle>dealer</ScreenTitle>
      <View style={{ flexDirection: "row", marginTop: 32, marginBottom: 42 }}>
        <Image
          source={getCardBackAsset()}
          style={{
            height: 121,
            width: 83,
            marginRight: 16,
            resizeMode: "contain",
          }}
        />
        <Image
          source={getPlayingCardAsset("diamonds", "2")}
          style={{
            height: 121,
            width: 83,
            resizeMode: "contain",
          }}
        />
      </View>
      <PlayerHand name="John" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginHorizontal: 16,
          width: "100%",
          marginBottom: 64,
        }}
      >
        <PlayerHand name="Jack" tiny />
        <PlayerHand name="Jack" tiny />
        <PlayerHand name="Jack" tiny />
      </View>
      <Button title="hit" onPress={() => undefined} gold disabled />
      <Button title="stand" onPress={() => undefined} gold disabled />
    </Background>
  );
}
