import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CartItemCard from '../product-cards/CartItemCard'


function CartPage() {

    const [cartItem, setCartItem] = useState([])    
    const subtotal = useSelector(state => state.cart)

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCartProducts`).then(res => setCartItem(res.data))
    }, [])

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-1/2'>
                {cartItem.map(data => <CartItemCard data={data}/>)}
            </div>
            <p>{subtotal.subtotal}</p>            
        </div>
    )
}

export default CartPage