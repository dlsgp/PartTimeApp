import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import SignInApp from '@/app/(signIn)/SignInApp';
import SignUpSelectionApp from '@/app/(signIn)/SignUpSelectionApp';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import PersonalSignUpApp from '@/app/(signIn)/PersonalSignUpApp';
import BusinessSignUpApp from '@/app/(signIn)/BusinessSignUpApp';

export default function TabTwoScreen() {
  return (
    <SignInApp/>
    // <PersonalSignUpApp/>
    // <BusinessSignUpApp/>
    // <SignUpSelectionApp/>
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
