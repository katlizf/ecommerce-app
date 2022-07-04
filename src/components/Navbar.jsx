import React from 'react'
import {Link} from 'react-router-dom'
import Login from '../modals/Login'
import HatIcon from '../images/hat-icon.png'
import hamburgerIcon from '../images/hamburger.png'
import Hamburger from './Hamburger'


function Navbar({checkCustExists, setUsername, setPassword, logout, loggedInUser}) {


    return (
        <div className='flex flex-row bg-orange justify-between h-24'>
            <div className='flex justify-start pl-6'>
                <a href='/'>
                    <img src={HatIcon} alt="Kisuke Urahara's Hat" className='h-20 w-20 mr-5 mt-1'/>
                </a>
                <h1 className='flex items-center text-3xl tracking-wider'>Weebs R Us!</h1>  
            </div>
            <div className='navigation'>
                <Link to='/'>
                    <button className='link-btn'>Home</button>
                </Link>
                <Link to='/apparel'>
                    <button className='link-btn'>Apparel</button>
                </Link>
                <Link to='/collectables'>
                    <button className='link-btn-lg'>Collectables</button>
                </Link>
                <Link to='/cart'>
                    <button className='link-btn'>Cart</button>
                </Link>
                <Login checkCustExists={checkCustExists} setUsername={setUsername} setPassword={setPassword} logout={logout} loggedInUser={loggedInUser} />
            </div>
            <div className='hamburger'>
                <img src={hamburgerIcon} alt='hamburger icon'></img>
                <Hamburger className='hamburger-menu'/>
            </div>
        </div>
    )
}

export default Navbar