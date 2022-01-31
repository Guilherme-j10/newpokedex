import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import Constants from 'expo-constants';

export const ContainerDetail = StyleSheet.create({
  ContainerMain: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  HeaderScreen: {
    marginTop: Constants.statusBarHeight,
    paddingTop: normalize(35),
    paddingHorizontal: normalize(35),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ContainerNamePokemon: {
    paddingTop: normalize(30),
    paddingHorizontal: normalize(35),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  PokemonName: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'Poppins_700Bold'
  },
  PokemonId: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold'
  },
  ContianerTypes: {
    paddingTop: normalize(10),
    paddingHorizontal: normalize(35),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  PokemonTypes: {
    fontFamily: 'Poppins_700Bold',
    backgroundColor: '#ffffff2d',
    fontSize: 11,
    width: normalize(70),
    height: normalize(25),
    lineHeight: 23,
    borderRadius: 50,
    textAlign: 'center',
    marginRight: normalize(10),
    color: '#fff',
  },
  ContainScrollView: {
    height: normalize(230),
    width: '100%',
    marginTop: normalize(20),
  },
  ContainerOtherPokemons: {},
  ContainerImagePokemon: {
    height: normalize(230),
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  ImageStylePokemon: {
    height: normalize(180),
    marginTop: normalize(0),
    width: normalize(180),
  }
});