import axios from 'axios'
import React, {useEffect, useState} from 'react'
import ProductCard from './product-cards/ProductCard'


function FilterBar({allProducts, setallProducts}) {

    const [allTitles, setAllTitles] = useState([])
    const [selected, setSelected] = useState('')

    const apparelList = allProducts.filter((anime) => {
        return anime.name.includes(selected)
        }).map((anime, index) => {
            return (
                <ProductCard key={index} id={anime.anime_id} product={anime} setallProducts={setallProducts} allProducts={allProducts} />
            )
    })

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/getTitles')
            .then(res => setAllTitles(res.data))
    }, [])

    const titleOptions = allTitles.map((title, index) => {
        return <option key={title.anime_id} value={title.name}>{title.name}</option>
    })

    return (
        <div>
            <div className='flex justify-end pr-28 pt-8'>
                {/* <h2>Search: <input className='border-b-2'></input></h2> */}
                <select
                    className='border-2'
                    onChange={e => setSelected(e.target.value)}
                    defaultValue='all'>
                    <option value=''>Filter by Anime (all)</option>
                    {titleOptions}
                </select>
            </div>
            <div className='card-container'>
                {apparelList}
            </div>
        </div>
    )
}

export default FilterBar