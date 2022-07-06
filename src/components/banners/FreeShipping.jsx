import React from 'react'
import ShippingIcon from '../../images/shipping-icon.png'

function FreeShipping() {
    return (
        <div className='flex flex-row justify-center mt-5 bg-light-grey h-28'>
            <img src={ShippingIcon} alt='shipping truck' className='w-24 h-24 mr-10 sm:h-20 sm:w-20 sm:mr-5 sm:mt-2' />
            <div className='flex-col'>
                <h2 className='mt-5 mb-3 text-2xl sm:text-xl sm:w-64'>Get Free Shipping When you Order Today!</h2>
                <h3 className='flex ml-24 sm:hidden'>Hurry, this deal won't last forever!</h3>
            </div>
        </div>
    )
}

export default FreeShipping