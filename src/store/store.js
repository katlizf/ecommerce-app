import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cart-reducer'


const store = configureStore({
    reducer: {cart: cartSlice}
})

export default store

// const rootReducer = ({cart: cartReducer})

