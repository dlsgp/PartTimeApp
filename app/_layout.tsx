import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
<<<<<<< Updated upstream
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="(signIn)"/>
=======
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="(signIn)" options={{ headerShown: false }} />
        <Stack.Screen name="(staffLayout)" options={{ headerShown: false }} />
        <Stack.Screen name="(signIn)/SignInApp" options={{ headerShown: false }} />
        <Stack.Screen name="(signIn)/SignUpSelectionApp" options={{ headerShown: false }} />
        <Stack.Screen name="(signIn)/BusinessSignUpApp" options={{ headerShown: false }} />
        <Stack.Screen name="(signIn)/FindPasswordApp" options={{ headerShown: false }} />
        <Stack.Screen name="(signIn)/PersonalSignUpApp" options={{ headerShown: false }} />
        <Stack.Screen name="(staffLayout)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(staffLayout)/FormBox" options={{ headerShown: false }} />
        <Stack.Screen name="(staffLayout)/FormBoxtwo" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/two" options={{ headerShown: false }} />
>>>>>>> Stashed changes
      </Stack>
    </ThemeProvider>
  );
}
