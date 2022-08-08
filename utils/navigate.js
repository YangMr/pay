import {pathWhiteList, field} from "../config/config"

/**
 * 不需要权限的跳转
 */
export const navigateTo = (url) =>{
  wx.navigateTo({
    url
  })
}

 /**
  * 需要登录之后才可以跳转
  */

export const navigateAuthTo = (url) => {

  const path = pathWhiteList.includes(url)
  if(path){
    wx.navigateTo({
      url,
    })
    return
  }

  const token = wx.getStorageSync(field.loginCredentials)

  if(token){
    wx.navigateTo({
      url,
    })
    return
  }

  wx.navigateTo({
    url: '/pages/login/login',
  })


}

