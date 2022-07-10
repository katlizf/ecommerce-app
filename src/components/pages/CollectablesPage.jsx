import React, {useEffect, useState} from 'react'
import axios from 'axios'
import FilterBar from '../FilterBar'
import AllYouNeed from '../banners/AllYouNeed'


function CollectablesPage({loggedInUser}) {

    const [allProducts, setallProducts] = useState([])

    useEffect(() => {
        axios.get(`/getCollectables`).then(res => setallProducts(res.data))
    }, [])

    return (
        <div>
            <AllYouNeed />
            <FilterBar allProducts={allProducts} setallProducts={setallProducts} loggedInUser={loggedInUser}/>
        </div>
    )
}

export default CollectablesPage