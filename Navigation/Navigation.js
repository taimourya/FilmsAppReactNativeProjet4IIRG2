import { createAppContainer, createStackNavigator } from '@react-navigation/stack';
import Search from '../Components/Search'
import * as React from 'react';
import { View, Text } from 'react-native';

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  }
});

export default createAppContainer(SearchStackNavigator);