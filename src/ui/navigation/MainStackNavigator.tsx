import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import NumberOfPlayers from "../screens/NumberOfPlayers";
import { View } from "react-native";

const TodayStack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <TodayStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardShadowEnabled: true,
        }}
        initialRouteName={"Welcome"}
      >
        <TodayStack.Screen name="Welcome" component={Welcome} />
        <TodayStack.Screen name="NumberOfPlayers" component={NumberOfPlayers} />
      </TodayStack.Navigator>
    </View>
  );
}
