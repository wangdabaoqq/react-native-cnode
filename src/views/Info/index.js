import React, { Component } from 'react'
// import { getALl } from '../../config/api'
// import axios from 'axios'
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking, Image, Dimensions } from 'react-native';
let { width } = Dimensions.get("window");
export default class Info extends Component {
  constructor () {
    super()
    this.state = {
      // dataList: [],
      isactive: 0
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '关于',
    // headerBackImage: (
    //   <Image source={require('../../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')}></Image>
    // ),
    headerLeft: (
      <TouchableOpacity
        style={{paddingHorizontal: 4}}
        onPress={() => {
        navigation.goBack(null)
      }}>
      <Image style={{width: 24, height: 24}}  source={require('../../assets/back.png')}></Image>
      </TouchableOpacity>
    )
  })
  enterIn = () => {
    let url = 'https://github.com/wangdabaoqq/react-native-cnode';
    Linking.openURL(url)
  }
  render () {
    // const actives = this.state.isactive === index ? styles.active : ''
    return (
        <View style={styles.contain}>
          <ScrollView style={styles.scroll}>
            <TouchableOpacity onPress={this.enterIn}>
            <Text style={styles.infoText}>项目地址</Text>
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={styles.info}>
                <Text
                  selectable={true}
                  // numberOfLines={3}
                  style={styles.read}>
                  这个项目断断续续写了也蛮长时间的, 起初只是想
                  练下手, 对react-native加深下认识。后来就觉得写个项目算了。
                  当然这个项目我还没写完, 其中由于cnode的api接口不再支持一些
                  功能, 可能功能就没有办法实现, 看什么时候再支持吧。
                  抛开api问题, 还有就是个人消息没有做。这一块我会尽快完成。
                  其余关于项目的我会在README里面做更详细的介绍。
                  反正未完待续吧。嗯就是这样️❤️。。。
                </Text>
              </View>
              {/* <View style={{flexDirection: 'column', flex: 1}}> */}
              <Text style={{color: '#2c3e50', marginTop: 10, textAlign: 'center', fontSize: 16}}>
                react-native-cnode ©2019 Created github
              </Text>
              {/* </View> */}
            </View>
          </ScrollView>
        </View>
    )
  }
}

const styles= StyleSheet.create({
  contain: {
    flexDirection: 'row',
    flex: 1,
    // padding: 10,
    // margin: 10,
    backgroundColor: '#ececec' 
  },
  scroll: {
    margin: 10,    
  },
  infoText: {
    fontSize: 16
  },
  info: {
    backgroundColor: '#fff', 
    minHeight: 250, 
    width: width - 20,
    padding: 10,
    borderRadius: 6,
    // border: 8,
    marginTop: 10
  },
  read: {
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 25,
    // letterSpacing: 2
  }
})