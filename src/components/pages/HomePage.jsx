import React from 'react'
import backgroundImg from '../../images/wallpaper-multi-character.png'

function HomePage() {
    return (
        <div className='bg-black' style={{
            backgroundImage: `url(${backgroundImg})`, backgroundRepeat:'no-repeat', height:875, backgroundSize:'cover', backgroundPosition:'center'}}>
            <p className='text-orange font-extrabold text-center text-7xl py-20 bg-black bg-opacity-50'>Welcome to Weebs R Us!</p>
        </div>
    )
}

export default HomePage