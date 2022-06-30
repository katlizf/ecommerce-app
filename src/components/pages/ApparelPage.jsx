import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FilterBar from '../FilterBar'
import FreeShipping from '../../banners/FreeShipping'


function ApparelPage() {

    const [allProducts, setallProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getApparel`).then(res => setallProducts(res.data))
    }, [])

    return (
        <div>
            <FreeShipping />
            <FilterBar
                allProducts={allProducts} setallProducts={setallProducts} />
        </div>
    )
}

export default ApparelPage