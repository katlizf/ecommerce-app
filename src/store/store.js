import {configureStore, combineReducers} from '@reduxjs/toolkit'
import cartSlice from './cart-reducer'


const rootReducer = combineReducers({
    cart: cartSlice,
    
})

const store = configureStore({
    reducer: {cart: cartSlice}
})

export default store

// const rootReducer = ({cart: cartReducer})

