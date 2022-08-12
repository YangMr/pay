import {field} from "../config/config"
class Storage {
  /**
   * 设置本地存储的数据
   * @param {*} key 
   * @param {*} value 
   */
  static set(key,value){
    wx.setStorageSync(key, value)
  }

  /**
   * 获取本地存储的数据
   * @param {*} key 
   */
  static get(key){
    return wx.getStorageSync(key) || ""
  }

  /**
   * 删除本地存储的数据
   * @param {*} key 
   */
  static remove(key){
    wx.removeStorageSync(key)
  }

  /**
   * 清空本地存储的数据
   */
  static removeAll(){
    wx.clearStorageSync()
  }

  /**
   * 存储token
   */
  static setToken(token){
    wx.setStorageSync(field.loginCredentials, token)
  }

 /**
  * 存储用户信息
  */
 static setUserInfo(userInfo){
   wx.setStorageSync(field.userInfoKey, userInfo)
 }
}

export default Storage