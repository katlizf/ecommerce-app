import React, {useEffect, useState} from 'react'
import axios from 'axios'



function CollectablesCard() {

    const [allCollectables, setAllCollectables] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCollectables`).then(res => setAllCollectables(res.data))
    }, [])

    return (
        <div>
            {allCollectables.map(collectable =>
                <div>
                    <img src={collectable.image} alt={collectable.product_name} />
                    <h2>{collectable.product_name}</h2>
                    <h3>{collectable.description}</h3>
                    <h3>${collectable.price}</h3>
                </div>
                )}

        </div>
    )
}

export default CollectablesCard
