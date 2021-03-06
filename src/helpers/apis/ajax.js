import axios from 'axios'
import qs from 'qs'
import { $util } from '../index'

function requestHandle(params) {
  if (params.method === 'post') {
    params.data = qs.stringify(params.data)
  }
  console.log(`------request ${params.url} start------\n`)
  console.log(params.data)
  return new Promise(function(resolve, reject){
    axios(params).then(res => {
      console.log(`------response ${params.url} start------\n`)
      console.log(res.data)
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  post: function(url, params, op) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'x-www-form-urlencoded'
      }
    })
  },
  get: function(url, params, op) {
    return requestHandle({
      method: 'get',
      url: $util.queryString(url, params)
    })
  }
}
