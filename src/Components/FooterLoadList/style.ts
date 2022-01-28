import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export const FooterLoadListStyle = StyleSheet.create({
  containerMain: {
    width: '100%',
    marginTop: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center' 
  },
  TextStyle: {
    marginLeft: normalize(10),
    fontFamily: 'Poppins_700Bold',
    color: '#555'
  }
});