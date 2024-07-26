import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "expo-status-bar";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="(signIn)" /> */}
        {/* <Stack.Screen name="(staffLayout)" />
        <Stack.Screen name="(signIn)/SignInApp" />
        <Stack.Screen name="(signIn)/SignUpSelectionApp" />
        <Stack.Screen name="(signIn)/BusinessSignUpApp" />
        <Stack.Screen name="(signIn)/FindPasswordApp" />
        <Stack.Screen name="(signIn)/PersonalSignUpApp" />
        <Stack.Screen name="(staffLayout)/index" />
        <Stack.Screen name="(staffLayout)/FormBox" />
        <Stack.Screen name="(staffLayout)/FormBoxtwo" />
        <Stack.Screen name="(tabs)/index" />
        <Stack.Screen name="(tabs)/two" /> */}
      </Stack>
    </ThemeProvider>
  );
}
