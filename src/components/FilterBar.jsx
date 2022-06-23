import axios from 'axios'
import React, {useEffect, useState} from 'react'

function FilterBar(props) {

    const [allTitles, setAllTitles] = useState([])
    const [selected, setSelected] = useState('')
    const {list, setList} = props

    // const listMapped = list.filter(item => {
    //     if (selected) {
    //         axios.get(`http://localhost:4000/api/getAnimeProducts`)
    //     }
    // })

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:4000/api/getTitles')
    //         .then(res => setAllTitles(res.data))
    // })

    const titleOptions = allTitles.map((title, index) => {
        return <option value={title.id}>{title.name}</option>
    })

    return (
        <div className='flex justify-end pr-24 pt-16'>
            <div className='pr-12'>
                <h2>Search: <input className='border-b-2'></input></h2>
            </div>
            <select className='border-2'>
                <option defaultValue selected>Filter by Anime</option>
                {titleOptions}
            </select>

        </div>
    )
}

export default FilterBar