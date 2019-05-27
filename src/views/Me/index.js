import React, { Component } from 'react'
import { getAccess, getUsers } from '../../config/api'
// import axios from 'axios'
import { fillterTime, removeSession } from '../../utils'
import { connect } from 'react-redux'
import { getLoginName, removeLogin } from '../../store'

import AsyncStorage from '@react-native-community/async-storage'
import {Button, StyleSheet, Text, View, TextInput, Image } from 'react-native';
class Me extends Component {
  constructor () {
    super()
    this.state = {
      // dataList: [],
      text: '3f24a7d9-bfdb-452c-9a03-5594698797b7',
      isactive: 0,
      avatarImage: '',
      loginname: '',
      data: null
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '登录'
  })
  getInfo () {
    getUsers(this.state.loginname).then((res) => {
      let datas = res.data.data
      this.setState({
        data: datas
      })
      console.log(this.state.data);
      this.props.onSubmit(datas.loginname)
    })
  }
  getUser = () => {
    getAccess(this.state.text).then((res) => {
      let data = res.data
      this.setState({
        avatarImage: data.avatar_url,
        loginname: data.loginname
      })
      AsyncStorage.setItem('loginname', data.loginname)

      this.getInfo()
    })
    // getUsers(this.state.loginname).then((res) => {
    //   let datas = res.data
    //   console.log(res);
      
    //   this.setState({
    //     data: datas
    //   })
    // })
    let loginname = AsyncStorage.getItem('loginname').then(data => data)
    this.setState({
      loginname
    })
  }
  logout = () => {    
    removeSession('loginname',  () => {
      this.setState({
        loginname: '',
        data: null
      })
      this.props.removeLogin('')
    })
    // let loginname = AsyncStorage.removeItem('loginname').then((error) => {
    //   // console.log(error);
    //   this.setState({
    //     loginname: '',
    //     data: null
    //   })
    // })
    // console.log(loginname);
    
  }
  onChangeText = (val) => {
    this.setState({
      text: val
    })
  }
  render () {
    
    let { data, loginname } = this.state
    // console.log(data, loginname, data.avatar_url);
    
    // const actives = this.state.isactive === index ? styles.active : ''
    return (
      <View style={{flex: 1,
        flexDirection: 'column',}}>
        {data ? <View style={{flex: 1, flexDirection: 'row', margin: 8}}>
          <Image 
          defaultSource={require('../../assets/tabbar_merchant.png')}  
          source={{uri: data.avatar_url}} 
          style={{width: 32, height: 32, borderRadius: 16}}
          ></Image>
          <View style={{flex: 1, flexDirection: 'column', marginLeft: 6}}>
          <Text>
            {data.loginname}
          </Text>
          <Text>
            创建时间: {fillterTime(data.create_at)}
          </Text>
          <Text>
            积分: {data.score}
          </Text>
          </View>
          <View style={{
            position: 'absolute',
            right: 0,
            top: 6,
            padding: 4,
            backgroundColor: '#009688',
            borderRadius: 4,
            flexDirection: 'row'}}
            >
            <Text            onPress={this.logout} style={{    color: '#fff',}}>退出</Text>
          </View>
        </View> : null
        }
        { !loginname ?
        <View style={{
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'stretch',
      marginLeft: 60,
      marginRight: 60,
      marginTop: 60,
    }}>
        <View style={{
          // marginTop: 60,
          // marginLeft: 60,
          // marginRight: 60,
          paddingVertical: 10,
          borderBottomColor: '#eee',
          // flex: 1, flexDirection: 'column', 
          borderBottomWidth: 1 }}>
            <TextInput
            editable = {true}
            placeholder="Access Token"
            maxLength = {40}
            autoFocus={true}
            onChangeText={this.onChangeText}
            value={this.state.text}
          />
        </View>
        <View style={{backgroundColor: '#009688', marginTop: 4, borderRadius:4 }}>
            <Button
            onPress={this.getUser}
            color='#fff'
            title="登录">

            </Button>
          </View>
        </View>
        : null
        } 
        </View>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  
  return {
    login: state.login,
    // dataList: state.dataList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(getLoginName(data))
    },
    removeLogin: (data) => {
      dispatch(removeLogin(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Me)