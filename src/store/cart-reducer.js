import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


let price = 10

// let price = axios.get('http://localhost:4000/api/getPrice').then(res => res.data)
console.log(price)
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 1,
        price,
        totalPrice: price,
        cartTotal: 0
    },
    reducers: {
        increase (state, action, price) {
            
            console.log('increase')
            state.quantity += 1
            state.totalPrice += state.totalPrice
            // state.cartTotal = state.cartTotal + price
            console.log(state.totalPrice)
        },
        decrease (state, action, price) {
            console.log('decrease')
            state.quantity -= 1
            state.totalPrice = state.totalPrice - price
            state.cartTotal = state.cartTotal - price
            
        }
    }
})

export const {increase, decrease} = cartSlice.actions
export default cartSlice.reducer

console.log(increase(1))