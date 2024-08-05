import {StyleSheet} from 'react-native';
import {Theme} from '../../../components/src/types';

export default function styleConstructor(theme: Theme = {}) {
 
  return StyleSheet.create({
    dots: {
      flexDirection: 'row'
    },
    periods: {
      alignSelf: 'stretch'
    },
    period: {
      height: 4,
      marginVertical: 1,
    },
    startingDay: {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
      marginLeft: 4
    },
    endingDay: {
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2,
      marginRight: 4
    },
    
    ...(theme['stylesheet.marking'] || {})
  });
}
