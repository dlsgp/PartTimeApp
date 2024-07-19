import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import SignInApp from '@/components/src/SignInApp';
import SignUpSelectionApp from '@/components/src/SignUpSelectionApp';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import PersonalSignUpApp from '@/components/src/PersonalSignUpApp';
import BusinessSignUpApp from '@/components/src/BusinessSignUpApp';

export default function TabTwoScreen() {
  return (
    // <SignInApp/>
    // <PersonalSignUpApp/>
    // <BusinessSignUpApp/>
    <SignUpSelectionApp/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
