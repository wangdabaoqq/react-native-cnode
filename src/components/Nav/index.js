import React, { Component } from 'react'
// import { getALl } from '../../config/api'
// import axios from 'axios'
import {Platform, StyleSheet, Text, View, Dimensions, findNodeHandle } from 'react-native';
export default class Nav extends Component {
  constructor () {
    super()
    this.state = {
      // dataList: [],
      isactive: 0
    }
  }
  getData (item, index) {
    this.setState({
      isactive: index
    })
    this.props.getData(item, index)
  }
  render () {
    let menuList = [
      {
        text: '全部',
        value: 'all'
      },
      {
        text: '精华',
        value: 'good'
      },
      {
        text: '分享',
        value: 'share'
      },
      {
        text: '问答',
        value: 'ask'
      },
      {
        text: '测试',
        value: 'dev'
      },
      {
        text: '招聘',
        value: 'job'
      }
    ]
    // const actives = this.state.isactive === index ? styles.active : ''
    return (
        <View style={styles.contain}>
          {
            menuList.map((ele, index) => 
              <Text  key={index} style={[styles.list, this.state.isactive === index ? styles.active : '']} onPress={ () => this.getData(ele, index)}>
              {ele.text}
              </Text>
            )
          }
          <Text style={styles.block}></Text>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51D3C6'
  },
  contain: {
    flexDirection: 'row',
    marginTop: 40,
    backgroundColor: '#009688',
    height: 60
    // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'stretch',
    // textAlign: 'center'
  },
  list: {
    flex: 1,
    width: 50,
    textAlign: 'center',
    lineHeight: 60,
    // backgroundColor: '#009688',
    color: 'hsla(0,0%,100%,.7)',
    fontSize: 16
  },
  active: {
    color: '#fff',
    // transform: [{translateX: 100}],
    // width: '10%'
    // backgroundColor: 'yellow',
    // position: 'absolute',
    // top: 20,
  },
  block: {
    position: 'absolute',
    // color: '#fff',
    backgroundColor: 'red',
    bottom: 0,
    transform: [{translateX: 0}],
    // width: '14%'
  }
})