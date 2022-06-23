import React, {useState} from 'react'
import axios from 'axios'
import CartItemCard from '../product-cards/CartItemCard'

function CartPage({data}) {

    // const [cartItem, setCartItem] = useState([])

    // const addToCart = () => {
    //     axios.get(`http://localhost:4000/api/getProduct/id`).then(res => setCartItem(res.data))
    //     console.log(data)
    // }

    return (
        <div>
            {/* {cartItem.map(data => <CartItemCard data={data} />)} */}
            <CartItemCard />
        </div>
    )
}

export default CartPage