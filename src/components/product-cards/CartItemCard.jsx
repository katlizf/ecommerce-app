import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {increase, decrease} from '../../store/cart-reducer'
import swal from 'sweetalert'


function CartItemCard({data, updateSubtotal, loggedInUser}) {

    const [quantity, setQuantity] = useState(1)

    // const dispatch = useDispatch()
    // const quantity = useSelector(state => state.cart)
    // const totalProdPrice = useSelector(state => state.cart)

    // const increaseHandler = () => {
    //     dispatch(increase({data}))
    // }
    // const decreaseHandler = () => {
    //     dispatch(decrease({data}))
    // }
    // NOTE: need to set product price as initialState in reducer; using increaseHandler and decreaseHandler below instead

    const refreshPage = () => {
        window.location.reload()
    }

    const deleteProduct = (cartItem) => {
        let id = cartItem.cart_item_id
        let custId = loggedInUser
        axios.delete(`/deleteProduct/${custId}/${id}`).then(res => res.data)
        refreshPage()
        // swal('Removed', {buttons:false, timer:3000})
    }

    let totalProdPrice = data.price * +quantity

    const increaseHandler = () => {
        setQuantity(quantity + 1)
        updateSubtotal(data.price)
    }
    const decreaseHandler = () => {
        setQuantity(quantity - 1)
        updateSubtotal(-data.price)
    }
    // need to add functionality so when quantity is 0 the product is deleted from the cart

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row justify-between pl-8 pt-6 border-b border-grey'>
                <img
                    className='h-44 w-44 mb-6'
                    src={data.image}
                    alt={data.product_name} />
                <div className='flex flex-col pt-9 pl-7 pr-9'>
                    <p className='pb-4'>{data.product_name}</p>
                    <div className='flex flex-row pr-36 space-x-3'>
                        <p>{data.price}</p>
                        <button onClick={() => decreaseHandler()}>-</button>
                        <p>{quantity}</p>
                        <button onClick={() => increaseHandler()}>+</button>
                        <button className='bg-light-grey w-20 hover:text-red' onClick={() => deleteProduct(data)}>Remove</button>
                    </div>
                </div>
                <div className='flex justify-end pt-6'>
                    <p>{totalProdPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard