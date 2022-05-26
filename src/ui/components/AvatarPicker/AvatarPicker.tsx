import React from "react";
import {
  Animated,
  ImageURISource,
  useWindowDimensions,
  View,
} from "react-native";

type AvatarInfo = { name: string; image: ImageURISource };

interface Props {
  scrollX: Animated.Value;
  avatars: AvatarInfo[];
}

export default function AvatarPicker({ scrollX, avatars }: Props) {
  const { width } = useWindowDimensions();

  const snapToOffsets = avatars.map((_, index) => index * (width / 2));

  const getItemLayout = (_: any, index: number) => {
    return { length: width / 2, offset: (width / 2) * index, index };
  };

  return (
    <Animated.FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={
        <View
          style={{
            height: width / 2,
            width: width / 4,
          }}
        />
      }
      ListFooterComponent={
        <View
          style={{
            height: width / 2,
            width: width / 4,
          }}
        />
      }
      data={avatars}
      bounces={true}
      decelerationRate="fast"
      style={{ width: "100%" }}
      keyExtractor={(_, index) => index.toString()}
      snapToOffsets={snapToOffsets}
      snapToAlignment="center"
      scrollEventThrottle={16}
      disableIntervalMomentum
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * (width / 2),
          index * (width / 2),
          (index + 1) * (width / 2),
        ];
        const translatedImageScale: any = scrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1.1, 0.7],
          extrapolateLeft: "clamp",
        });
        const translatedImageOpacity: any = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolateLeft: "clamp",
        });
        return (
          <Animated.View
            style={{
              height: width / 2,
              width: width / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.Image
              source={item.image}
              style={{
                width: 180,
                height: 180,
                resizeMode: "contain",
                transform: [{ scale: translatedImageScale }],
                opacity: translatedImageOpacity,
              }}
            />
          </Animated.View>
        );
      }}
      getItemLayout={getItemLayout}
      initialScrollIndex={Math.floor(avatars.length / 2)}
    />
  );
}
