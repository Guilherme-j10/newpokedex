import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export const StylePokeBox = StyleSheet.create({
  ContainerBox: {
    width: normalize(155),
    height: normalize(140),
    backgroundColor: 'red',
    borderRadius: normalize(15),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(13)
  },
  HeaderIndentification: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  IdText: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold'
  },
  HeaderNamePokemon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: normalize(-8)
  },
  PokemonName: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff'
  },
  ContainerTypes: {
    width: '100%'
  },
  TextType: {
    fontFamily: 'Poppins_700Bold',
    backgroundColor: '#ffffff2d',
    fontSize: 10,
    width: normalize(60),
    borderRadius: 50,
    textAlign: 'center',
    marginBottom: normalize(8),
    color: '#fff'
  },
  PokeBall: {
    width: normalize(100),
    height: normalize(100),
    position: 'absolute',
    right: normalize(-10),
    opacity: .3,
    bottom: normalize(-10),
    transform: [{ rotate: '15deg' }]
  },
  ImagePokemon: {
    width: normalize(80),
    height: normalize(80),
    position: 'absolute',
    right: normalize(5),
    bottom: normalize(10)
  }
});