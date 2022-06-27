import React from 'react'
import {useDispatch, connect} from 'react-redux'
import {cartActions} from '../../store/cart-reducer'


function CartItemCard({data, quantity, totalPrice, cartTotal}) {

    const dispatch = useDispatch()



    const increaseHandler = () => {
        dispatch(cartActions.increase)
    }

    const decreaseHandler = () => {
        dispatch(cartActions.decrease)
    }

    console.log(data)

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
                        <p>
                            {/* <p onClick={() => decreaseHandler()}>-</p>
                            {quantity}
                            <p onClick={() => increaseHandler()}>+</p> */}
                        </p>
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