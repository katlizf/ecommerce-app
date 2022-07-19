import React, {useState} from "react"
import {Route, Routes} from 'react-router-dom'
import swal from "sweetalert"
import axios from 'axios'
import HomePage from './components/pages/HomePage'
import ApparelPage from './components/pages/ApparelPage'
import CollectablesPage from './components/pages/CollectablesPage'
import CartPage from './components/pages/CartPage'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HatIcon from './images/hat-icon.png'
import Login from "./modals/Login"


function App() {

    const [loggedInUser, setLoggedInUser] = useState(0)
    // use state for addToCart, getCartProducts, deleteFromCart, and emptyCart requests
    // need to persist loggedInUser upon refresh
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const checkCustExists = () => {
        const body = {username, password}
        axios.post(`/login`, body).then(res => {
            swal('Login Successful!', {buttons:false, timer:2000})
            setLoggedInUser(res.data[0].customer_id)
            document.getElementById('login/logout').textContent = 'Logout'
        })
            .catch(err => swal("Sorry, we don't recognize that username or password. Please try again or register as a new customer."))
    }

    const logout = () => {
        const logoutTrue = document.getElementById('login/logout').textContent === 'Logout'
        if (logoutTrue) {
            setLoggedInUser(0)
        }
        document.getElementById('login/logout').textContent = 'Login'
    }

    return (
        <div>
            <div className='flex flex-row bg-orange justify-between h-24'>
                <div className='flex justify-start pl-6'>
                    <a href='/'>
                        <img src={HatIcon} alt="Kisuke Urahara's Hat" className='h-20 w-20 mr-5 mt-1 sm:w-16 sm:h-16 sm:mt-2' />
                    </a>
                    <h1 className='flex items-center text-3xl tracking-wider sm:text-2xl'>Weebs-R-Us!</h1>
                </div>
                <Navbar checkCustExists={checkCustExists} setUsername={setUsername} setPassword={setPassword} logout={logout} loggedInUser={loggedInUser} />
            </div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/apparel' element={<ApparelPage loggedInUser={loggedInUser} />} />
                <Route path='/collectables' element={<CollectablesPage loggedInUser={loggedInUser}/>} />
                <Route path='/cart' element={<CartPage loggedInUser={loggedInUser} />} />
                <Route path='/login' element={<Login checkCustExists={checkCustExists} setUsername={setUsername} setPassword={setPassword} logout={logout} loggedInUser={loggedInUser}/>} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
