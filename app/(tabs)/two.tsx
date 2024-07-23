import { StyleSheet } from 'react-native';
import SignInApp from '@/app/(signIn)/SignInApp';


export default function TabTwoScreen() {
  return (
    <SignInApp/>
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
