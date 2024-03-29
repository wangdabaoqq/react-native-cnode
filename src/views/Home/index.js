import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View, InteractionManager, Image, TouchableOpacity } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Button } from '@ant-design/react-native';
import { fillterTime } from '../../utils'
import Nav from '../../components/Nav'
// import axios from 'axios'
import { getALl } from '../../config/api'
import { connect } from 'react-redux'
import { loadData, removePrev } from '../../store'
// var moment = require('moment');
// import 'moment/locale/zh-cn'
 class Home extends Component {
  constructor () {
    super()
    this.state = {
      dataList: [],
      isactivesa: 0,
      refreshState: RefreshState.Idle,
      params: {
        tab: 'all',
        page: 1
      }
    }
  }
  static navigationOptions = ({ navigation }: any) => ({
    header: null,
    // headerStyle: { backgroundColor: 'red' },
    // gestureResponseDistance: {
    //   vertical: 11
    // }
  })
  componentWillMount () {
    this.props.navigation.setParams({ queryData: () => { this.getAxios(this.state.params); } });//在导航中添加查询数据的方法，设置一个钩子
    InteractionManager.runAfterInteractions(() => {
      this.getAxios(this.state.params)
    })
    
  }
  getData = (item, index) => {
    // console.log(this.state.params.tab);
    
    if (item.value !== this.state.params.tab) {
      // this.setState({
      //   dataList: []
      // })
      // console.log(111);
      
      this.props.removePrev()
      
    //   // this.props.state = []
    }
    // console.log(item);
    
    this.setState({
      params: {
        tab: item.value,
        page: 1,
        mdrender: false
      }
    }, () => {
      console.log(this.state.params);
      this.getAxios(this.state.params)
    })
    // console.log(this.state.params);
    
    // this.getAxios(this.state.params)
  }
  getAxios (query) {
    // console.log(query);
    
    this.setState({ refreshState: RefreshState.FooterRefreshing })
    getALl(query).then((res) => {
        
      let datas = res.data.data
      console.log(datas);
      
      this.setState({
        // dataList: [...this.state.dataList, ...datas],
        params: query,
        refreshState: RefreshState.NoMoreData
      })
      
      this.props.onSubmit(datas)
      // })
    })
  }
  keyExtractor = (item, index) => {
    return index.toString()
  }
  onFooterRefresh = () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing })
  }
  // fillterTime = (time) => {
  //   return moment(time).fromNow()
  // }
  onHeaderRefresh = () => {
    // console.log(this.state.params);
    // console.log(this.state.params.page);
    // this.setState({ refreshState: RefreshState.HeaderRefreshing })    
    this.setState({
      // refreshState: RefreshState.FooterRefreshing,
      params: {
        ...this.state.params,
        // tab: 'all',x
        page: this.state.params.page++
      }
    })
    this.getAxios(this.state.params)
  }
  onPress (data) {
    // this.props.na
    this.props.navigation.navigate('Detail', { data })
    // console.warn(this.props.navigation.state.params);
    
  }
  renderCell = (info) => {
   let data = info.item
   
    return (
     <View style={styles.contain}>
       <TouchableOpacity onPress={() => {
         this.onPress(data)
        }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image 
      defaultSource={require('../../assets/tabbar_merchant.png')}  
      source={{uri: data.author.avatar_url}} 
      style={{width: 32, height: 32, borderRadius: 16}}></Image>
        <View style={{paddingLeft: 4}}>
          <Text>{data.author.loginname}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>
            {fillterTime(data.create_at)} 
          </Text>
          <Text onPress={this.onPress} style={{color: '#009688', marginLeft: 4}}>
              #分享#
            </Text>
            </View>
        </View>
        <View style={styles.share}>
          {
            data.top ? (<Text style={styles.btn}>置顶</Text>) : null
          }
          {
            data.good ? (<Text style={styles.btn}>精华</Text>) : null
          }
          {
            data.tab === 'ask' ? (<Text style={styles.btn}>回答</Text>) : null
          }
          {
            data.tab === 'share' ? (<Text style={styles.btn}>分享</Text>) : null
          }
        </View>
      </View>
        <View style={{paddingTop: 10, paddingBottom: 10}}>
          <Text>
          {data.title}
          </Text>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}}></View>
        <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
          <View style={styles.cloumn}>
            <Image source={require('../../assets/read.png')} style={{marginRight: 4}}></Image>
          <Text>
            {data.reply_count}
          </Text>
          </View>
          <View style={styles.cloumn}>
          <Image source={require('../../assets/mess.png')} style={{marginRight: 4}}></Image>
            <Text>{data.reply_count}</Text  >
          </View>
          <View style={styles.cloumn}>
          <Image source={require('../../assets/time.png')} style={{marginRight: 4}}></Image>
          <Text>{fillterTime(data.last_reply_at)}</Text>
          </View>
        </View>
        </TouchableOpacity>
     </View>
    )
  }
  render () {
    // let { dataList } = this.props.state
    // console.log(this.props);
    
    return (
      <View style={styles.header}>
        <Nav getData={this.getData}></Nav>
       <RefreshListView
            data={this.props.dataList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell}
            refreshState={this.state.refreshState}
            // ListHeaderComponent={Nav}
            footerRefreshingText='玩命加载中 >.<'
          footerFailureText='我擦嘞，居然失败了 =.=!'
          footerNoMoreDataText='-我是有底线的-'
          footerEmptyDataText='-好像什么东西都没有-'
            // refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            // onFooterRefresh={this.onFooterRefresh}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    dataList: state.dataList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(loadData(data))
    },
    removePrev: (data) => {
      dispatch(removePrev(data))
    }
  }
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home
const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    flex: 1,
    backgroundColor: '#eee',
    // paddingBottom: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 0,
    // height: 60
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    // shadowColor: 'green',
    backgroundColor: '#fff',
    // shadowOffset: {
    //   width: 200,
    //   height: 200
    // }
    // textAlign: 'center'
  },
  list: {
    // flex: 1,
    textAlign: 'center',
    lineHeight: 60,
    // backgroundColor: '#009688',
    color: 'hsla(0,0%,100%,.7)',
    fontSize: 16
  },
  btn: {
    fontSize: 12, 
    backgroundColor: '#009688',
    padding: 2,
    color: '#fff',
    // width: 30,
    height: 20,
    lineHeight: 15,
    marginRight: 2,
    // flexDirection: 'row',
    // right: 0
    // position: 'absolute',
    // right: 0,
    // top: 10
    // borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#009688'
  },
  share: {
    position: 'absolute',
    right: 0,
    top: 6,
    flexDirection: 'row'
  },
  cloumn: {
    flex: 1, 
    flexDirection: 'row',
    // borderRightWidth 
    justifyContent: 'center',
    // alignItems: 'stretch',
    borderRightWidth: 1, 
    textAlign: 'center',
    borderStyle: 'solid',
    // borderBottomWidth: 1,
    borderRightColor: '#ccc'
  },
  active: {
    color: 'red'
  }
})