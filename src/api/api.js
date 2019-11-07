import axios from 'axios'
import qs from 'qs'

// let baseURL = 'https://api.douban.com/v2/movie' // 测试接口地址
let baseURL = 'https://douban.uieee.com/v2/movie' // 测试接口地址

let ax = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})


export default {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      ax({
        url,
        method: 'get',
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
