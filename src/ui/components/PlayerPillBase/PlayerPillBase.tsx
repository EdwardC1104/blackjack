import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, Text, View } from "react-native";
import avatarPlaceholder from "./avatar-placeholder.png";
import penguin from "../../../../assets/avatars/penguin.png";
import elephant from "../../../../assets/avatars/elephant.png";
import ferret from "../../../../assets/avatars/ferret.png";
import clownfish from "../../../../assets/avatars/clownfish.png";
import polarbear from "../../../../assets/avatars/polarbear.png";

interface Props {
  name: string;
  avatar: string;
  rightElement: React.ReactNode;
}

interface AvatarImages {
  [key: string]: any;
}

export default function PlayerPillBase({ name, avatar, rightElement }: Props) {
  const avatarImages: AvatarImages = {
    ferret,
    elephant,
    polarbear,
    clownfish,
    penguin,
  };

  return (
    <MaskedView
      style={{
        position: "relative",
        justifyContent: "center",
        marginBottom: 22,
        height: 80,
      }}
      maskElement={
        <View
          style={{
            flex: 1,
            height: 80,
            backgroundColor: "black",
            borderRadius: 50,
          }}
        />
      }
    >
      <View
        style={{
          position: "absolute",
          right: 20,
          transform: [{ scale: 1.5 }],
        }}
      >
        {rightElement}
      </View>
      <BlurView
        intensity={200}
        tint="dark"
        style={{
          flex: 1,
          height: 80,
          padding: 20,
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={avatarImages[avatar]}
            style={{
              width: 45,
              height: 45,
              resizeMode: "contain",
              marginRight: 16,
            }}
          />
          <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
            {name}
          </Text>
        </View>
        {rightElement}
      </BlurView>
    </MaskedView>
  );
}
