import React from "react";
import { View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import ScreenTitle from "../ScreenTitle";

interface Props {
  name: string;
  tiny?: boolean;
}

export default function PlayerHand({ name, tiny }: Props) {
  const isTinyValue = useSharedValue(tiny);

  return (
    <View>
      <View
        style={{
          opacity: tiny ? 0.3 : 1,
        }}
      >
        <ScreenTitle style={tiny && { fontSize: 10 }}>
          {name.toLowerCase()}
        </ScreenTitle>
        <View
          style={{
            flexDirection: "row",
            marginTop: tiny ? 8 : 32,
            marginBottom: tiny ? 0 : 42,
          }}
        >
          <View
            style={{
              height: tiny ? 36 : 121,
              width: tiny ? 24 : 83,
              backgroundColor: "white",
              borderRadius: tiny ? 2 : 8,
              marginRight: 16,
            }}
          />
          <View
            style={{
              height: tiny ? 36 : 121,
              width: tiny ? 24 : 83,
              backgroundColor: "white",
              borderRadius: tiny ? 2 : 8,
            }}
          />
        </View>
      </View>
    </View>
  );
}
