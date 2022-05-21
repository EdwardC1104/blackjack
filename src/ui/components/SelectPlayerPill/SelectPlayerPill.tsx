import React from "react";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import PlayerPillBase from "../PlayerPillBase";
import goldNugget from "./pill-nugget-on.png";
import greyNugget from "./pill-nugget-off.png";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

interface Props {
  name: string;
  avatar: string;
  selected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onDelete: () => void;
}

export default function SelectPlayerPill({
  name,
  avatar,
  selected,
  onSelect,
  onDeselect,
  onDelete,
}: Props) {
  return (
    <Animated.View layout={Layout.springify()}>
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        key={selected.toString()}
      >
        <TouchableWithoutFeedback
          style={{ opacity: selected ? 1 : 0.7 }}
          onPress={selected ? onDeselect : onSelect}
          onLongPress={onDelete}
        >
          <PlayerPillBase
            name={name}
            avatar={avatar}
            rightElement={
              selected ? (
                <Image
                  source={goldNugget}
                  style={{ width: 32, height: 32, resizeMode: "contain" }}
                />
              ) : (
                <Image
                  source={greyNugget}
                  style={{ width: 32, height: 32, resizeMode: "contain" }}
                />
              )
            }
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  );
}
