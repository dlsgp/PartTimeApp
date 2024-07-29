import { Stack } from "expo-router";

export default function payManagementLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="SalaryForm" options={{ headerShown: false }} />
    </Stack>
  );
}
