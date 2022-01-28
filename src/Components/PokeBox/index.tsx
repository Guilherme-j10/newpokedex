import React, { useState, memo } from 'react';
import { View, Text, Image } from 'react-native';
import { IPokemonData } from '../../Screens/List';
import { StylePokeBox } from './style';
import { typesColor, ITypesColor } from '../../util/contants';
import PokeBall from '../../assets/pokeball.png';

interface IPokeBox {
  props: IPokemonData
}

const PokeBox: React.FC <IPokeBox> = ({ props }) => {
  
  const [ LoadImage, setLoadImage ] = useState(false);

  return(
    <View style={[StylePokeBox.ContainerBox, { backgroundColor: `${typesColor[props.types[0].type.name as keyof ITypesColor]}b0` }]}>
      <View style={StylePokeBox.HeaderIndentification}>
        <Text style={StylePokeBox.IdText}># {props.id}</Text>
      </View>
      <View style={StylePokeBox.HeaderNamePokemon}>
        <Text style={StylePokeBox.PokemonName}>{props.name}</Text>
      </View>
      <View style={StylePokeBox.ContainerTypes}>
        {props.types.map(( dados, index ) => (
          <Text key={index} style={StylePokeBox.TextType}>{dados.type.name}</Text>
        ))}
      </View>
      <Image style={StylePokeBox.PokeBall} source={PokeBall} />
      <Image 
        style={StylePokeBox.ImagePokemon}
        onLoadStart={() => setLoadImage(true)}
        onLoadEnd={() => setLoadImage(false)}
        source={{ 
          uri: props.sprites.other.home.front_default ? props.sprites.other.home.front_default : props.sprites.other['official-artwork'].front_default 
        }} 
      />
    </View>
  );
}

export default memo(PokeBox);