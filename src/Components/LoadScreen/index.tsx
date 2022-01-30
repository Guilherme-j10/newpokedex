import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const LoadScreen = () => {
  return(
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator color="#6b6b6b" size={44} />
    </View>
  );
}
