import React from "react";
import { Image, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Background from "../components/Background";
import PlayerPillBase from "../components/PlayerPillBase";
import ScreenTitle from "../components/ScreenTitle";
import Trophy from "../components/WinnerPlayerPill/trophy.png";
import Cross from "../components/WinnerPlayerPill/cross.png";
import Button from "../components/Button";

interface Props {
  navigation: any;
}

export default function Winners({ navigation }: Props) {
  const results = useSelector((state: RootState) => state.game.results);
  const players = useSelector((state: RootState) => state.game.players);

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        style={{
          flex: 1,
          width: "100%",
        }}
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <ScreenTitle style={{ marginBottom: 40 }}>winners</ScreenTitle>
        <View
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          {results.map((result) => {
            const player = players.find((item) => item.id === result.playerId);

            return (
              player && (
                <PlayerPillBase
                  key={player.id}
                  name={player.name}
                  avatar={player.avatar}
                  rightElement={
                    result.didWin ? (
                      <Image
                        source={Trophy}
                        style={{
                          width: 34,
                          height: 34,
                          resizeMode: "contain",
                          marginRight: 8,
                        }}
                      />
                    ) : (
                      <Image
                        source={Cross}
                        style={{
                          width: 32,
                          height: 32,
                          resizeMode: "contain",
                          marginRight: 8,
                        }}
                      />
                    )
                  }
                />
              )
            );
          })}
        </View>
        <View style={{ position: "absolute", bottom: 0 }}>
          <Button
            title="home"
            onPress={() => {
              navigation.navigate("Welcome");
            }}
            raised
          />
        </View>
      </ScrollView>
    </Background>
  );
}
