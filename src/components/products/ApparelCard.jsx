import React, {useEffect, useState} from 'react'
import axios from 'axios'

function ApparelCard() {

    const [allApparel, setAllApparel] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getApparel`).then(res => setAllApparel(res.data))
    }, [])

    return (
        <div>
            {allApparel.map(apparel =>
                <div className='product-card'>
                    <img src={apparel.image} alt={apparel.product_name} className='product-img'/>
                    <h2>{apparel.product_name}</h2>
                    <h3>{apparel.description}</h3>
                    <h3>${apparel.price}</h3>
                    <button className='cart-btn'>Add to Cart</button>
                </div>)}
        </div>
    )
}

export default ApparelCard