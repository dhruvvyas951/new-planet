import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import Details from './Screens/Details';
import {creatAppCotainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default function App() {
  return (
    <AppContainer/>
  );
}

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {headerShown: false}
    },
    Details: {
      screen: Details,
      navigationOptions: {headerShown: false}
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = creatAppCotainer(StackNavigator)