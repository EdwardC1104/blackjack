import React from "react";
import { Image } from "react-native";

export default function WelcomeTitle() {
  return (
    <Image
      source={require("./title.png")}
      style={{ width: 303, height: 68 }}
      resizeMode="contain"
      accessibilityLabel="BLACKJACK"
    />
  );
}
