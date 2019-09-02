import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MyHeader from './components/MyHeader'
import { TextInput, Card, List } from 'react-native-paper';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons'
import SearchScreen from './components/SearchScreen'
import HomeScreen from './components/HomeScreen'

const TabNavigator = createBottomTabNavigator({
  "Current City": HomeScreen,
  "Select City": SearchScreen
},

{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused,tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Current City') {
        iconName = `md-cloud`;
      } else if (routeName === 'Select City') {
        iconName = `md-options`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    activeBackgroundColor: '#6200ee',
    inactiveBackgroundColor: '#6200ee'
  },
}

);

export default createAppContainer(TabNavigator);