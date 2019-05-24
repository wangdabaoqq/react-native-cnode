// export default {
const all = 'https://cnodejs.org/api/v1/topics'
const alldetail = 'https://cnodejs.org/api/v1/topic'
const access = `https://cnodejs.org/api/v1/accesstoken`
const userinfo = `https://cnodejs.org/api/v1/user/`
// }
import axios from 'axios'

export function getALl (params) {
  // console.log(url);
  
  // }
  // console.log(url);
  // url = getUrl(params, url)
  return axios({
    url: all,
    method: 'get',
    params
    // body: JSON.stringify(params)
  })
}
export function getDetail (id) {
  
    return axios({
      url: `${alldetail}/${id}`,
      method: 'get'
      // params
    })
  }

  export function getAccess (accesstoken) {
    return axios({
      url:access,
      method: 'post',
      data: {
        accesstoken
      }
    })
  }
  export function getUsers (user) {
    return axios({
      url: `${userinfo}${user}`,
      method: 'get'
    })
  }
  export function getUrl (params, url) {
    if (params) {
      let paramsArray = [];
            //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    return url
  }