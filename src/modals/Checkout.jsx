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
    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardType, setCardType] = useState('')
    // need to track and log cardType
    const [expiration, setExpiration] = useState('')
    const [ssn, setSSN] = useState('')

    let shipping = 0.00
    let total = subtotal + shipping

    const refreshPage = () => {
        window.location.reload()
    }

    const openCheckout = () => {
        setShowCheckout(true)
    }
    const closeCheckout = () => {
        setShowCheckout(false)
    }

    const shipmentDetails = e => {
        switch (e.target.name) {
            case 'fname':
                setFirstName(e.target.value)
                break
            case 'lname':
                setLastName(e.target.value)
                break
            case 'address':
                setAddress(e.target.value)
                break
            case 'city':
                setCity(e.target.value)
                break
            case 'state':
                setState(e.target.value)
                break
            case 'zcode':
                setZipCode(e.target.value)
                break
            case 'phone':
                setPhone(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'cc-name':
                setCardName(e.target.value)
                break;
            case 'cc-number':
                setCardNumber(e.target.value)
                break;
            case 'expiration':
                setExpiration(e.target.value)
                break;
            case 'ssn':
                setSSN(e.target.value)
                break;
            default:
                e.preventDefault()
        }
    }

    const checkoutHandler = () => {
        const body = {address, city, state, zipCode, phone, firstName, lastName, email, cardName, cardNumber, expiration, ssn}
        axios.post('/createShipment', body).then(res => res.data)
        axios.delete('/emptyCart').then(res => res.data)
        closeCheckout()
        refreshPage()
        alert("Order submitted! You're order will ship out soon. Thanks for shopping with us today!")
    }

    return (
        <div className='flex justify-end mb-28'>
            <button
                onClick={e => openCheckout()}
                className='w-24 h-8 bg-orange hover:bg-green'>Checkout</button>
            <ReactModal
                isOpen={showCheckout}
                ariaHideApp={false}
                className='checkout-modal'>
                <h1 className='modal-title'>You're Almost There!</h1>
                <br />
                <h2 className='text-xl'>Please give us your shipment details below</h2>
                <br />
                <div className='flex flex-col ml-6'>
                    <div>
                        <div className='flex flex-row space-x-3 sm:flex-col sm:space-x-0'>
                            <div className='flex flex-col'>
                                <label className='checkout-label w-40'>First name:</label>
                                <input
                                    className='checkout-input'
                                    name='fname'
                                    type='text'
                                    onChange={shipmentDetails}></input>
                            </div>
                            <div className='flex flex-col'>
                                <label className='checkout-label'>Last name:</label>
                                <input
                                    className='checkout-input'
                                    name='lname'
                                    type='text'
                                    onChange={shipmentDetails}></input>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='checkout-label'>Address:</label>
                            <input
                                className='checkout-input-lg'
                                name='address'
                                type='text'
                                onChange={shipmentDetails}></input>
                        </div>
                        <div className='flex flex-row space-x-3 sm:flex-col sm:space-x-0'>
                            <div className='flex flex-col w-40'>
                                <label className='checkout-label'>City:</label>
                                <input
                                    className='checkout-input'
                                    name='city'
                                    type='text'
                                    onChange={shipmentDetails}></input>
                            </div>
                            <div className='flex flex-col w-40'>
                                <label className='checkout-label'>State:</label>
                                <input
                                    className='checkout-input'
                                    name='state'
                                    type='text'
                                    onChange={shipmentDetails}></input>
                            </div>
                            <div className='flex flex-col w-40'>
                                <label className='checkout-label'>Zip code:</label>
                                <input
                                    className='checkout-input'
                                    name='zcode'
                                    type='text'
                                    onChange={shipmentDetails}></input>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='checkout-label'>Phone number:</label>
                            <input
                                className='checkout-input-lg'
                                name='phone'
                                type='text'
                                onChange={shipmentDetails}></input>
                            <label className='checkout-label'>Email:</label>
                            <input
                                className='checkout-input-lg'
                                name='email'
                                type='email'
                                onChange={shipmentDetails}></input>
                        </div>
                        <div className='flex flex-col'>
                            <label className='checkout-label'>Name on Card:</label>
                            <input
                                className='checkout-input-lg'
                                name='cc-name'
                                type='text'
                                onChange={shipmentDetails}></input>
                            <label className='checkout-label'>Card number:</label>
                            <input
                                className='checkout-input-lg'
                                name='cc-number'
                                type='text'
                                onChange={shipmentDetails}></input>
                            <label className='checkout-label'>Card type:</label>
                            <form action='' method='post' className='space-x-4 sm:space-x-0 sm:flex sm:flex-col'>
                                <label>Visa
                                    <input type='radio' name='cc-type' value='Visa' /></label>
                                <label>Mastercard
                                    <input type='radio' name='cc-type' value='Mastercard' /></label>
                                <label>Discover
                                    <input type='radio' name='cc-type' value='Discover' /></label>
                                <label>American Express
                                    <input type='radio' name='cc-type' value='American Express' /></label>
                            </form>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row space-x-3 sm:flex-col sm:space-x-0'>
                                <div className='flex flex-col'>
                                    <label className='checkout-label w-40'>Expiration:</label>
                                    <input
                                        className='checkout-input'
                                        name='expiration'
                                        type='text'
                                        placeholder='mm/yyy'
                                        onChange={shipmentDetails}></input>
                                </div>
                                <div className='flex flex-col w-40'>
                                    <label className='checkout-label'>SSN:</label>
                                    <input
                                        className='checkout-input'
                                        name='ssn'
                                        type='text'
                                        onChange={shipmentDetails}></input>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <br />
                <div>
                    <span className='flex flex-row justify-end'>
                        <p className='w-24 mr-9 lg:mr-8 md:mr-7 sm:mr-6'>Subtotal:</p>
                        <p>{subtotal}</p>
                        <br />
                    </span>
                    <span className='flex flex-row justify-end'>
                        <p>Shipping:</p>
                        <p className='mr-9'>FREE!</p>
                        <p>{shipping.toFixed(2)}</p>
                        <br />
                    </span>
                    <span className='flex flex-row justify-end'>
                        <p className='w-24 mr-2 lg:mr-3 md:mr-2 sm:mr-1'>Total:</p>
                        <p>{total}</p>
                        <br />
                    </span>
                </div>
                <br />
                <div className='align-modal-btns'>
                    <button className='modal-btns' onClick={closeCheckout}>Continue Shopping?</button>
                    <button className='modal-btns' onClick={checkoutHandler}>Checkout!</button>
                </div>
                <br />
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Checkout />, document.getElementById('checkout'))
export default Checkout