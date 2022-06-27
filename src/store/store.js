import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cart-reducer'


const store = configureStore(cartSlice)

export default store

// const rootReducer = ({cart: cartReducer})

