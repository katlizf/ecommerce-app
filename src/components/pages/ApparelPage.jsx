import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FilterBar from '../FilterBar'
import ProductCard from '../product-cards/ProductCard'


function ApparelPage() {

    const [allApparel, setAllApparel] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getApparel`).then(res => setAllApparel(res.data))
    }, [])

    return (
        <div>
            <FilterBar allApparel={allApparel} setAllApparel={setAllApparel}/>
            <div className='card-container'>
            {/* {allApparel.map(data => <ProductCard data={data} />)} */}
            </div>
        </div>
    )
}

export default ApparelPage