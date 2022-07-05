import React from 'react'
import axios from 'axios'


function ProductCard({product, loggedInUser}) {

    const addToCart = product => {
        const body = {prodId: product.product_id, type: product.type, custId: loggedInUser}
        axios.post(`https://weebs-r-us.herokuapp.com/addToCart`, body).then(res => alert(res.data)).catch(err => alert(err.response.data))
    }

    return (
        <div className='product-card'>
            <img src={product.image} alt={product.product_name} className='product-img' />
            <div>
                <h2 className='text'>{product.product_name}</h2>
                <h3 className='text'>{product.description}</h3>
                <div className='card-row'>
                    <h3 className='text'>${product.price}</h3>
                    <button className='cart-btn' onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            </div>
        </div>

    )
}

export default ProductCard