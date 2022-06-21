import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <Link to='/'>
                <button id='link-btn'>Home</button>
            </Link>
            <Link to='/apparel'>
                <button id='link-btn'>Apparel</button>
            </Link>
            <Link to='/collectables'>
                <button id='link-btn'>Collectables</button>
            </Link>
            <span>
                <input placeholder='Search'></input>
            </span>
            <Link to='/cart'>
                <button id='link-btn'>Cart</button>
            </Link>
            <button>Login</button>
        </div>
    )
}

export default Navbar