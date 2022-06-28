import React from "react"
import {Route, Routes} from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import ApparelPage from './components/pages/ApparelPage'
import CollectablesPage from './components/pages/CollectablesPage'
import CartPage from './components/pages/CartPage'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/apparel' element={<ApparelPage />} />
                <Route path='/collectables' element={<CollectablesPage />} />
                <Route path='/cart' element={<CartPage />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
