import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { StyleList } from './style';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import PokeBox from '../../Components/PokeBox';
import axios from 'axios';
import { FooterLoadList } from '../../Components/FooterLoadList';
import normalize from 'react-native-normalize';

export interface IPokemonData {
  id: number,
  name: string,
  types: Array< { type: { name: string } } >,
  weight: number,
  sprites: {
    other: {
      home: {
        front_default: string
      },
      'official-artwork': {
        front_default: string
      }
    }
  }
}

interface IRequestPokemonsOffset {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<{
    name: string,
    url: string
  }>
}

export const List: React.FC = () => {

  const [ PokemonsInformations, setPokemonsInformations ] = useState([] as IPokemonData[]);
  const [ isFirstLoadLoading, setisFirstLoadLoading ] = useState(true);
  const [ NormalLoad, setNormalLoad ] = useState(false);
  const [ isOverList, setisOverList ] = useState(false);

  const debugMode = false;

  const InitialReference = useRef(0);

  const SomePokemons = async (): Promise<void> => {

    let Pokemons: IPokemonData[] = [];
    setisFirstLoadLoading(isFirstLoadLoading);

    if(NormalLoad) return;

    setNormalLoad(true);

    try {

      const GettingRequest = await axios.get<IRequestPokemonsOffset>(`https://pokeapi.co/api/v2/pokemon?offset=${InitialReference.current}&limit=20`);

      if(debugMode) console.log(`https://pokeapi.co/api/v2/pokemon?offset=${InitialReference.current}&limit=20`);

      if(!GettingRequest.data.results.length) {

        setisOverList(true);
        return;

      };

      for(let i in GettingRequest.data.results){

        const PokemonRequest = await axios.get<IPokemonData>(GettingRequest.data.results[i].url);

        if(debugMode) console.log(GettingRequest.data.results[i].name);

        const PresetData: IPokemonData = {
          id: PokemonRequest.data.id,
          name: PokemonRequest.data.name,
          weight: PokemonRequest.data.weight,
          types: PokemonRequest.data.types,
          sprites: {
            other: {
              home: {
                front_default: PokemonRequest.data.sprites.other.home.front_default
              },
              "official-artwork": {
                front_default: PokemonRequest.data.sprites.other['official-artwork'].front_default
              }
            }
          }
        }

        Pokemons.push(PresetData);

      }

    } catch (error: any) {

      console.log(error.message);

    } finally {

      setPokemonsInformations(PokemonsInformations.concat(Pokemons));
      Pokemons = [];

      setisFirstLoadLoading(false);

      setNormalLoad(false);

      InitialReference.current += 20;

    }

  }

  useEffect(() => {

    SomePokemons();

  }, []);

  return( 
    <View style={StyleList.ContainerMain}>
      <View style={StyleList.HeaderContainer}>
        <Text style={StyleList.TextStyle}>Pokedex</Text>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#444" />
        </TouchableOpacity>
      </View>
      {isFirstLoadLoading ? (
        <View style={StyleList.ContainerLoadContent}>
          <ActivityIndicator color={'#888'} size={60} />
          <Text style={StyleList.TextLoad}>Buscando pokemons...</Text>
        </View>
      ) : (
        <>
          <FlatList 
            data={PokemonsInformations}
            style={{ width: '100%' }}
            overScrollMode="never" 
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={1}
            decelerationRate={0.96}
            onEndReached={() => SomePokemons()}
            viewabilityConfig={{
              minimumViewTime: 1000,
              viewAreaCoveragePercentThreshold: 100,
              waitForInteraction: true
            }}
            columnWrapperStyle={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10
            }}
            renderItem={({ item }) => <PokeBox props={item} />}
            keyExtractor={item => `${item.id}`}
            numColumns={2}
            ListFooterComponent={<FooterLoadList />}
            ListFooterComponentStyle={{
              display: isOverList ? 'none' : 'flex'
            }}
          />
        </>
      )}
    </View>
  );
}