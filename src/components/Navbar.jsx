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
            <Link to='/items'>
                <button id='link-btn'>Memorabilia</button>
            </Link>
            <span>
                <input placeholder='Search'></input>
            </span>
            <Link to='/cart'>
                <button id='link-btn'>Cart</button>
            </Link>
            <button>Login/Register</button>
        </div>
    )
}

export default Navbar