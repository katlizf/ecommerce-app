import React from 'react'

function ProductCard({data}) {    

    return (
        <div className='card-container'>
                <div className='product-card'>
                    <img src={data.image} alt={data.product_name} className='product-img' />
                    <div className='prod-desc'>
                    <h2>{data.product_name}</h2>
                    <h3>{data.description}</h3>
                    <div className='card-row'>
                        <h3>${data.price}</h3>
                        <button className='cart-btn'>Add to Cart</button>
                    </div>
                    </div>
                    </div>
        </div>
    )
}

export default ProductCard