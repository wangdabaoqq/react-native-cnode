import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, 
  Dimensions, StyleSheet, InteractionManager, Image } from 'react-native';
// import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';
import { getDetail } from '../../config/api'
import { fillterTime } from '../../utils'
import { connect } from 'react-redux'
 class Detail extends Component {
  constructor (props) {
    // console.log(props);
    super(props)
    this.state = {
      dataList: [],
      isLoaded: false,
      // params: {
      //   id: '',
      //   accesstoken: '3f24a7d9-bfdb-452c-9a03-5594698797b7'
      // },
      tagsStyles: {
        a: {
          color: '#009688'
        },
        p: {
          fontSize: 14,
          margin: 8
        },
        pre: {
          flexDirection: 'column',
          flex: 1
        },
        code: {
          // flex: 1,
          // flexDirection: 'column'
        },
        ul: {
          // listStyle: 'none'
        },
        pre: {
          
        }
        // ul
      },
      renderers: {
        h2: (htmlAttribs, children, convertedCSSStyles, passProps) => {          
          return (
            <View style={styles.h2} key={passProps.key}>
              <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>{passProps.rawChildren[0].data}</Text>
            </View>
          )
        }
        // pre: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        //   console.log(passProps);
        //   return (
        //     // <View style={styles.h2} key={passProps.key}>
        //       <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}} key={passProps.key}>{passProps.rawChildren[0].data}</Text>
        //     // </View>
        //   )
        // },
      }
    }
    // this.allDetail(props)
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.data.title
  })
  // fillterTime = (time) => {
  //   return moment(time).fromNow()
  // }
  componentDidMount() {
    this.allDetail()
    console.log(11111, '测试');
    
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({ title: '加载中' })
      // this.setState({ source: { uri: this.props.navigation.state.params.url } })
    })
  }
  isLogin = () => {
    let { login, navigation } = this.props
    if (login === '') {
      navigation.navigate('Mine')
    }
    // console.log(this.props.lohi);
  }
  giveTop = () => {
    
  }
  allDetail (props) {
    let id = this.props.navigation.state.params.data.id
    getDetail(id).then((res) => {
      // res.json().then((data) => { 
      let datas = res.data.data
      // console.log(data);
      
      this.setState({
        dataList: datas,
        isLoaded: true
      })
      // console.log(this.state.dataList);
      })
    // }) 
  }
  render () {
    // console.log(this.state.isLoaded);
    // if (this.state.isLoaded) {
      let data = this.state.dataList
      console.log(this.props);
      
      // console.log(this.state.dataList);
      // console.log(data, data.replies); 
      return (
        data && data.replies ? 
        <View style={{flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',}}>  
          <ScrollView style={{padding: 6}}>
          <HTML renderers={this.state.renderers} html={data.content} tagsStyles={this.state.tagsStyles} classesStyles={this.state.classesStyles}  imagesMaxWidth={Dimensions.get('window').width} />
          {/* { data && data.replies ?  */}
            <View style={{borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: '#ccc', borderBottomColor: '#ccc', paddingVertical: 10}}>
              <Text style={{color: '#009688',  fontSize: 18}}>评论({data.replies.length})</Text> 
              </View>
          {/* : null } */}
          {
             data.replies.map((ele, index) => 
              <View key={index} style={{ paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
              <View style={{flex: 1, flexDirection: 'row',}}>
                <Image
                defaultSource={require('../../assets/tabbar_merchant.png')}  
                source={{uri: ele.author.avatar_url}}
                style={{width: 32, height: 32, borderRadius: 16}}
                ></Image>
                <View style={{flex: 1, flexDirection: 'column',  paddingLeft: 4,}}>
                  <Text>
                    {ele.author.loginname}
                  </Text>
                  <Text>
                    {index + 1}楼 {fillterTime(ele.create_at)}
                  </Text>
                </View>
                </View>
                <View style={styles.share}>
                  <TouchableOpacity onPress={this.isLogin}>
                    <Text style={{color: '#009688'}}>回复</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.giveTop}>
                      <Text>
                        🖤
                        {ele.ups.length}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column',}}>
                    <HTML renderers={this.state.renderers} html={ele.content} tagsStyles={this.state.tagsStyles} classesStyles={this.state.classesStyles}  imagesMaxWidth={Dimensions.get('window').width} />                  
                  </View>
                </View>
            )
          }
          </ScrollView>
        </View>
        : null
        // </View>
      )
    // }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  
  return {
    dataList: state.dataList,
    login: state.login
  }
}
export default connect(
  mapStateToProps
)(Detail)
const styles = StyleSheet.create({
  h2: {
  //  backgroundColor: 'red',
  borderBottomColor: '#eee',
   borderBottomWidth: 1,
   height: 40,
   lineHeight: 40,
   padding: 10,
   
  //  fontSize: 40
  //  margin: 10
  //  border
  },
  share: {
    position: 'absolute',
    right: 0,
    top: 6,
    flexDirection: 'row'
  },
  // code: {
  //   backgroundColor: 'red'
  // },
  // p: {
  //   backgroundColor: 'red'
  //  }
})
