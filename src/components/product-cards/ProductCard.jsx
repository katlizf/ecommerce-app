import React from 'react'
import axios from 'axios'


function ProductCard({data, product}) {

    const addToCart = product => {
        const body = {id: product.id, type: product.type}
        axios.post(`http://localhost:4000/api/addToCart`, body).then(res => res.data)
    }

    return (
        <div className='product-card'>
            <img src={product.image} alt={product.product_name} className='product-img' />
            <div className='prod-desc'>
                <h2>{product.product_name}</h2>
                <h3>{product.description}</h3>
                <div className='card-row'>
                    <h3>${product.price}</h3>
                    <button className='cart-btn' onClick={() => addToCart(data)}>Add to Cart</button>
                </div>
            </div>
        </div>

    )
}

export default ProductCard