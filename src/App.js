import React, {useState} from "react"
import {Route, Routes} from 'react-router-dom'
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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const checkCustExists = () => {
        const body = {username, password}
        axios.post(`https://weebs-r-us.herokuapp.com/api/login`, body).then(res => {
            alert('Login Successful!')
            setLoggedInUser(res.data[0].customer_id)
            document.getElementById('login/logout').textContent = 'Logout'
        })
            .catch(err => alert("Sorry, we don't recognize that username or password. Please try again or register as a new customer."))
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
                        <img src={HatIcon} alt="Kisuke Urahara's Hat" className='h-20 w-20 mr-5 mt-1' />
                    </a>
                    <h1 className='flex items-center text-3xl tracking-wider'>Weebs R Us!</h1>
                </div>
                <Navbar checkCustExists={checkCustExists} setUsername={setUsername} setPassword={setPassword} logout={logout} loggedInUser={loggedInUser} />
            </div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/apparel' element={<ApparelPage loggedInUser={loggedInUser} />} />
                <Route path='/collectables' element={<CollectablesPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/login' element={<Login checkCustExists={checkCustExists} setUsername={setUsername} setPassword={setPassword} logout={logout} loggedInUser={loggedInUser}/>} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
