import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FilterBar from '../FilterBar'
import ProductCard from '../product-cards/ProductCard'

function CollectablesPage() {

    const [allCollectables, setAllCollectables] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCollectables`).then(res => setAllCollectables(res.data))
    }, [])

    return (
        <div>
            <FilterBar />
            {allCollectables.map(data => <ProductCard data={data}/>)}
        </div>
    )
}

export default CollectablesPage