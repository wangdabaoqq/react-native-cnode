/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { createStackNavigator, NavigationActions,  createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation'
import { getSession } from './src/utils'
import Home from './src/views/Home'
import Detail from './src/views/Detail'
import Info from './src/views/Info'
import Me from './src/views/Me'
import Message from './src/views/Message'
import Publish from './src/views/Publish'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Index from './src/store'
// AsyncStorage.setItem('userinfo', 'I like to save it.')
// const storeUserinfo = AsyncStorage.getItem('userinfo')
// let islogin
// console.log(this);
getSession('loginname')
const store = createStore(Index)
store.subscribe(() => {
  //监听state变化
  // console.log(store.getState());
  // console.log(Tab);
  Tab(store)
  // AppContainer = createAppContainer(AppNavigator(store));  
});
// let a = getSession('loginname')
// console.log(a._55, a);
// console.log(store.getState());

// console.log(AsyncStorage.getItem('userinfo'));
class App extends Component {
  render () {
    // console.log(this.state.login);
    
    // console.log(store.getState());
    // const AppContainer = createAppContainer(AppNavigator(store));
    return (
      <Provider store={store}>
      <AppContainer
        onNavigationStateChange={
          (prevState, currentState, action) => {
            StatusBar.setBarStyle('dark-content')
          }
        }
      />
      </Provider>
    )
  }
}
function Tab(params) {
  // console.log(params);
 this.params = params
  return createBottomTabNavigator(
    {
      Home: {
        screen: createStackNavigator({ home: Home }),
        navigationOptions: ({ navigation }) => ({
          tabBarLabel: '首页',
          tabBarOnPress: ({defaultHandler, navigation}) => {
            // console.log(defaultHandler);
            // console.log(1111);
            // navigation.navigate('Home')  
            // console.log(navigation);
            //  console.log(navigation.state.routes[0]);
             
            navigation.state.routes[0].params.queryData();//查询数据         
            defaultHandler()
          },
          tabBarIcon: ({ focused, tintColor }) => (
            //   normalImage='https://www.easyicon.net/api/resizeApi.php?id=1225464&size=16' 
            // normalImage={require('./src/assets/tabbar_merchant.png')}
              // selectedImage={require('./src/assets/tabbar_merchant.png')}         
            <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/home.png')}></Image>
          )
        }),
      },
      Publish: {
        screen: createStackNavigator({ publish: Publish }),
        navigationOptions: ({ navigation }) => ({
          tabBarLabel: '发布',
          // tabBarOnPress: ({defaultHandler, navigation}) => {
          //   // console.log(defaultHandler);
          //   // jundeLogin(defaultHandler, navigation)
            
          // },
          tabBarIcon: ({ focused, tintColor }) => (
            <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/publish.png')}></Image>
  
          )
        }),
      },
  
      Message: {
        screen: createStackNavigator({ message: Message }),
        navigationOptions: ({ navigation }) => ({
          tabBarLabel: '消息',
          tabBarOnPress: ({defaultHandler, navigation}) => {
            // console.log(defaultHandler);
            jundeLogin(defaultHandler, navigation)
            
          },
          tabBarIcon: ({ focused, tintColor }) => (
            <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/message.png') }></Image>
  
          )
        }),
      },
      Mine: {
        screen: createStackNavigator({ Mine:  Me }),
        navigationOptions: ({ navigation }) => ({
          tabBarLabel: '我的',
          tabBarIcon: ({ focused, tintColor }) => (
            <Image style={{tintColor, width: 25, height: 25 }} source={ require('./src/assets/me.png') }></Image>
  
          )
        }),
      },
      Info: {
        screen: createStackNavigator({ Info:  Info }),
        // paths: 'people/:name',
        navigationOptions: ({ navigation }) => ({
          tabBarLabel: '关于',
          tabBarOnPress: ({defaultHandler, navigation}) => {
            // console.log(defaultHandler);
            jundeLogin(defaultHandler, navigation)
            
          },
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
    })
}

function jundeLogin (defaultHandler, navigation) {
  let login = this.params.getState().login
    if (!login || login === '') {
      navigation.navigate('Mine')
    } else {
      defaultHandler()
    }
}
// Tabs.navigationOptions = {
//   header: null,
// };
function AppNavigator(store) {
  let Tabs = Tab(store)
  Tabs.navigationOptions = {
    header: null,
  };
  let login
  if (store) {
    login = store.getState().login
    
  }
  console.log(Tabs);
  
  // console.log(store.getState().login);
  return createStackNavigator(
    {
      Tab: { 
        screen: Tabs
       },
       Detail: {
         screen: Detail
       },
      //  onTransitionStart: (start) => {
      //   console.log(strat);
        
      // },
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
}
// const AppNavigator = createStackNavigator(
//   {
//     Tab: { 
//       screen: Tab
//      },
//      Detail: {
//        screen: Detail
//      }
//     // Web: { screen: WebScene },
//     // GroupPurchase: { screen: GroupPurchaseScene },
//   },
//   {
//     defaultNavigationOptions: {
//       headerBackTitle: null,
//       headerTintColor: '#333333',
//       showIcon: true,
//     },
//   }
// )

let AppContainer = createAppContainer(AppNavigator())
// const AppContainer = createAppContainer(AppNavigator());
export default App