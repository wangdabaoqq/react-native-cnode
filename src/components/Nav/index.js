import React, { Component } from 'react'
// import { getALl } from '../../config/api'
// import axios from 'axios'
import {
  UIManager, StyleSheet, Text, View, Animated, findNodeHandle } from 'react-native';
  // const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

export default class Nav extends Component {
  constructor () {
    super()
    this.state = {
      // dataList: [],
      fadeAnim: new Animated.Value(0),
      isactive: 0,
      TextWidth: 0,
      Left: 0,
      start: null
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.getComponentWidth().then((data) => {
        this.setState({
          TextWidth: data
        })
      })
  }, 200)
  }
  getComponentWidth () {
    return new Promise((resolve, reject) => {
      const handle = findNodeHandle(this.refs.text1)
      UIManager.measure(handle,(x, y, width, height, pageX, pageY)=>{
        // comWidth = width
        resolve(width)
      })
    })
    // console.log(comWidth);
  }

  getData (item, index) {
    this.getComponentWidth().then((data) => {
      this.setState({
        TextWidth: data,
        isactive: index,
        Left: index * data
      })
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
    let { fadeAnim } = this.state;
    // const actives = this.state.isactive === index ? styles.active : ''
    return (
      // <AnimatedTouchableWithoutFeedback>
        // <Animated.View style={{transform: [{
        //   translateY: this.state.fadeAnim.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
        //   }),
        // }],}}>
        <View style={styles.contain}>
          {/* <AnimatedTouchableWithoutFeedback */}
          {
            menuList.map((ele, index) => 
              <Text
              ref='text1'
              key={index} style={[styles.list, this.state.isactive === index ? styles.active : '']} onPress={ () => this.getData(ele, index)}>
              {ele.text}
              </Text>
            )
            // <View style={[styles.block, {width: this.state.TextWidth}]}></View>
          }
          {/* <Animated.View style={[styles.block, {width: this.state.TextWidth, left: this.state.fadeAnim.interpolate({
            outputRange:[0, this.state.Left],
            inputRange:[0,1],
            })}]}>
          </Animated.View> */}
          <View style={[styles.block, {width: this.state.TextWidth, transform: [{translateX: this.state.Left}]}]}>
          </View>
        </View>
        // </AnimatedTouchableWithoutFeedback>
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
    height: 2
    // transform: [{translateX: 0}],
    // width: '14%'
  }
})