import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {increase, decrease} from '../../store/cart-reducer'


function CartItemCard({data}) {

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

    const refreshPage = ()=>{
        window.location.reload();
     }

    const getPrice = () => {
        axios.get(`http://localhost:4000/api/getPrice`).then(res => res.data)
    }

    const deleteProduct = cartItem => {
        let id = cartItem.id
        axios.delete(`http://localhost:4000/api/deleteProduct/${id}`).then(res => res.data)
        refreshPage()
    }

    let totalProdPrice = Math.round((data.price * +quantity)*100)/100

    const increaseHandler = () => {
        setQuantity(quantity+1)
    }
    const decreaseHandler = () => {
        setQuantity(quantity-1)
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
                        <button className='bg-red w-20' onClick={() => deleteProduct(data)}>Remove</button>
                    </div>
                </div>
                <div className='pt-6'>
                    <p className='flex justify-end'>{totalProdPrice}</p>
                </div>
            </div>
        </div>
    )
}



// const mapStateToProps = (state, ownProps) => {
//     return {quantity: state.quantity, totalPrice: state.totalPrice, cartTotal: state.cartTotal}
// }
// export default connect(mapStateToProps)(CartItemCard)

export default CartItemCard