import React, {useState} from 'react'
import axios from 'axios'
import CartItemCard from './CartItemCard'

function ProductCard({data}) {

    const [cartItem, setCartItem] = useState([])

    const addToCart = () => {
        axios.get(`http://localhost:4000/api/getProduct/id`).then(res => setCartItem(res.data))
        console.log(data)
    }

    return (
        <div className='product-card'>
            <img src={data.image} alt={data.product_name} className='product-img' />
            <div className='prod-desc'>
                <h2>{data.product_name}</h2>
                <h3>{data.description}</h3>
                <div className='card-row'>
                    <h3>${data.price}</h3>
                    <button className='cart-btn' onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
            {cartItem.map(data => <CartItemCard data={data} />)}
        </div>

    )
}

export default ProductCard