import React from "react";
import { Image, View } from "react-native";
import { getPlayingCardAsset } from "../../../../assets/cards";
import Card from "../../../classes/Card";
import ScreenTitle from "../ScreenTitle";

interface Props {
  name: string;
  tiny?: boolean;
  cards: Card[];
  bust: boolean;
  standing: boolean;
}

export default function PlayerHand({
  name,
  tiny,
  cards,
  bust,
  standing,
}: Props) {
  const opacity = tiny || bust || standing ? 0.3 : 1;
  const fontSize = tiny ? 10 : 24;

  return (
    <View>
      <View>
        <ScreenTitle style={{ fontSize, opacity }}>
          {name.toLowerCase()}
        </ScreenTitle>
        <View
          style={{
            flexDirection: "row",
            marginTop: tiny ? 8 : 32,
            marginBottom: tiny ? 0 : 42,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {cards.map((card, index) => (
            <Image
              key={card.getCardName()}
              source={getPlayingCardAsset(card.suit, card.rank)}
              style={{
                height: tiny ? 36 : 121,
                width: tiny ? 24 : 83,
                borderRadius: tiny ? 2 : 8,
                marginRight: index !== cards.length - 1 ? (tiny ? 5 : 16) : 0,
                resizeMode: "contain",
                opacity,
              }}
            />
          ))}
          {bust && (
            <View
              style={{
                position: "absolute",
              }}
            >
              <ScreenTitle style={{ fontSize, marginTop: 0 }}>bust</ScreenTitle>
            </View>
          )}
          {standing && (
            <View
              style={{
                position: "absolute",
              }}
            >
              <ScreenTitle style={{ fontSize, marginTop: 0 }}>
                standing
              </ScreenTitle>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
