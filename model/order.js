import Http from "../utils/http"

class orderModel extends Http{
  /**
   * 下单接口
   */
  static order(data){
    return Http.request({
      url : '/weixinpay/doOrder',
      method : 'POST',
      data,
      name : 'api2'
    })
  }

  
}

export default orderModel