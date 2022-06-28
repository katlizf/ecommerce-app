import React from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {increase, decrease} from '../../store/cart-reducer'


function CartItemCard({data, totalPrice, cartTotal}) {
    // console.log(increase)
    // console.log(decrease)
    const dispatch = useDispatch()
    // const getQuantity = (state) => state.quantity
    // const quantity = useSelector(getQuantity)
    const quantity = useSelector(state => state.quantity)

    const findProduct = () => {
        axios.get(`http://localhost:4000/api/findProduct`).then(res => res.data)
        // console.log(data)
    }
    let id = data.id
    let price = data.price
    console.log(id)
    console.log(price)
    console.log(quantity)

    const increaseHandler = () => {
        dispatch(increase(findProduct(id, price)))
    }
    const decreaseHandler = () => {
        dispatch(decrease(quantity, data.price))
    }

    return (
        <div className='flex flex-row w-1/2'> 
            <div className='flex flex-row justify-between pl-8 pt-6 border-b border-grey'>
                <img
                    className='h-44 w-44 mb-6'
                    src={data.image}
                    alt={data.product_name} />
                <div className='flex flex-col pt-9 pl-7'>
                    <p className='pb-4'>{data.product_name}</p>
                    <div className='flex flex-row'>
                        <p className='flex justify-end'>{data.price}</p>
                        
                            <button onClick={() => decreaseHandler()}>-</button>
                            <p>{quantity}</p>
                            <button onClick={() => increaseHandler()}>+</button>
                        
                        <button className='bg-red w-20'>Remove</button>
                    </div>
                </div>
                <div className='pt-6'>
                    <p className='flex justify-end'>{totalPrice}</p>
                </div>
                <p>{cartTotal}</p>
            </div>
        </div>
    )
}



// const mapStateToProps = (state, ownProps) => {
//     return {quantity: state.quantity, totalPrice: state.totalPrice, cartTotal: state.cartTotal}
// }
// export default connect(mapStateToProps)(CartItemCard)

export default CartItemCard