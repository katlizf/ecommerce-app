import React from "react"
import {Route, Routes} from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import ApparelPage from './components/pages/ApparelPage'
import ItemPage from './components/pages/ItemPage'
import CartPage from './components/pages/CartPage'
import Navbar from "./components/Navbar"

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/apparel' element={<ApparelPage />} />
                <Route path='/items' element={<ItemPage />} />
                <Route path='/cart' element={<CartPage />} />
            </Routes>
        </div>
    )
}

export default App
