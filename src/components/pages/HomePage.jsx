import React from 'react'
import background from '../../images/bleach-kisuke-urahara-wallpaper.jpg'


function HomePage() {
    return (
        <div className='bg-black' style={{
            backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', height:875, backgroundSize:'cover', backgroundPosition:'center'}}>
            <p className='text-orange font-extrabold text-center text-6xl py-16 bg-black bg-opacity-50'>Welcome to Weebs R Us!</p>
        </div>
    )
}

export default HomePage