import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FilterBar from '../FilterBar'
import FreeShipping from '../banners/FreeShipping'


function ApparelPage({loggedInUser}) {

    const [allProducts, setallProducts] = useState([])

    useEffect(() => {
        axios.get(`https://weebs-r-us.herokuapp.com/apparel/getApparel`).then(res => setallProducts(res.data))
    }, [])

    return (
        <div>
            <FreeShipping />
            <FilterBar
                allProducts={allProducts} setallProducts={setallProducts} loggedInUser={loggedInUser}/>
        </div>
    )
}

export default ApparelPage