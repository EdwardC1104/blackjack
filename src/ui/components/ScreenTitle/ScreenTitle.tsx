import React, { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface Props {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function ScreenTitle({ children, style }: Props) {
  return (
    <Text
      style={[
        {
          fontSize: 24,
          fontWeight: "bold",
          fontVariant: ["small-caps"],
          color: "#D6D7D7",
          marginTop: 16,
          textAlign: "center",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
