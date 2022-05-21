import React, { ReactNode, ReactText } from "react";
import { Text } from "react-native";

interface Props {
  children: ReactNode;
}

export default function ScreenTitle({ children }: Props) {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: "bold",
        fontVariant: ["small-caps"],
        color: "#D6D7D7",
        marginTop: 16,
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
}
