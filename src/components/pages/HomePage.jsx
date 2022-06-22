import React from 'react'
import backgroundImg from '../../images/wallpaper-multi-character.png'

function HomePage() {
    return (
        <div className='bg-black' style={{
            backgroundImage: `url(${backgroundImg})`, backgroundRepeat:'no-repeat', height:800, backgroundSize:'cover', backgroundPosition:'center'}}>
            <h1 className='text-orange font-semibold text-center text-7xl pt-28'>Welcome to Weebs R Us!</h1>
        </div>
    )
}

export default HomePage