// export default {
const all = 'https://cnodejs.org/api/v1/topics'
const alldetail = 'https://cnodejs.org/api/v1/topic'
// }
import axios from 'axios'

export function getALl (params) {
  // console.log(url);
  
  // }
  // console.log(url);
  // url = getUrl(params, url)
  return axios(all, {
    methods: 'get',
    params
    // body: JSON.stringify(params)
  })
}
export function getDetail (id) {
  
    return axios({
      url: `${alldetail}/${id}`,
      methods: 'get'
      // params
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