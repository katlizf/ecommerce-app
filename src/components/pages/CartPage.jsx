import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import CartItemCard from '../product-cards/CartItemCard'
import Checkout from '../../modals/Checkout'
import CartBanner from '../banners/CartBanner'


function CartPage() {

    const [cartItem, setCartItem] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    // const subtotal = useSelector(state => state.cart)    

    const updateSubtotal = price => {
        setSubtotal(subtotal + (+price))
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCartProducts`).then(res => setCartItem(res.data))
    }, [])

    useEffect(() => {
        let initialPrice = cartItem.reduce((acc, item) => {
            return acc + (+item.price)
        }, 0)
        setSubtotal(initialPrice)
    }, [cartItem])

    return (
        <div>
            {/* <CartBanner /> */}
        <div className='flex justify-center'>
            <div className='flex flex-col'>
                <h1 className='mt-20 mb-10 text-3xl'>Shopping Cart</h1>
                <div className='flex flex-col justify-center items-center'>
                    {cartItem.map(data => <CartItemCard data={data} updateSubtotal={updateSubtotal} />)}
                </div>
                <div>
                    <div className='flex flex-row'>
                        <p>Subtotal:</p>
                        <p>{subtotal.toFixed(2)}</p>
                    </div>
                    <Checkout subtotal={subtotal} />
                </div>
            </div>
        </div>
        </div>
    )
}

export default CartPage