/*
  封装ajax请求模块
*/

/*
  函数需要三个参数
    第一个参数：请求的url
    第二个参数 ：请求的数据
    第三个参数：请求的类型

    ajax请求返回的是一个promise对象 再请求成功之后需要调用response。data
    来访问服务器返回的数据 所以在这里再封装一层promise 让调用函数的之后返回的结果直接是
    data 而不需要的再调用response

*/
import axios from 'axios'
export default function ajax(url = '',data={},type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
  //  判断请求的类型
    if(type === 'GET'){
    //  准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      //判断拼接后的url是否为空
      if(dataStr !== ''){
        //url拼接之后在url最后面的一组数据后面带着&符号导致url不合法
        // 使用substring切割字符串 使用lastIndexOf将最后一个&去掉
        dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
        url = url + "?" + dataStr
      }
    // 发送GET请求
      promise = axios.get(url)
    } else {
    //  发送POST请求
      promise = axios.post(url,data)
    }
    promise.then(response => {
      // 请求将服务器返回的数据返回
      resolve(response.data)
    })
      .catch(error => {
        // 请求失败 返回错误信息
        reject(error)
      })
  })
}

