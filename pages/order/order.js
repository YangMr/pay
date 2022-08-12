// pages/order/order.js
import Storage from "../../utils/storage"
import orderModel from "../../model/order"
import {navigateTo} from "../../utils/navigate"
import sign from "../../utils/sign"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts : [],
    initCarts : [],
    resultCarts : [],
    len : 0 ,
    // 商品金额
    totalPrice : 0,
    // 余额
    balance : 4,
    // 实际支付金额
    currentPrice : 0,
    // 余额减扣的金额
    currentBalance : 0,
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
    let totalNum = 0
    this.data.resultCarts.forEach(item=>{
      totalNum += item.num
      totalPrice += (item.price * item.num)
    })
    this.setData({
      totalPrice,
      totalNum,
      currentPrice : totalPrice
    })
   
  },

  // 开启余额减扣
  handleSwitch(event){
    const value = event.detail.value
    // 商品金额
    const totalPrice = this.data.totalPrice
    // 余额
    const balance = this.data.balance

    if(value){
      if(totalPrice >= balance){
        let price = this.data.totalPrice - this.data.balance
        this.setData({
          currentPrice : price,
          currentBalance : this.data.balance
        })
      }else{
        console.log("aaa")
        let price =this.data.balance - this.data.totalPrice 
        this.setData({
          balance : price,
          currentPrice : 0,
          currentBalance : this.data.totalPrice
        })
      }
    }else{
      console.log("123")
      this.handleComputedPrice()
      this.setData({
        balance : 4
      })
    }
    this.setData({
      flag : value
    })
  },

  //确认支付按钮方法
  handleGoSuccess(){
    // 调用统一下单方法
    this.handleDoOrder()
  },

  // 统一下单方法
  async handleDoOrder(){
    const userInfo = Storage.get("userInfo")

    // 获取签名/ 获取加密之后的字符串
    const str = sign({
      openid: userInfo.openid,
      uid : userInfo._id,
      salt : userInfo.salt
    })

    // 在这个方法里面要调用统一下单接口
    const data = {
      openid : userInfo.openid,
      uid : userInfo._id,
      sign : str, // 就是一段加密的字符串
      total_price : this.data.totalPrice,
      total_num : this.data.totalNum,
      derate_price : this.data.currentBalance,
      real_price : this.data.currentPrice,
      order : JSON.stringify(this.data.resultCarts)
    }
    const response = await orderModel.order(data)
    console.log("response",response)

    this.handlePayRequest(response)
  },

  // 发起支付方法
  handlePayRequest(params){
    const data = JSON.parse(params.result)
    console.log("params",JSON.parse(params.result))
    wx.requestPayment({
      nonceStr: data.nonceStr,
      package: data.package,
      paySign: data.paySign,
      timeStamp: data.timeStamp,
      signType : 'MD5',
      success : res=>{
        console.log("1")
        navigateTo("/pages/success/success")
        Storage.remove("carts")
      },
      fail : err=>{
        console.log("2")
        console.log(err)
      }
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