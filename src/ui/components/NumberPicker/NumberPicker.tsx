import React, { useEffect, useRef } from "react";
import { Image, ImageRequireSource, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";

interface Props {
  currentNumber: 1 | 2 | 3 | 4 | 5;
  increment: () => void;
  decrement: () => void;
}

const numberImages: {
  [key: number]: ImageRequireSource;
} = {
  1: require("./1.png"),
  2: require("./2.png"),
  3: require("./3.png"),
  4: require("./4.png"),
  5: require("./5.png"),
};

export default function NumberPicker({
  currentNumber,
  increment,
  decrement,
}: Props) {
  const prevNumber = useRef(currentNumber);

  useEffect(() => {
    prevNumber.current = currentNumber;
  }, [currentNumber]);

  const shouldAnimate = prevNumber.current !== currentNumber;

  const wasDecrement = prevNumber.current > currentNumber;

  return (
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
        source={numberImages[currentNumber]}
        style={{
          width: 119,
          height: 226,
          resizeMode: "contain",
        }}
        key={currentNumber}
        entering={
          shouldAnimate
            ? wasDecrement
              ? FadeInDown.delay(100)
              : FadeInUp.delay(100)
            : undefined
        }
        exiting={wasDecrement ? FadeOutUp : FadeOutDown}
      />
      <View
        style={{
          justifyContent: "space-between",
          height: 226,
        }}
      >
        <TouchableOpacity onPress={increment} disabled={currentNumber === 5}>
          <Image
            source={require("./up-triangle.png")}
            style={{
              width: 48,
              height: 52.5,
              resizeMode: "contain",
              opacity: currentNumber === 5 ? 0.5 : 1,
            }}
          />
        </TouchableOpacity>
        <TouchableHighlight onPress={decrement}>
          <Image
            source={require("./down-triangle.png")}
            style={{
              width: 48,
              height: 52.5,
              resizeMode: "contain",
              opacity: currentNumber === 1 ? 0.5 : 1,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}
