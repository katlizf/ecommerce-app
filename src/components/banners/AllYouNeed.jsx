import React from 'react'
import SwordIconLeft from '../../images/sword-icon-left.png'
import SwordIconRight from '../../images/sword-icon-right.png'

function Best() {
    return (
        <div className='flex flex-row justify-center items-center mt-5 bg-light-grey h-28'>
            <img src={SwordIconRight} alt='crossed swords' className='w-16 h-16 mr-7 sm:w-12 sm:h-12 sm:mr-1' />
            <div>
                <h2 className='text-3xl tracking-wide mr-7 sm:text-2xl sm:w-60 sm:text-center sm:mr-1'>Weeb Got What You Need!</h2>
            </div>
            <img src={SwordIconLeft} alt='crossed swords' className='w-16 h-16 sm:w-12 sm:h-12' />
        </div>
    )
}

export default Best