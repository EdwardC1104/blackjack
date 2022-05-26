import React, { useEffect, useRef } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { Layout } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../database";
import {
  addSelectedPlayer,
  removeSelectedPlayer,
} from "../../state/game/gameSlice";
import { RootState } from "../../state/store";
import Background from "../components/Background";
import Button from "../components/Button";
import ScreenTitle from "../components/ScreenTitle";
import SelectPlayerPill from "../components/SelectPlayerPill";
import Plus from "../icons/Plus";

interface Props {
  navigation: any;
}

export default function SelectPlayers({ navigation }: Props) {
  const initialRender = useRef(true);

  useEffect(() => {
    initialRender.current = false;
  }, []);

  // console.log(initialRender.current ? undefined : Layout.springify());

  const numberOfPlayers = useSelector(
    (state: RootState) => state.game.numberOfPlayers
  );
  const selectedPlayers = useSelector(
    (state: RootState) => state.game.selectedPlayers
  );

  const [users, setUsers] = React.useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUsers().then((databaseUsers) =>
        setUsers(databaseUsers.sort((a, b) => (a.name > b.name ? 1 : -1)))
      );
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getUsers().then((databaseUsers) =>
      setUsers(databaseUsers.sort((a, b) => (a.name > b.name ? 1 : -1)))
    );
  }, [selectedPlayers]);

  const dispatch = useDispatch();

  const onDelete = (id: string) => {
    Alert.alert(
      "Delete Player",
      "Would you like to permanently delete this player and their game history?",
      [
        {
          text: "Delete",
          onPress: () => {
            deleteUser(id);
            dispatch(removeSelectedPlayer(id));
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        style={{
          flex: 1,
          width: "100%",
        }}
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ marginBottom: 40 }}>
          <ScreenTitle>
            select {numberOfPlayers} player
            {numberOfPlayers > 1 ? "s" : ""}
          </ScreenTitle>
        </View>
        <View style={{ width: "100%" }}>
          {users.map((item) => (
            <SelectPlayerPill
              key={item.id}
              name={item.name}
              avatar={item.avatar}
              selected={selectedPlayers.includes(item.id)}
              onSelect={() => dispatch(addSelectedPlayer(item.id))}
              onDeselect={() => dispatch(removeSelectedPlayer(item.id))}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        </View>
        <Animated.View layout={Layout.springify()}>
          <Pressable
            style={{ flexDirection: "row", justifyContent: "center" }}
            hitSlop={{ top: 16, bottom: 20, left: 20, right: 20 }}
            onPress={() => navigation.navigate("NewPlayer")}
          >
            <Plus style={{ position: "relative", bottom: -1 }} />
            <Text
              style={{
                color: "#D6D7D7",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 6,
              }}
            >
              Add New Player
            </Text>
          </Pressable>
        </Animated.View>
        <View style={{ position: "absolute", bottom: 0 }}>
          <Button
            title="Begin!"
            onPress={() => navigation.navigate("Game")}
            raised
            disabled={selectedPlayers.length !== numberOfPlayers}
          />
        </View>
      </ScrollView>
    </Background>
  );
}
