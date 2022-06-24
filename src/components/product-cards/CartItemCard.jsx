import React from 'react'


function CartItemCard({data}) {

    return (
        <div className='flex flex-row w-1/2'>            
            <div className='flex flex-row justify-between pl-8 pt-6 border-b border-grey'>
                <img
                    className='h-44 w-44 mb-6'
                    src={data.image}
                    alt={data.product_name} />
                <div className='flex flex-col pt-9 pl-7'>
                    <p className='pb-4'>{data.product_name}</p>
                    <div className='flex flex-row'>
                        <p>quantity</p>
                        <button className='bg-red w-20'>Remove</button>
                    </div>
                </div>
                <div className=' w-96 pt-6'>
                    <p className='flex justify-end'>{data.price}</p>
                </div>
                
            </div>
        </div>
    )
}

export default CartItemCard