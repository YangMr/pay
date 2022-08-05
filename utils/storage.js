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
    return wx.getStorageSync(key)
  }

  /**
   * 删除本地存储的数据
   * @param {*} key 
   */
  static remove(key){
    wx.removeStorageSync()
  }

  /**
   * 清空本地存储的数据
   */
  static removeAll(){
    wx.clearStorageSync()
  }
}

export default Storage