import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FilterBar from '../FilterBar'
import ProductCard from '../product-cards/ProductCard'


function CollectablesPage() {

    const [allProducts, setallProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCollectables`).then(res => setallProducts(res.data))
    }, [])

    return (
        <div>
            <FilterBar allProducts={allProducts} setallProducts={setallProducts}/>
            {/* <div className='card-container'>
                {allCollectables.map(data => <ProductCard data={data}/>)}
            </div> */}
        </div>
    )
}

export default CollectablesPage