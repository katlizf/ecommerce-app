import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Auth from './Auth'

function Navbar() {

    const [loginDisplay, setLoginDisplay] = useState(false)

    const toggleLogin = e => {
        setLoginDisplay(loginDisplay => !loginDisplay)
    }

    return (
        <div className='flex justify-end items-center h-24 bg-orange'>
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
            <button onClick={toggleLogin}>Login</button>
            {loginDisplay && <Auth />}
        </div>
    )
}

export default Navbar