import React from 'react'
import ShippingIcon from '../../images/shipping-icon.png'

function FreeShipping() {
    return (
        <div className='flex flex-row justify-center mt-5 bg-light-grey h-28'>
            <img src={ShippingIcon} alt='shipping truck' className='w-24 h-24 mr-10' />
            <div className='flex-col'>
                <h2 className='mt-5 mb-3 text-2xl'>Get Free Shipping When you Order Today!</h2>
                <h3 className='ml-24'>Hurry, this deal won't last forever!</h3>
            </div>
        </div>
    )
}

export default FreeShipping