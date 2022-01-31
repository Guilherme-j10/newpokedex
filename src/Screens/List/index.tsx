import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { StyleList } from './style';
import { FontAwesome } from '@expo/vector-icons';
import PokeBox from '../../Components/PokeBox';
import axios from 'axios';
import { FooterLoadList } from '../../Components/FooterLoadList';
import { IPokemonData, IRequestPokemonsOffset } from './Dtos';

interface IList {
  navigation: any
} 

export const List: React.FC <IList> = ({ navigation }) => {

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

        Pokemons.push(PokemonRequest.data);

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
    <>
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
              scrollEventThrottle={16}
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
              renderItem={({ item }) => <PokeBox props={item} navigation={navigation} />}
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
    </>
  );
}