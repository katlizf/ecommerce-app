import {createSlice} from '@reduxjs/toolkit'

// Note: not sure how to set price initialState as product price

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 1,
        price: 0,
        totalProdPrice: 0,
        subtotal: 0
    },
    reducers: {
        increase (state, action) {
            state.quantity += 1
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