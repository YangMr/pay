
import Storage from "../utils/storage"

/**
 * 将商品的数据添加到本地
 * @param {*} data 
 */
const addCart = (data) => {
  const carsArray = []
  if(!hasLocalData()){
    data.num = 1
    carsArray.push(data)
    Storage.set("carts", carsArray)
  }else{
    const localData = Storage.get("carts")
    if(hasShopData(data,localData)){
      localData.forEach(item=>{
        if(item._id === data._id){
          item.num += 1
        }
      })
    }else{
      data.num = 1
      localData.push(data)
    }
    Storage.set("carts", localData)
  }
}

/**
 * 检测本地有没有存储商品的数据 (检测是否是第一次存储)
 */
const hasLocalData = () => {
  const carts = Storage.get('carts')
  const status = carts ? true : false
  return status
}

/**
 * 判断当前要添加的商品是否在本地存在
 */
const hasShopData = (data, localData) => {
  const _data = localData.filter(item=>{
   return item._id === data._id
  })
  return _data.length > 0 ? true : false
}

export {addCart}


 /**
   * 
   * 第一次存 (没有)
   *  直接存储
   * 
   * 非第一次存 (有)
   *  判断本地有没有本次要添加的商品
   *    有 
   *      商品的数量 + 1
   *    没有
   *      在本地数据的基础之上在添加一条数据
   */