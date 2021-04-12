import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Components/Search';
import FilmDetails from './Components/FilmDetails';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={Search} />        
          <Stack.Screen name="FilmDetails" component={FilmDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};
