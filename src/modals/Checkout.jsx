import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'


function Checkout({subtotal}) {

    const [showCheckout, setShowCheckout] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    let shipping = 0.00
    let total = subtotal + shipping

    const refreshPage = ()=>{
        window.location.reload();
    }

    const openCheckout = () => {
        setShowCheckout(true)
    }
    const closeCheckout = () => {
        setShowCheckout(false)
    }

    const shipmentDetails = e => {
        switch(e.target.name) {
            case 'fname':
                setFirstName(e.target.value)
                break;
            case 'lname':
                setLastName(e.target.value)
                break;
            case 'address':
                setAddress(e.target.value)
                break;
            case 'city':
                setCity(e.target.value)
                break;
            case 'state':
                setState(e.target.value)
                break;
            case 'zcode':
                setZipCode(e.target.value)
                break;
            case 'phone':
                setPhone(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            default:
                e.preventDefault()
        }
    }

    const checkoutHandler = () => {
        const body = {address, city, state, zipCode, phone,firstName, lastName, email}
        axios.post('http://localhost:4000/api/createShipment', body).then(res => res.data)
        axios.delete('http://localhost:4000/api/emptyCart').then(res => res.data)
        closeCheckout()
        refreshPage()
        alert("Thanks for Shopping Today! You're order will ship out soon!")
    }

    return (
        <div className='flex justify-end pb-28'>
            <button
                onClick={e => openCheckout()}
                className='w-24 h-8 bg-orange hover:bg-green'>Checkout</button>
            <ReactModal
                isOpen={showCheckout}
                ariaHideApp={false}
                style={{
                    content: {
                        position: 'absolute',
                        top: '8%',
                        left: '32%',
                        bottom: '5%',
                        width: '36%',
                        height: '84%',
                        border: '2px solid #ccc'
                    }
                }}>
                <h1 class='modal-title'>You're Almost There!</h1>
                <br />
                <h2 className='text-xl'>Please give us your shipment details below</h2>
                <br />
                <div className='flex-col'>
                    <label>First name: 
                        <input 
                            className='user-input' 
                            name='fname' 
                            type='text'
                            onChange={shipmentDetails}></input></label>
                        <br />
                    <label>Last name: 
                        <input 
                            className='user-input' 
                            name='lname' 
                            type='text' 
                            onChange={shipmentDetails}></input></label>
                </div>
                <br />
                <div className='flex-col'>
                    <label>Address: 
                        <input 
                            className='user-input'
                            name='address' 
                            type='text' 
                            onChange={shipmentDetails}></input></label>
                            <br />
                    <label>City: 
                        <input 
                            className='user-input' 
                            name='city' 
                            type='text' 
                            onChange={shipmentDetails}></input></label>
                            <br />
                    <label>State: 
                        <input 
                            className='user-input' 
                            name='state' 
                            type='text' 
                            onChange={shipmentDetails}></input></label>
                            <br />
                    <label>Zip code: 
                        <input 
                            className='user-input' 
                            name='zcode' 
                            type='text' 
                            onChange={shipmentDetails}></input></label>
                </div>
                <br />
                <div className='flex-col'>
                    <label>Phone number: 
                        <input 
                            className='user-input' 
                            name='phone' 
                            type='text' 
                            onChange={shipmentDetails}></input></label>
                            <br />
                    <label>Email:
                        <input 
                            className='user-input'
                             name='email' 
                             type='email' 
                             onChange={shipmentDetails}></input></label>
                </div>
                <br />
                <div>
                    <span className='flex flex-row'>
                        <p className='w-24'>Subtotal:</p>
                        <p>{subtotal}</p>
                    <br />
                    </span>
                    <span className='flex flex-row'>
                        <p className='w-24'>Shipping:</p>
                        <p className='mr-5'>{shipping.toFixed(2)}</p>
                        <p>FREE!</p>
                    <br />
                    </span>
                    <span className='flex flex-row'>
                        <p className='w-24'>Total:</p>
                        <p>{total}</p>
                    <br />
                    </span>
                </div>
                <br />
                <div class='align-modal-btns'>
                    <button class='modal-btns' onClick={closeCheckout}>Continue Shopping?</button>
                    <button class='modal-btns' onClick={checkoutHandler}>Checkout!</button>
                </div>
                <br />
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Checkout />, document.getElementById('checkout'))
export default Checkout