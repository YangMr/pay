import Http from "../utils/http"

class TestModel extends Http{
  static getNav(){
    return Http.request({
      url : '/api/app/nav',
      method : 'GET',
      data : {}
    })
  }
}

export default TestModel