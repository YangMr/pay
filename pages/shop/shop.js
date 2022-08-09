// pages/shop/shop.js
import ShopModel from "../../model/shop"
import {navigateTo} from "../../utils/navigate"
import {addCart} from "../../common/cart"
import Storage from "../../utils/storage"
Page({
  /**
   * 调用轮播图接口方法
   */
  async getBanner(){
    const response = await ShopModel.getShopBanner()
    this.setData({
      bannerData : response.data
    })
  },

  // 获取商品信息
  async getShopCode(event){
    if(this.data.status){
      navigateTo("/pages/order/order")
    }

    // 获取商品的条形码
    const qcode = event.detail

    // 如果商品条形码不存在,则不继续往下执行
    if(!qcode) return 

    try{
      // 获取商品信息
      const response = await ShopModel.getShopingInfo(qcode)
      // 如果商品信息获取失败,则不继续往下执行
      if(!response.success) return

      // 获取商品信息
      const result = response.result

      // 获取商品的数据小于等于0 , 说明没有当前条形码的商品数据,则不继续往下执行
      if(result.length <= 0) return

      // 将商品添加本地
      addCart(result[0])

      // 跳转到购物车页面
      navigateTo("/pages/cart/cart")
    }catch(err){
      console.log(err)
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    bannerData : [],
    cartList : [],
    status : false,
    count : 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBanner()
    // this.getCartList()
  },

  /**
   * 初始化获取商品数据
   */
  getCartList(){
    const cartList = Storage.get("carts")
    const  status = cartList.length > 0 ? true : false
    const count = cartList.length
    console.log(' cartList.length', cartList.length)
    this.setData({
      cartList,
      status,
      count
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})