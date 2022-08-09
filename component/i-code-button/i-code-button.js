// component/i-code-button/i-code-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status :Boolean,
    count : {
      type : Number,
      value : 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 开启扫码
     */
    handleScanCode(){
      console.log(this.data.count)
      if(this.data.status){
        this.triggerEvent("getResult")
        return
      }
      wx.scanCode({
        onlyFromCamera: true,
        success : (res)=>{
          this.triggerEvent("getResult", res.result)
        },
        fail : (err)=>{
          console.log("取消扫码")
        }
      })
    }
  }
})
