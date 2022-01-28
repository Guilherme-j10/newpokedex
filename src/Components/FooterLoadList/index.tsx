import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FooterLoadListStyle } from './style';

export const FooterLoadList: React.FC = () => {
  return(
    <View style={FooterLoadListStyle.containerMain}>
      <ActivityIndicator color="#666" size={20} />
      <Text style={FooterLoadListStyle.TextStyle}>Carregando mais pokemons...</Text>
    </View>
  );
}