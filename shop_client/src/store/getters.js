/*
  相当于vue里面的计算属性
*/
export default {
  totalCount(state){
    return state.shopCart.reduce((prevT,food) => prevT + food.count , 0)
  },
  totalPrice(state){
    return state.shopCart.reduce((prevT,food) => prevT + food.count * food.price , 0)
  },
  positive(state){
    return state.ratings.reduce((prevT,rating) => prevT + (rating.rateType === 0 ? 1 : 0) , 0)
  }
}
