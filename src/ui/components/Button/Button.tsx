import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  title: string;
  gold?: boolean;
  large?: boolean;
  onPress?: () => void;
}

export default function Button({ title, gold, large, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
          marginTop: 16,
          height: 41,
        }}
      >
        {gold && large && (
          <Image
            source={require("./large-gold-button.png")}
            style={{
              width: 232,
              height: 41,
              position: "absolute",
            }}
            resizeMode="contain"
          />
        )}

        {!gold && large && (
          <Image
            source={require("./large-silver-button.png")}
            style={{
              width: 232,
              height: 41,
              position: "absolute",
            }}
            resizeMode="contain"
          />
        )}

        <Text
          style={{
            fontSize: 24,
            fontVariant: ["small-caps"],
            fontWeight: "500",
          }}
        >
          {title.toLowerCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
