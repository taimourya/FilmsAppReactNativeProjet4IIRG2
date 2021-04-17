import React from 'react';
import {Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Components/Search';
import FilmDetails from './Components/FilmDetails';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import FilmTrailer from './Components/FilmTrailer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './Components/Favorites';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();


function SearchStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />        
      <Stack.Screen name="FilmDetails" component={FilmDetails} />
      <Stack.Screen name="FilmTrailer" component={FilmTrailer} />
    </Stack.Navigator>
  );
}
function FavoriteStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} />        
      <Stack.Screen name="FilmDetails" component={FilmDetails} />
      <Stack.Screen name="FilmTrailer" component={FilmTrailer} />
    </Stack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={Store}>
        <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Search') {
                      iconName = 'search-outline'
                    } else if (route.name === 'Favorites') {
                      iconName = 'heart-outline';
                    }
        
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: true,
                showIcon: true,
              }}            
            >
              <Tab.Screen name="Search" component={SearchStackNavigation}/>
              <Tab.Screen name="Favorites" component={FavoriteStackNavigation} />
            </Tab.Navigator>
        </NavigationContainer>   
    </Provider>
  );
};
