import React, { useEffect, useRef } from "react";
import { Button, Image, ImageRequireSource, Text, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  runOnJS,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  decrementNumberOfPlayers,
  incrementNumberOfPlayers,
} from "../../state/game/gameSlice";
import { RootState } from "../../state/store";
import Background from "../components/Background";

interface Props {
  navigation: any;
}

const numberImages: {
  [key: number]: ImageRequireSource;
} = {
  1: require("../components/NumberPicker/1.png"),
  2: require("../components/NumberPicker/2.png"),
  3: require("../components/NumberPicker/3.png"),
  4: require("../components/NumberPicker/4.png"),
  5: require("../components/NumberPicker/5.png"),
};

export default function Welcome({ navigation }: Props) {
  const numberOfPlayers = useSelector(
    (state: RootState) => state.game.numberOfPlayers
  );

  const prevNumberOfPlayers = useRef(numberOfPlayers);

  useEffect(() => {
    prevNumberOfPlayers.current = numberOfPlayers;
  }, [numberOfPlayers]);

  const shouldAnimate = prevNumberOfPlayers.current !== numberOfPlayers;

  const wasDecrement = prevNumberOfPlayers.current > numberOfPlayers;

  console.log(wasDecrement);

  const dispatch = useDispatch();

  return (
    <Background noPadding>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            fontVariant: ["small-caps"],
            color: "#D6D7D7",
            position: "absolute",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          how many players?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            flex: 1,
          }}
        >
          <Animated.Image
            source={numberImages[numberOfPlayers]}
            style={{
              width: 119,
              height: 226,
              resizeMode: "contain",
            }}
            key={numberOfPlayers}
            entering={
              wasDecrement ? FadeInDown.delay(100) : FadeInUp.delay(100)
            }
            exiting={wasDecrement ? FadeOutUp : FadeOutDown}
          />
          <View
            style={{
              justifyContent: "space-between",
              height: 226,
            }}
          >
            <TouchableOpacity
              onPress={() => dispatch(incrementNumberOfPlayers())}
              disabled={numberOfPlayers === 5}
            >
              <Image
                source={require("../components/NumberPicker/up-triangle.png")}
                style={{
                  width: 48,
                  height: 52.5,
                  resizeMode: "contain",
                  opacity: numberOfPlayers === 5 ? 0.5 : 1,
                }}
              />
            </TouchableOpacity>
            <TouchableHighlight
              onPress={() => dispatch(decrementNumberOfPlayers())}
            >
              <Image
                source={require("../components/NumberPicker/down-triangle.png")}
                style={{
                  width: 48,
                  height: 52.5,
                  resizeMode: "contain",
                  opacity: numberOfPlayers === 1 ? 0.5 : 1,
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Background>
  );
}
