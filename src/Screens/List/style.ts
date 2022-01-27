import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import Constants from 'expo-constants';

export const StyleList = StyleSheet.create({
  ContainerMain: {
    width: '100%',
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingVertical: normalize(30),
    paddingHorizontal: normalize(30),
    alignItems: 'center'
  },
  HeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  TextStyleContainer: {
    width: '100%',
    alignItems: 'flex-start'
  },
  TextStyle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    marginTop: normalize(20),
    color: '#444'
  },
  ContainerLoadContent: {
    flex: 1,
    justifyContent: 'center'
  },
  TextLoad: {
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    fontSize: 18,
    marginTop: normalize(25)
  }
});