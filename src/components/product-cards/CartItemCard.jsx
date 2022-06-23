import React, {useEffect, useState} from 'react'
import axios from 'axios'

function CartItemCard() {

    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getProduct`).then(res => setProduct(res.data))
    }, [])

    return (
        <div>
            {product.map(prod =>
                <div>
                    <img src={prod.image} alt={prod.product_name} />
                    <h4>{prod.product_name}</h4>
                    <h3>{prod.price}</h3>
                    <h3>quantity</h3>
                </div>
            )}

        </div>
    )
}

export default CartItemCard