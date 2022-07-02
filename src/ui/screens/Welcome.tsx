import React from "react";
import { View } from "react-native";
import Background from "../components/Background";
import WelcomeTitle from "../components/WelcomeTitle";
import Button from "../components/Button";

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <Background noPadding>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <WelcomeTitle />
        <View>
          <Button
            onPress={() => navigation.navigate("NumberOfPlayers")}
            title="Play"
            gold
            large
          />
          <Button
            onPress={() => navigation.navigate("Leaderboard")}
            title="Leaderboard"
            large
          />
        </View>
      </View>
    </Background>
  );
}
