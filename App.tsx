import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Montserrat_SemiBold } from "./src/ui/fonts";
import Background from "./src/ui/components/Background";
import WelcomeTitle from "./src/ui/components/WelcomeTitle";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Button from "./src/ui/components/Button";
import MainStackNavigator from "./src/ui/navigation/MainStackNavigator";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SystemUI from "expo-system-ui";
import dayjs from "dayjs";
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import { createUsersTable } from "./src/database";
import { enableLayoutAnimations } from "react-native-reanimated";

dayjs.Ls.en.weekStart = 1;
SystemUI.setBackgroundColorAsync("#000000");
enableLayoutAnimations(true);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync("Montserrat_SemiBold", Montserrat_SemiBold);
      await createUsersTable();
      setAppIsReady(true);
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "black",
    },
  };

  return (
    <Provider store={store}>
      <View
        onLayout={onLayoutRootView}
        style={{ flex: 1, backgroundColor: "black" }}
      >
        <NavigationContainer theme={MyTheme}>
          <MainStackNavigator />
        </NavigationContainer>
        <StatusBar style="light" />
      </View>
    </Provider>
  );
}
