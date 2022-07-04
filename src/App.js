import React, {useState} from "react"
import {Route, Routes} from 'react-router-dom'
import axios from 'axios'
import HomePage from './components/pages/HomePage'
import ApparelPage from './components/pages/ApparelPage'
import CollectablesPage from './components/pages/CollectablesPage'
import CartPage from './components/pages/CartPage'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


function App() {

    const [loggedInUser, setLoggedInUser] = useState(0)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const checkCustExists = () => {
        const body = {username, password}

        axios.post(`http://localhost:4000/api/login`, body).then(res => {
            alert('Login Successful!')
            setLoggedInUser(res.data[0].customer_id)})
            .catch(err => alert('Error'))        
        // closeLogin()
    }

    return (
        <div>
            <Navbar checkCustExists={checkCustExists} setUsername={setUsername} setPassword={setPassword}/>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/apparel' element={<ApparelPage loggedInUser={loggedInUser}/>} />
                <Route path='/collectables' element={<CollectablesPage />} />
                <Route path='/cart' element={<CartPage />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
