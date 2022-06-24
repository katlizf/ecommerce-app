import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Auth from './Auth'


function Navbar() {

    const [loginDisplay, setLoginDisplay] = useState(false)

    const toggleLogin = e => {
        setLoginDisplay(loginDisplay => !loginDisplay)
    }

    return (
        <div className='flex justify-end items-center h-24 bg-orange pr-20'>
            <Link to='/'>
                <button id='link-btn'>Home</button>
            </Link>
            <Link to='/apparel'>
                <button id='link-btn'>Apparel</button>
            </Link>
            <Link to='/collectables'>
                <button id='link-btn-lg'>Collectables</button>
            </Link>
            <Link to='/cart'>
                <button id='link-btn'>Cart</button>
            </Link>
            <button id='link-btn' onClick={toggleLogin}>Login</button>
            {loginDisplay && <Auth />}
        </div>
    )
}

export default Navbar