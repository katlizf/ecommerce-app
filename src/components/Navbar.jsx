import React, {useState} from 'react'
import Login from '../modals/Login'
import {Link} from 'react-router-dom'


function Navbar({loggedInUser}) {

    const [showMobileMenu, setMobileMenu] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenu(!showMobileMenu)
    }
    const closeMobileMenu = () => {
        setMobileMenu(false)
    }
    const openLogin = () => {
        if (loggedInUser === 0) {
            setShowLogin(true)
        }            
    }

    return (
        <div className='navigation'>
            <div className='menu-icon' onClick={toggleMobileMenu}>
                <i className={showMobileMenu ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={showMobileMenu ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-link' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/apparel' className='nav-link' onClick={closeMobileMenu}>
                        Apparel
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/collectables' className='nav-link-lg' onClick={closeMobileMenu}>
                        Collectables
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/cart' className='nav-link' onClick={closeMobileMenu}>
                        Cart
                    </Link>
                </li>
                <li className='nav-item' onClick={closeMobileMenu}>
                    <Login openLogin={openLogin} setShowLogin={setShowLogin} showLogin={showLogin} />
                </li>
            </ul>
        </div>
    )
}

export default Navbar