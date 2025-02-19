import mockjs from 'mockjs'

const mock = {
  // 模拟获取订单数据
  // type: 订单类型。0 为普通订单，1 为秒杀订单
  getOrder(type){
    let array = [];
    for (let i = 0; i < mockjs.Random.integer(5, 10); i++){
      array.push(mockjs.mock({
        'name': type === 0 ? '普通商品' : '秒杀商品' + i,
        'prcie': mockjs.Random.cname(),
        'buyer': mockjs.Random.datetime('yyyy-MM-dd HH:MM:SS'),
        'time': mockjs.Random.boolean(),
        'state':mockjs.Random.boolean(),
        'payType':mockjs.Random.boolean(),
        'source':mockjs.Random.url(),
        'phone':mockjs.mock(/\d{11}/)
      }))
    }
    return array
  },
  // 模拟获取商品数据
  getGoods(type) {
    let array = []
    for (let i = 0; i < mockjs.Random.integer(5, 10); i++){
      array.push(mockjs.mock({
        'name': type == 0 ? '普通商品' : '秒杀商品' + i ? '秒杀商品' : '今日推荐' + i,
        'img': mockjs.Random.dataImage('60x100', '商品示例图'),
        'prcie': mockjs.Random.integer(20, 500) + '元',
        'sellCount': mockjs.Random.integer(10, 100),
        'count': mockjs.Random.integer(10, 100),
        'back': mockjs.Random.integer(10, 100),
        'backPrcie': mockjs.Random.integer(0, 5000) + '元',
        'owner': mockjs.Random.cname(),
        'time':mockjs.Random.datetime('yyyy-MM-dd HH:MM:SS'),
        'state':mockjs.Random.boolean(),
      }))
    }
    return array
  },
  // 模拟店长列表数据
  getManagerList() {
    let array = []
    for(let i = 0; i < mockjs.Random.integer(5, 10); i++) {
      array.push(mockjs.mock({
        'people': mockjs.Random.cname(),
        'weixin': mockjs.Random.string(7, 10),
        'state': mockjs.Random.boolean(),
        'income': mockjs.Random.integer(10000, 500000000) + '元',
        'back': mockjs.Random.integer(0, 1000) + '元',
        'backPrice': mockjs.Random.integer(0, 5000) + '元',
        'source': '站内',
        'customer': mockjs.Random.integer(0, 50),
        'time': mockjs.Random.datetime('yyyy-MM-dd HH:MM:SS')
      }))
    }
    return array 
  },
  getChartsData() {
        let array = [];
        for (let i = 0; i < 6; i ++) {
            array.push(mockjs.Random.integer(0,100))
        }
        return array;
  },
  getTradeData() {
    return mockjs.mock({
      'allTra':mockjs.Random.integer(10000,50000),
      'speTra':mockjs.Random.integer(0,5000),
      'norTra':mockjs.Random.integer(0,5000),
      'userCount':mockjs.Random.integer(0,1000),
      'managerCount':mockjs.Random.integer(0,100),
      'time':mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    })
  }
}
export default mock