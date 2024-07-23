import { Stack, Tabs } from "expo-router";

export default function staffLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="FormBox" />
      <Stack.Screen name="FormBoxtwo" /> */}
    </Stack>
  );
}
