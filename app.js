// app.js
import loginModel from "./model/login"
import Storage from "./utils/storage"
App({
  /**
   * 小程序启动会触发的方法
   */
  async onLaunch(){
    const code = await this.getCode()

    const response = await loginModel.login(code)
    
    Storage.setUserInfo(response.userinfo)
  },

  /**
   * 获取小程序的code吗
   */
  getCode(){
    return new Promise((resolve,reject)=>{
      wx.login({
        success : (res)=>{
          resolve(res.code)
        },
        fail : (err)=>{
          reject(err)
        }
      })
    })
  }
})

/**
 * 实现支付第一步:
  * 1. 当小程序启动的时候,调用wx.login获取小程序的code码
  * 2. 获取到小程序的code码之后,调用获取openid接口,获取到openid
  * 3. 将获取到的openid以及其他信息保存到本地 
  *
  *实现支付第二步: 
    1.  当点击确认支付按钮时调用统一下单接口,将对应的参数发送给后台,其中有一个签名非常重要,使用的md5进行的加密
    2.  当统一下单接口调用成功之后,后台会给我们返回支付所需要的相关信息
    3. 获取到支付相关的信息之后,调用封装的微信支付方法,拉起支付,把对应支付信息传进去就能够完成支付功能
 * 
 */