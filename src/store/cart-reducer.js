import {createSlice} from '@reduxjs/toolkit'


let price = 0

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 1,
        totalProdPrice: 0,
        subtotal: 0
    },
    reducers: {
        increase (state, action) {
            state.quantity += 1
            state.totalProdPrice += price
            state.totalProdPrice = state.quantity * +action.payload.data.price
            state.subtotal = state.subtotal + +action.payload.data.price
        },
        decrease (state, action) {
            console.log(action.payload.data.price)
            state.quantity -= 1
            state.totalProdPrice = state.quantity * +action.payload.data.price
            state.subtotal = state.subtotal - +action.payload.data.price
        }
    }
})

export const {increase, decrease} = cartSlice.actions
export default cartSlice.reducer