import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { LoadScreen } from './src/Components/LoadScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { List } from './src/Screens/List/index';
import { Detail } from './src/Screens/Detail';

const Stack = createNativeStackNavigator();

export default function App() {

  const [ FontsLoading ] = useFonts({ Poppins_400Regular, Poppins_700Bold, Poppins_300Light });

  if(!FontsLoading){
    return (
      <>
        <StatusBar style='auto' />
        <LoadScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Init' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Init" component={List} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}