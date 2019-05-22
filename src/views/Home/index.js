import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      dataList: []
    }
  }
  static navigationOptions = ({ navigation }: any) => ({
    header: null
  })
  renderHeader = () => {
    let menuList = ['全部', '精华', '分享', '问答', '测试', '招聘']
    return (
        <View style={styles.contain}>
          {
            menuList.map(ele => 
              <Text style={styles.list}>
              {ele}
              </Text>
            )
          }
        </View>
    )
  }
  render () {
    return (
      <View style={styles.header}>
       <RefreshListView
            data={this.state.dataList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell}
            ListHeaderComponent={this.renderHeader}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    backgroundColor: '#009688',
    // paddingBottom: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 40,
    height: 60
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
    // textAlign: 'center'
  },
  list: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 60,
    color: '#fff',
    fontSize: 16
  }
})