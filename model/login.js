import Http from "../utils/http"

class loginModel extends Http{
  /**
   * 登录接口/ 获取openid接口
   */
  static login(code){
    return Http.request({
      url : '/weixinpay/login',
      method : 'GET',
      data : {
        code 
      },
      name : 'api2'
    })
  }

  
}

export default loginModel