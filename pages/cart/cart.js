// pages/cart/cart.js
import Storage from "../../utils/storage"
import ShopModel from "../../model/shop"
import {addCart} from "../../common/cart"
import {navigateTo} from "../../utils/navigate"
Page({

  // 跳转到订单页面
  handleGoOrder(){
    navigateTo("/pages/order/order")
  },

  /**
   * 商品数量增加方法 
   */
  handleIncrement(event){
    this.handleComputedCount(event,'increment')
    this.handleComputedPrice()
  },

   /**
   * 商品数量减少方法 
   */
  handleDecrement(event){
    this.handleComputedCount(event,'decrement')
    this.handleComputedPrice()
  },

  /**
   * 进行商品的加减计算
   */
  handleComputedCount(event, action){
    const _index = event.currentTarget.dataset.index
   
    action === 'increment' ? this.data.cartList[_index].num += 1 : this.data.cartList[_index].num -= 1

    if(this.data.cartList[_index].num <= 0){
      this.data.cartList[_index].num = 1
      this.handleModalAction(_index)
      return
    }
    

    this.setData({
      cartList : this.data.cartList
    })
    Storage.set("carts", this.data.cartList)
  },

  /**
   * 当商品数量少于1的时候的处理方法
   */
  handleModalAction(index){
    wx.showModal({
      title: '提示',
      content: '您确定要删除此商品吗?',
      success :(res) =>{
        if (res.confirm) {
          this.data.cartList.splice(index,1)
          this.setData({
            cartList : this.data.cartList
          })
          Storage.set("carts", this.data.cartList)
          this.handleComputedPrice()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
  },

  /**
   * 计算总价的方法
   */
  handleComputedPrice(){
    let totalPrice = 0
    this.data.cartList.forEach(item=>{
      const total = (item.num * item.price).toFixed(2)
      totalPrice += Number.parseFloat(total)
    })
    this.setData({
      totalPrice
    })
  },


  /**
   * 继续添加商品
   */
  handleAdd(){
    wx.scanCode({
      onlyFromCamera: true,
      success : (res)=>{
        const event = {
          detail : res.result
        }
        this.getShopCode(event)
      }
    })
  },

  async getShopCode(event){
    // 获取商品的条形码
    const qcode = event.detail
    console.log('qcode', qcode)

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

      this.getCartList()

    }catch(err){
      console.log(err)
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    cartList : [],
    totalPrice : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
  },

  /**
   * 获取本地存储的购物车数据
   */
  getCartList(){
    const cartList = Storage.get("carts")
    if(cartList.length < 0) return
    this.setData({
      cartList
    })
    this.handleComputedPrice()
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