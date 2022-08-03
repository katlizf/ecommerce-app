import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import CartItemCard from '../product-cards/CartItemCard'
import Checkout from '../../modals/Checkout'


function CartPage({loggedInUser}) {

    const [cartItem, setCartItem] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    // const subtotal = useSelector(state => state.cart)    

    const updateSubtotal = price => {
        setSubtotal(subtotal + (+price))
    }

    useEffect(() => {
        let custId = loggedInUser
        axios.get(`/getCartProducts/${custId}`).then(res => setCartItem(res.data))
    }, [])

    useEffect(() => {
        let initialPrice = cartItem.reduce((acc, item) => {
            return acc + (+item.price)
        }, 0)
        setSubtotal(initialPrice)
    }, [cartItem])

    return (
        <div className='flex justify-center min-h-screen'>
            <div className='flex flex-col'>
                <h1 className='mt-20 mb-10 text-3xl sm:text-2xl'>Shopping Cart</h1>
                <div className='flex flex-col justify-center items-center md:w-40 sm:w-20'>
                    {cartItem.map(data => <CartItemCard key={data.id} data={data} updateSubtotal={updateSubtotal} loggedInUser={loggedInUser} />)}
                </div>
                <div className='flex justify-end pt-5 pb-5'>
                    <div className='flex flex-row'>
                        <p className='pr-4'>Subtotal:</p>
                        <p>{subtotal.toFixed(2)}</p>
                    </div>
                </div>                
                <Checkout subtotal={subtotal} loggedInUser={loggedInUser} />
            </div>
        </div>
    )
}

export default CartPage