import jsonp from './jsonp'
import axios from 'axios'

export function getHotData (api, otherdata, str = 'movie'){
  const url = 'https://api.douban.com/v2/'+ str + api
  const data = Object.assign({}, {
    apikey: '0b2bdeda43b5688921839c8ecb20399b',
    ...otherdata
  })
  return jsonp(url, data, option)
}

export function getHotData2 (url, otherdata, str = 'movie'){
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get',
      params: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        ...otherdata
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const option = {
  param: 'callback'
}

export function getZhihu (api, otherdata){
  const url = 'https://news-at.zhihu.com/api/4' + api
  const data = Object.assign({}, {
    ...otherdata
  })
  return jsonp(url, data)
}
