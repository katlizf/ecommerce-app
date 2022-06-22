import axios from 'axios'
import React, {useEffect, useState} from 'react'

function FilterBar() {

    const [allTitles, setAllTitles] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/getTitles')
            .then(res => setAllTitles(res.data))
    })

    const titleOptions = allTitles.map((title, index) => {
        return <option value={title.id}>{title.name}</option>
    })

    return (
        <div>
            <h2>Search: <input></input></h2>
            <select>
                <option defaultValue disabled selected>Filter by Anime</option>
                {titleOptions}
            </select>
        </div>
    )
}

export default FilterBar