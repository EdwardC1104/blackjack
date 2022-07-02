import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Background from "../components/Background";
import ScreenTitle from "../components/ScreenTitle";
import Button from "../components/Button";
import { getUsers, getWinners } from "../../database";
import PlayerPillBase from "../components/PlayerPillBase";
import { PureNativeButton } from "react-native-gesture-handler/lib/typescript/components/GestureButtons";

interface Props {
  navigation: any;
}

type Leaderboard = {
  user: User;
  numberOfWins: number;
  numberOfLosses: number;
}[];

export default function Leaderboard({ navigation }: Props) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard>([]);

  useEffect(() => {
    const queryLeaderboard = async () => {
      const newLeaderboard: Leaderboard = [];

      const users = await getUsers();
      const winners = await getWinners();

      for (const user of users) {
        const userWinners = winners.filter(
          (winner) => winner.userID === user.id
        );
        const numberOfWins = userWinners.reduce(
          (acc, winner) => acc + (winner.didWin ? 1 : 0),
          0
        );

        const numberOfLosses = userWinners.reduce(
          (acc, winner) => acc + (winner.didWin ? 0 : 1),
          0
        );
        newLeaderboard.push({
          user,
          numberOfWins,
          numberOfLosses,
        });
      }

      newLeaderboard
        .sort((a, b) => b.numberOfLosses - a.numberOfLosses)
        .reverse();
      newLeaderboard.sort((a, b) => b.numberOfWins - a.numberOfWins);

      setLeaderboard(newLeaderboard);
    };

    queryLeaderboard();
  }, []);

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
        <ScreenTitle style={{ marginBottom: 40 }}>leaderboard</ScreenTitle>
        <View
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          {leaderboard.map((item) => (
            <PlayerPillBase
              key={item.user.id}
              name={item.user.name}
              avatar={item.user.avatar}
              blurRightElement={false}
              rightElement={
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 32,
                      color: "#11C639",
                      fontWeight: "bold",
                      marginRight: 16,
                      minWidth: 25,
                    }}
                  >
                    {item.numberOfWins}
                  </Text>
                  <Text
                    style={{
                      fontSize: 32,
                      color: "#BE1212",
                      fontWeight: "bold",
                      minWidth: 25,
                    }}
                  >
                    {item.numberOfLosses}
                  </Text>
                </View>
              }
            />
          ))}
        </View>
        <View style={{ position: "absolute", bottom: 0 }}>
          <Button
            title="back"
            onPress={() => {
              navigation.goBack();
            }}
            raised
          />
        </View>
      </ScrollView>
    </Background>
  );
}
