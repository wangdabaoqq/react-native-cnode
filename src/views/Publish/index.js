import React, { Component } from 'react'
// import { getALl } from '../../config/api'
// import axios from 'axios'
import {Platform, StyleSheet, ScrollView, TouchableOpacity, Text, View, TextInput, Image, Button } from 'react-native';
// let { width } = Dimensions.get("window");
import RNPickerSelect from 'react-native-picker-select';
console.log(Platform.OS);

// console.log(width);
export default class Publish extends Component {
  constructor () {
    super()
    this.state = {
      numbers: [
        {
            label: '1',
            value: 1,
            color: 'orange',
        },
        {
            label: '2',
            value: 2,
            color: 'green',
        },
    ],
    favSport0: undefined,
    favSport1: undefined,
    favSport2: undefined,
    favSport3: undefined,
    favSport4: 'baseball',
    text: '',
    favNumber: undefined,
};
    
this.inputRefs = {
  firstTextInput: null,
  favSport0: null,
  favSport1: null,
  lastTextInput: null,
};
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '发布话题'
  })
  render () {
    const placeholder = {}

    const sports = [
      {
          label: '分享',
          value: 'share',
      },
      {
          label: '问答',
          value: 'ask',
      },
      {
          label: '招聘',
          value: 'job',
      },
      {
        label: '测试',
        value: 'dev',
    },
    ]
    return (
        <ScrollView style={styles.contain}>
          {/* <View style={{flexDirection: 'column', flex: 1}}> */}
          <Text>选择板块</Text>
          <RNPickerSelect
                    placeholder={placeholder}
                    items={sports}
                    doneText="cancel"
                    onValueChange={(value) => {
                        this.setState({
                          favSport0: value,
                        });
                    }}
                    style={ pickerSelectStyles}
                    value={this.state.favSport0}
                    ref={(el) => {
                        this.inputRefs.favSport0 = el;
                    }}
                />
        <View style={{marginTop: 10}}>
        <Text>标题</Text>
        <TextInput
        style={{ 
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: '#rgba(0,0,0,.12)'}}
        editable = {true}
        maxLength = {40}
        placeholder="标题字数为10位以上"
        onChangeText={(text) => this.setState({text})}
        value={this.state.text} />
        {/* </View> */}
        </View>
        <View style={{marginTop: 10,  backgroundColor: '#rgba(0,0,0,.1)',}}>
          <TextInput
          placeholder="输入内容"
          value={this.state.text}
          maxLength = {40}
          onChangeText={(text) => this.setState({text})}
          style={{
            height: 200,
            paddingHorizontal: 10,
            fontSize: 16,
            color: '#rgba(0,0,0,.38)',
            textAlignVertical: 'top'}}
          multiline={true}></TextInput>
        </View>
        <View style={{marginTop: 10}}>
          <TouchableOpacity style={{backgroundColor: '#009688', borderRadius: 4}}>
          {/* <Image source={require('../../assets/time.png')}></Image> */}
          <Button
          title="发布话题"
          color="#fff"
           />
           </TouchableOpacity>
        </View>
        </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  contain: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'stretch',
    padding: 10,
    // paddingVertical: 40,
    // paddingHorizontal: 10,
    flex: 1,
    // marginBottom: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // shadowColor: 'green',
    // backgroundColor: '#fff',
    // shadowOffset: {
    //   width: 200,
    //   height: 200
    // }
    // textAlign: 'center'
  },
  pick: {
    // position: 'absolute',
    // top: 20,
    // height: 30,
    // flex: 1,
    height: 200, 
    // flexDirection: 'column'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 14,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      borderColor: '#rgba(0,0,0,.12)',
      marginTop: 10,
      
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      marginTop: 10,      
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'red',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
});