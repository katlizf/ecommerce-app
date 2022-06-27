import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


let price = axios.get('http://localhost:4000/api/getPrice').then(res => res.data)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 1,
        price,
        totalPrice: price,
        cartTotal: 0
    },
    reducers: {
        increase (state, action) {
            state.quantity++
            state.totalPrice = state.totalPrice + price
            state.cartTotal = state.cartTotal + price
        },
        decrease (state, action) {
            state.quantity--
            state.totalPrice = state.totalPrice - price
            state.cartTotal = state.cartTotal - price
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice

