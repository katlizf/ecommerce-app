import React from 'react'
import {slide as Menu} from 'react-burger-menu'
import Login from '../modals/Login'

function Hamburger() {
    return (
        <div>
             <Menu className='hamburger'>
                <a id='home' className='burger-item' href='/'>Home</a>
                <a id='home' className='burger-item' href='/apparel'>Apparel</a>
                <a id='home' className='burger-item' href='/collectables'>Collectables</a>
                <a id='home' className='burger-item' href='/cart'>Cart</a>
                <Login />
            </Menu>
        </div>
           
    )
}

export default Hamburger