import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Components/Search';
import FilmDetails from './Components/FilmDetails';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import FilmTrailer from './Components/FilmTrailer';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search" component={Search} />        
            <Stack.Screen name="FilmDetails" component={FilmDetails} />
            <Stack.Screen name="FilmTrailer" component={FilmTrailer} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
