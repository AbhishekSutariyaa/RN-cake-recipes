import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Screens/Home';
import Splash from './Screens/Splash';
import FullImage from './Screens/FullImage';

const Stack = createStackNavigator();

const App = ({params}) => {
  console.disableYellowBox = true;
  return (
    // <StoreProvider store={store}>
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator initialRouteName={'Splash'}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FullImage"
            component={FullImage}
            options={{headerTitle: 'Share Image'}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
    // </StoreProvider>
  );
};

export default App;
