
import Mock from 'mockjs'
import data from './data.json'

// 返回给前台的数据模板要和前台处理的数据格式一致
// 获取goods的接口
Mock.mock('/goods',{code : 0 ,date : data.goods})
// 获取ratings的接口
Mock.mock('/ratings',{code : 0 ,date : data.ratings})
// 获取info的接口
Mock.mock('/info',{code : 0 ,date : data.info})

// 不需要暴露任何数据
