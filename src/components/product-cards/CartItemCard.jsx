import React from 'react'

function CartItemCard({data}) {

    return (
        <div>
            <div>
                <img src={data.image} alt={data.product_name} />
                <h4>{data.product_name}</h4>
                <h3>{data.price}</h3>
                <h3>quantity</h3>
            </div>
        </div>
    )
}

export default CartItemCard