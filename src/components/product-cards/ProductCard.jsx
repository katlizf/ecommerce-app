import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'


function ProductCard({product, loggedInUser}) {

    const addToCart = product => {
        const body = {prodId: product.product_id, custId: loggedInUser}
        axios.post(`/addToCart`, body).then(res => swal(res.data, {buttons:false, timer:1000})).catch(err => swal(err.response.data, {buttons:false, timer:1000}))
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