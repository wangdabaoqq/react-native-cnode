var moment = require('moment');
import 'moment/locale/zh-cn'
import AsyncStorage from '@react-native-community/async-storage'
export function fillterTime (time) {
  return moment(time).fromNow()
}

export function setSession (key, value) {
  AsyncStorage.setItem(key, value)
}

export function getSession (key) {
   AsyncStorage.getItem(key).then(data => {
     console.log(data)
    })
}
export function removeSession (key, fn) {
  return AsyncStorage.removeItem(key).then(error => {
    fn()
  })
}