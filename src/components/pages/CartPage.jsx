import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CartItemCard from '../product-cards/CartItemCard'
import Checkout from '../../modals/Checkout'


function CartPage() {

    const [cartItem, setCartItem] = useState([])    
    // const subtotal = useSelector(state => state.cart)

    const [subtotal, setSubtotal] = useState(0)

    const updateSubtotal = price => {
        setSubtotal(subtotal + (+price))
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCartProducts`).then(res => setCartItem(res.data))
    }, [])

    useEffect(() => {
        let initialPrice = cartItem.reduce((acc, item)=>{
            return acc + (+item.price)
        }, 0)
        setSubtotal(initialPrice)
    }, [cartItem])

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-1/2'>
                {cartItem.map(data => <CartItemCard data={data} updateSubtotal={updateSubtotal}/>)}
            </div>
            <p>{subtotal.toFixed(2)}</p>            
            <Checkout subtotal={subtotal}/>
        </div>
    )
}

export default CartPage