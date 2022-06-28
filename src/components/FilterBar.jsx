import axios from 'axios'
import React, {useEffect, useState} from 'react'
import ProductCard from './product-cards/ProductCard'


function FilterBar({allApparel, setAllApparel}) {

    const [allTitles, setAllTitles] = useState([])
    const [selected, setSelected] = useState('')

    const productsList = allApparel.filter((item) => {
        if(selected) return item.anime === selected
        return item}).map((item, index) => {
            return (
                <ProductCard key={index} id={item} product={item} setAllApparel={setAllApparel} allApparel={allApparel} />
            )
    })

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/getTitles')
            .then(res => setAllTitles(res.data))
    }, [])

    const titleOptions = allTitles.map((title, index) => {
        return <option value={title.id}>{title.name}</option>
    })

    return (
        <div className='flex justify-end pr-24 pt-16'>
            <div className='pr-12'>
                <h2>Search: <input className='border-b-2'></input></h2>
            </div>
            <select 
                className='border-2'
                onChange={e => setSelected(e.target.value)}
                defaultValue='all'>
                <option value='all'>Filter by Anime (all)</option>
                {titleOptions}
            </select>
            {/* {allApparel.map((allApparel) => <ProductCard {...allApparel} />)} */}
            {productsList}
        </div>
    )
}

export default FilterBar