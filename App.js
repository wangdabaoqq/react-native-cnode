/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation'
import Home from './src/views/Home'
class App extends Component {
  render () {
    return (
      <AppContainer
        onNavigationStateChange={
          (prevState, currentState) => {
            StatusBar.setBarStyle('dark-content')
            // const currentScene = getCurrentRouteName(currentState)
            // const previousScene = getCurrentRouteName(prevState)
            // if (previousScene !== currentScene) {
            //   if (lightContentScenes.indexOf(currentScene) >= 0) {
            //     StatusBar.setBarStyle('light-content')
            //   } else {
            //     StatusBar.setBarStyle('dark-content')
            //   }
            // }
          }
        }
      />
    )
  }
}

const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({ Home }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页',
        // title: '111',
        // headerTitle: null,
        // headerBackTitle: null,
        tabBarIcon: ({ focused, tintColor }) => (
          //   normalImage='https://www.easyicon.net/api/resizeApi.php?id=1225464&size=16' 
          // normalImage={require('./src/assets/tabbar_merchant.png')}
            // selectedImage={require('./src/assets/tabbar_merchant.png')}         
          <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/home.png')}></Image>
        )
      }),
    },
    Nearby: {
      screen: createStackNavigator({ Nearby: Home }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '发布',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/publish.png')}></Image>

        )
      }),
    },

    Order: {
      screen: createStackNavigator({ Order: Home }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '消息',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/message.png') }></Image>

        )
      }),
    },
    Mine: {
      screen: createStackNavigator({ Mine: Home }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/me.png') }></Image>

        )
      }),
    },
    Info: {
      screen: createStackNavigator({ Mine: Home }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '关于',
        tabBarIcon: ({ focused, tintColor }) => (
          <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/info.png') }></Image>

        )
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'green',
      style: { backgroundColor: '#ffffff' },
    },
  }
)

Tab.navigationOptions = {
  header: null,
};

const AppNavigator = createStackNavigator(
  {
    Tab: { 
      screen: Tab
     }
    // Web: { screen: WebScene },
    // GroupPurchase: { screen: GroupPurchaseScene },
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);
export default App