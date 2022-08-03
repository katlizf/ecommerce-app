import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FilterBar from '../FilterBar'
import FreeShipping from '../banners/FreeShipping'


function ApparelPage({loggedInUser}) {

    const [allProducts, setallProducts] = useState([])

    useEffect(() => {
        axios.get(`/getApparel`).then(res => setallProducts(res.data))
    }, [])

    return (
        <div className='min-h-screen'>
            <FreeShipping />
            <FilterBar
                allProducts={allProducts} setallProducts={setallProducts} loggedInUser={loggedInUser}/>
        </div>
    )
}

export default ApparelPage