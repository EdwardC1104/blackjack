import React from "react";
import {
  Animated,
  ImageURISource,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
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
import AvatarPicker from "../components/AvatarPicker";

interface Props {
  navigation: any;
}
type AvatarInfo = { name: string; image: ImageURISource };

export default function NewPlayer({ navigation }: Props) {
  const avatars: AvatarInfo[] = [
    { name: "ferret", image: ferret },
    { name: "elephant", image: elephant },
    { name: "polarbear", image: polarbear },
    { name: "clownfish", image: clownfish },
    { name: "penguin", image: penguin },
  ];

  const { width } = useWindowDimensions();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [nickname, setNickname] = React.useState("");

  const save = () => {
    const id = uuid.v4().toString();
    const avatar = avatars.at(
      parseInt(JSON.stringify(scrollX), 10) / (width / 2)
    );

    if (avatar) addUser(id, nickname, avatar.name);

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
          <AvatarPicker scrollX={scrollX} avatars={avatars} />
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
