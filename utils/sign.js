const md5 = require("./md5")
const sign = (json) =>{
  console.log("json", json)
  let arr = []

  for(let key in json){
    arr.push(key)
  }

  arr.sort()
  console.log(arr)

  let str = ""
  for(let i =0; i<arr.length; i++){
    str += arr[i] + json[arr[i]]
  }

  return md5(str)
}

export default sign