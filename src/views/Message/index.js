import React, { Component } from 'react'
// import { getALl } from '../../config/api'
// import axios from 'axios'
import {Platform, StyleSheet, Text, View, Dimensions, findNodeHandle } from 'react-native';
export default class Message extends Component {
  constructor () {
    super()
    this.state = {
      // dataList: [],
      isactive: 0
    }
  }
  render () {
    // const actives = this.state.isactive === index ? styles.active : ''
    return (
        <View>
          <Text>消息</Text>
        </View>
    )
  }
}
