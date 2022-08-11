// pages/order/order.js
import Storage from "../../utils/storage"
import {navigateTo} from "../../utils/navigate"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts : [],
    initCarts : [],
    resultCarts : [],
    len : 0 ,
    totalPrice : 0,
    balance : 4,
    flag : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getResultShop()
  },

  // 获取本地的所有要结算的商品
  getResultShop(){
    const carts = Storage.get("carts")
    const initCarts = JSON.parse(JSON.stringify(carts))
    initCarts.length = 1
    this.setData({
      carts : initCarts,
      initCarts,
      len : carts.length,
      resultCarts : carts
    })
    this.handleComputedPrice()
  },

  // 展开或者手气商品数据
  handleToggleShop(){
    console.log("!")
    if(this.data.carts.length === this.data.len){
      console.log(this.data.initCarts)
      console.log("2")
      this.setData({
        carts : this.data.initCarts
      })
    }else{
      console.log("3")
      this.setData({
        carts : this.data.resultCarts,
      })
    }
    
  },

  // 计算商品的总价
  handleComputedPrice(){
    let totalPrice = 0
    this.data.resultCarts.forEach(item=>{
      console.log(item)
      totalPrice += (item.price * item.num)
    })
    this.setData({
      totalPrice
    })
  },

  // 开启余额减扣
  handleSwitch(event){
    console.log(event)
    const value = event.detail.value
    this.setData({
      flag : value
    })
  },

  //确认支付按钮方法
  handleGoSuccess(){
    navigateTo("/pages/success/success")
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