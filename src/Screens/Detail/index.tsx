import React, { useEffect, useState, useRef, LegacyRef, RefObject } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent, DrawerLayoutAndroidBase } from 'react-native';
import { ContainerDetail } from './style';
import { ITypesColor, typesColor } from '../../util/contants';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import PokeBall from '../../assets/pokeball.png';
import { IPokemonData } from '../List/Dtos';
import axios from 'axios';
import normalize from 'react-native-normalize';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

interface IDetail {
  navigation: any,
  route: any
}

export const Detail: React.FC <IDetail> = ({ navigation, route }) => {

  const [ PokemonData, setPokemonData ] = useState([] as IPokemonData[]);
  const [ BackGroundScreen, setBackGroundScreen ] = useState('');
  
  const { pokemonData } = route.params;
  const [ data, setData ] = useState(pokemonData as IPokemonData);

  const ScrollReference = useRef({} as ScrollView);
  const spaceAlignment = normalize(180);

  const Dragging = useSharedValue(0.6);
  const StyleImageAnimated = useAnimatedStyle(() => {
    return{
      transform: [{ scale: withTiming(Dragging.value, { duration: 200 }) }] 
    };
  });

  const StayInUpper = useAnimatedStyle(() => {
    return{
      transform: [{ scale: withTiming(5, { duration: 200 }) }] 
    };
  })

  const TakePokeData = async (PokemonId: number): Promise<IPokemonData> => {

    const RequestPokemon = await axios.get<IPokemonData>(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`);

    return RequestPokemon.data;

  }

  useEffect(() => {
    
    setBackGroundScreen(
      typesColor[data.types[0].type.name as keyof ITypesColor]
    );

    (async () => {

      const ArrayList = [];
      ArrayList[0] = await TakePokeData(data.id - 2);
      ArrayList[1] = await TakePokeData(data.id - 1);
      ArrayList[2] = data;
      ArrayList[3] = await TakePokeData(data.id + 1);
      ArrayList[4] = await TakePokeData(data.id + 2);
      
      setPokemonData(ArrayList);
      ScrollReference.current.scrollTo({ x: (Dimensions.get('window').width - spaceAlignment) * 2, y: 0, animated: true });

    })()

  }, []);

  const ConvertFirstLetterToUpperCase = (value: string): string => {

    const separete = value.split('');

    separete[0] = separete[0].toUpperCase();

    return separete.join('');

  } 

  const ChengedPokemonData = (ScrollPosition: number) => {
    
    setData(PokemonData[Math.floor(ScrollPosition / 216)]); 
    setBackGroundScreen(
      typesColor[PokemonData[Math.floor(ScrollPosition / 216)].types[0].type.name as keyof ITypesColor]
    );

  }

  return(
    <View 
      style={[
        ContainerDetail.ContainerMain,
        { backgroundColor: BackGroundScreen }
      ]}>
      <StatusBar style='light' />
      <View style={ContainerDetail.HeaderScreen}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="hearto" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={ContainerDetail.ContainerNamePokemon}>
        <Text style={ContainerDetail.PokemonName}>{ConvertFirstLetterToUpperCase(data.name)}</Text>
        <Text style={ContainerDetail.PokemonId}># {data.id}</Text>
      </View>
      <View style={ContainerDetail.ContianerTypes}>
        {data.types.map((dados, index) => (
          <Text key={index} style={ContainerDetail.PokemonTypes} >{ dados.type.name }</Text>
        ))}
      </View>
      <View style={ContainerDetail.ContainScrollView}>
        <ScrollView
          ref={ScrollReference}
          contentContainerStyle={ContainerDetail.ContainerOtherPokemons}
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => ChengedPokemonData(event.nativeEvent.contentOffset.x)}
          showsHorizontalScrollIndicator={false}
          overScrollMode='never'
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            ChengedPokemonData(event.nativeEvent.contentOffset.x);
          }}
          onScrollBeginDrag={() => Dragging.value = 1}
          onScrollEndDrag={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            ChengedPokemonData(event.nativeEvent.contentOffset.x);
            Dragging.value = 0.6
          }}
          disableIntervalMomentum={true}
          scrollEventThrottle={1}
          decelerationRate="fast"
          snapToInterval={Dimensions.get('window').width - spaceAlignment}
          snapToAlignment={"center"}
        >
          {PokemonData.map((dados, index) => (
            <View 
              style={[
                ContainerDetail.ContainerImagePokemon, 
                { 
                  width: Dimensions.get('window').width - spaceAlignment,
                  marginLeft: index == 0 ? spaceAlignment / 2 : 0,
                  marginRight: index == 4 ? spaceAlignment / 2 : 0,
                }
              ]}
            >
              <Animated.Image 
                key={dados.id == data.id ? `${index}${data.id}` : undefined}
                style={[
                  ContainerDetail.ImageStylePokemon,
                  
                  dados.id == data.id ? {} : { tintColor: '#0000002d' },
                  StyleImageAnimated,
                  //dados.id == data.id ? StayInUpper : false
                ]}
                source={{ uri: dados.sprites.other.home.front_default }}
                blurRadius={dados.id == data.id ? 0 : 5}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}