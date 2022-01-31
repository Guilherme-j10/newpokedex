import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator } from 'react-native';
import { ContainerDetail } from './style';
import { ITypesColor, typesColor } from '../../util/contants';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import PokeBall from '../../assets/pokeball.png';
import { IPokemonData } from '../List/Dtos';
import axios from 'axios';
import normalize from 'react-native-normalize';

interface IDetail {
  navigation: any,
  route: any
}

export const Detail: React.FC <IDetail> = ({ navigation, route }) => {

  const [ PokemonData, setPokemonData ] = useState([] as IPokemonData[]);
  const [ BackGroundScreen, setBackGroundScreen ] = useState('');
  
  const limit = 21;
  const { pokemonData } = route.params;
  const [ data, setData ] = useState(pokemonData as IPokemonData);
  const [ isLoadContent, setisLoadContent ] = useState(false);

  const ScrollReference = useRef({} as ScrollView);
  const spaceAlignment = normalize(190);

  const AnimatedScaleImage = useRef(new Animated.Value(0)).current;

  const TakePokeData = async (PokemonId: number): Promise<IPokemonData> => {
    
    const RequestPokemon = await axios.get<IPokemonData>(`https://pokeapi.co/api/v2/pokemon/${PokemonId}`);

    return RequestPokemon.data;

  }

  useEffect(() => {
    
    setBackGroundScreen(
      `${typesColor[data.types[0].type.name as keyof ITypesColor]}b0`
    );

    (async () => {

      const ArrayList = [];

      let negativeCount = 0;

      setisLoadContent(true);

      try {
        
        for(let i = data.id; i >= 0; i--){

          if(!(negativeCount >= Math.floor(limit / 2))){
            
            if(i){
  
              const pokemon = await TakePokeData(i);
  
              ArrayList.push(pokemon);
  
            }
  
          }
  
          negativeCount++;
  
        }
  
        ArrayList.reverse();
  
        for(let i = data.id + 1; i <= (data.id + Math.floor(limit / 2)) + 1; i++){
  
          const pokemon = await TakePokeData(i);
  
          ArrayList.push(pokemon);
  
        }
  
        setPokemonData(ArrayList);

      } catch (error: any) {

        console.log(error.message);

      } finally {

        setisLoadContent(false);

      }

    })()

  }, []);

  const ConvertFirstLetterToUpperCase = (value: string): string => {

    const separete = value.split('');

    separete[0] = separete[0].toUpperCase();

    return separete.join('');

  } 

  const ChengedPokemonData = (ScrollPosition: number) => {

    setData(PokemonData[Math.floor(ScrollPosition / 195)]); 

    console.log(PokemonData[Math.floor(ScrollPosition / 195)].name, Math.floor(ScrollPosition / 195));

    setBackGroundScreen(
      `${typesColor[PokemonData[Math.floor(ScrollPosition / 195)].types[0].type.name as keyof ITypesColor]}b0`
    );

  }

  useEffect(() => {

    if(!isLoadContent) {

      ScrollReference.current.scrollTo({ x: (Dimensions.get('window').width - spaceAlignment) * (Math.ceil(limit / 2) - 2), y: 0, animated: true });
    
    }

  }, [isLoadContent])

  return(
    <View 
      style={[
        ContainerDetail.ContainerMain,
        { backgroundColor: BackGroundScreen }
      ]}>
      <StatusBar style='light' />
      {isLoadContent ? (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#fff" size={37} />
          <Text style={{ marginTop: normalize(15), fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#fff' }} >Carregando dados...</Text>
        </View>
      ) : (
        <>
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
              showsHorizontalScrollIndicator={false}
              overScrollMode='never'
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      x: AnimatedScaleImage
                    }
                  }
                }
              ], { 
                useNativeDriver: false,
                listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => ChengedPokemonData(event.nativeEvent.contentOffset.x)
              })}
              disableIntervalMomentum={true}
              scrollEventThrottle={1}
              decelerationRate="normal"
              snapToInterval={Dimensions.get('window').width - spaceAlignment}
              snapToAlignment={"center"}
            >
              {PokemonData.map((dados, index) => {

                const scale = AnimatedScaleImage.interpolate({
                  inputRange: [
                    spaceAlignment * (index - 1),
                    spaceAlignment * index,
                    spaceAlignment * (index + 1)
                  ],
                  outputRange: [.7, 1.1, .7]
                });

                return(
                  <Animated.View 
                    key={index}
                    style={[
                      ContainerDetail.ContainerImagePokemon, 
                      { 
                        width: Dimensions.get('window').width - spaceAlignment,
                        marginLeft: index == 0 ? spaceAlignment / 2 : 0,
                        marginRight: index == (
                          pokemonData.id < Math.floor(limit / 2) ? pokemonData.id + Math.floor(limit / 2) : limit - 1
                        ) ? spaceAlignment / 2 : 0,
                      }
                    ]}
                  >
                    <Animated.Image 
                      key={dados.id == data.id ? `${index}${data.id}` : undefined}
                      style={[
                        ContainerDetail.ImageStylePokemon,
                        dados.id == data.id ? {} : { tintColor: '#0000002d' },
                        {
                          transform: [{ scale: scale }],
                        }
                      ]}
                      source={{ uri: dados.sprites.other.home.front_default }}
                      blurRadius={dados.id == data.id ? 0 : 5}
                    />
                  </Animated.View>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}