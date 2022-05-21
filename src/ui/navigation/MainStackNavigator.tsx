import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import NumberOfPlayers from "../screens/NumberOfPlayers";
import { View } from "react-native";
import SelectPlayers from "../screens/SelectPlayers";
import NewPlayer from "../screens/NewPlayer";

const MainStack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardShadowEnabled: true,
        }}
        initialRouteName={"Welcome"}
      >
        <MainStack.Screen name="Welcome" component={Welcome} />
        <MainStack.Screen name="NumberOfPlayers" component={NumberOfPlayers} />
        <MainStack.Screen name="SelectPlayers" component={SelectPlayers} />
        <MainStack.Group screenOptions={{ presentation: "modal" }}>
          <MainStack.Screen name="NewPlayer" component={NewPlayer} />
        </MainStack.Group>
      </MainStack.Navigator>
    </View>
  );
}
