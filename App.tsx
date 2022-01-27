import { StatusBar } from 'expo-status-bar';
import { List } from './src/Screens/List/index';
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Text, View } from 'react-native';

export default function App() {

  const [ FontsLoading ] = useFonts({ Poppins_400Regular, Poppins_700Bold, Poppins_300Light });

  if(!FontsLoading){
    return <View><Text>CARREGANDO...</Text></View>
  }

  return (
    <>
      <StatusBar style="auto" />
      <List />
    </>
  );
}