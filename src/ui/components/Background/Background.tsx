import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Defs, Path, RadialGradient, Stop } from "react-native-svg";

interface Props {
  children: React.ReactNode;
  noPadding?: boolean;
}

export default function Background({ children, noPadding }: Props) {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Svg
        width={width}
        height={height}
        fill="none"
        style={{ ...StyleSheet.absoluteFillObject, zIndex: -1 }}
        viewBox="0 0 375 812"
      >
        <Path fill="#D9D9D9" d="M0 0h375v812H0z" />
        <Path fill="url(#prefix__paint0_radial_21_6)" d="M0 0h375v812H0z" />
        <Defs>
          <RadialGradient
            id="prefix__paint0_radial_21_6"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(-65.211 411.103 56.44) scale(447.205 205.979)"
          >
            <Stop stopColor="#212121" />
            <Stop offset={1} />
          </RadialGradient>
        </Defs>
      </Svg>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            marginHorizontal: noPadding ? 0 : 40,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}
