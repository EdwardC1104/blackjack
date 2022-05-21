import React from "react";
import { Animated, TextInput, useWindowDimensions, View } from "react-native";
import Background from "../components/Background";
import ScreenTitle from "../components/ScreenTitle";
import penguin from "../../../assets/avatars/penguin.png";
import elephant from "../../../assets/avatars/elephant.png";
import ferret from "../../../assets/avatars/ferret.png";
import clownfish from "../../../assets/avatars/clownfish.png";
import polarbear from "../../../assets/avatars/polarbear.png";
import Button from "../components/Button";
import uuid from "react-native-uuid";
import { addUser } from "../../database";

interface Props {
  navigation: any;
}

// const onViewableItemsChanged = ({ viewableItems, changed }) => {
//   console.log({ viewableItems });
// };

export default function NewPlayer({ navigation }: Props) {
  const avatars: any[] = [
    { name: "ferret", image: ferret },
    { name: "elephant", image: elephant },
    { name: "polarbear", image: polarbear },
    { name: "clownfish", image: clownfish },
    { name: "penguin", image: penguin },
  ];

  const { width } = useWindowDimensions();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const snapToOffsets = avatars.map((_, index) => index * (width / 2));

  const getItemLayout = (_: any, index: number) => {
    return { length: width / 2, offset: (width / 2) * index, index };
  };

  const [nickname, setNickname] = React.useState("");

  const save = () => {
    const id = uuid.v4().toString();
    const avatar =
      avatars[parseInt(JSON.stringify(scrollX), 10) / (width / 2)].name;

    addUser(id, nickname, avatar);

    navigation.goBack();
  };

  return (
    <Background noPadding>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <ScreenTitle>new player</ScreenTitle>
        <View style={{ flexDirection: "row", marginTop: 90 }}>
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
        </View>
        <View style={{ marginTop: 80, marginHorizontal: 40 }}>
          <TextInput
            style={{
              fontSize: 40,
              fontWeight: "600",
              color: "#D6D7D7",
              textAlign: "center",
            }}
            placeholderTextColor="#6C6C6C"
            placeholder="Nickname"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
          />
          <View
            style={{
              width: width - 80,
              height: 3,
              borderRadius: 3,
              backgroundColor: "#999999",
            }}
          />
        </View>
      </View>
      <Button onPress={save} title="save" raised />
    </Background>
  );
}
