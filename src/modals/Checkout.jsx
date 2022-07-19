import React, {useRef, useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'
import swal from 'sweetalert'


const isEmpty = value => value.trim() === ''
const stateLength = value => value.trim().length === 2
const ssnLength = value => value.trim().length === 3
const zipCodeLength = value => value.trim().length === 5
const phoneLength = value => value.trim().length === 10
const emailPattern = value => value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
const cardNumberLength = value => value.trim().length === 16
const ssnPattern = value => value.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)


function Checkout({subtotal, loggedInUser}) {

    const [showCheckout, setShowCheckout] = useState(false)
    const [inputsValidity, setInputsValidity] = useState({
        firstName: true,
        lastName: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        phone: true,
        email: true,
        cardName: true,
        cardNumber: true,
        cardType: true,
        expiration: true,
        ssn: true

    })

    const firstNameInputRef = useRef()
    const lastNameInputRef = useRef()
    const addressInputRef = useRef()
    const cityInputRef = useRef()
    const stateInputRef = useRef()
    const zipCodeInputRef = useRef()
    const phoneInputRef = useRef()
    const emailInputRef = useRef()
    const cardNameInputRef = useRef()
    const cardNumberInputRef = useRef()
    const cardTypeInputRef = useRef()
    const expirationInputRef = useRef()
    const ssnInputRef = useRef()

    const confirmHandler = e => {
        e.preventDefault()

        const enteredFirstName = firstNameInputRef.current.value
        const enteredLastName = lastNameInputRef.current.value
        const enteredAddress = addressInputRef.current.value
        const enteredCity = cityInputRef.current.value
        const enteredState = stateInputRef.current.value
        const enteredZipCode = zipCodeInputRef.current.value
        const enteredPhone = phoneInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredCardName = cardNameInputRef.current.value
        const enteredCardNumber = cardNumberInputRef.current.value
        const enteredCardType = cardTypeInputRef.current.value
        const enteredExpiration = expirationInputRef.current.value
        const enteredSSN = ssnInputRef.current.value

        const enteredFirstNameIsValid = !isEmpty(enteredFirstName)
        const enteredLastNameIsValid = !isEmpty(enteredLastName)
        const enteredAddressIsValid = !isEmpty(enteredAddress)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredStateIsValid = stateLength(enteredState)
        const enteredZipCodeIsValid = zipCodeLength(enteredZipCode)
        const enteredPhoneIsValid = phoneLength(enteredPhone)
        const enteredEmailIsValid = emailPattern(enteredEmail)
        const enteredCardNameIsValid = !isEmpty(enteredCardName)
        const enteredCardNumberIsValid = cardNumberLength(enteredCardNumber)
        const enteredCardTypeIsValid = !isEmpty(enteredCardType)
        const enteredExpirationIsValid = ssnPattern(enteredExpiration)
        const enteredSSNIsValid = ssnLength(enteredSSN)

        setInputsValidity({
            firstName: enteredFirstNameIsValid,
            lastName: enteredLastNameIsValid,
            address: enteredAddressIsValid,
            city: enteredCityIsValid,
            state: enteredStateIsValid,
            zipCode: enteredZipCodeIsValid,
            phone: enteredPhoneIsValid,
            email: enteredEmailIsValid,
            cardName: enteredCardNameIsValid,
            cardNumber: enteredCardNumberIsValid,
            cardType: enteredCardTypeIsValid,
            expiration: enteredExpirationIsValid,
            ssn: enteredSSNIsValid
        })

        const formIsValid = 
            enteredFirstNameIsValid &&
            enteredLastNameIsValid &&
            enteredAddressIsValid &&
            enteredCityIsValid &&
            enteredStateIsValid &&
            enteredZipCodeIsValid &&
            enteredPhoneIsValid &&
            enteredEmailIsValid &&
            enteredCardNameIsValid &&
            enteredCardNumberIsValid &&
            enteredCardTypeIsValid &&
            enteredExpirationIsValid &&
            enteredSSNIsValid

        if (!formIsValid) {
            return
        }

        const checkoutHandler = () => {
            const body = {loggedInUser, enteredAddress, enteredCity, enteredState, enteredZipCode, enteredPhone, enteredFirstName, enteredLastName, enteredEmail, enteredCardName, enteredCardNumber, enteredCardType, enteredExpiration, enteredSSN}
            let custId = loggedInUser
            axios.post('/createShipment', body).then(res => res.data)
            axios.delete(`/emptyCart/${custId}`).then(res => res.data)
            closeCheckout()
            refreshPage()
            swal("Order submitted!", {buttons:false, timer:6000})
        }

        if (formIsValid) {
            checkoutHandler()
            return
        }
    }


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

    return (
        <div className='flex justify-end mb-28'>
            <button
                onClick={e => openCheckout()}
                disabled={subtotal===0}
                className='w-24 h-8 bg-orange hover:bg-green disabled:grayscale'>Checkout</button>
            <ReactModal
                isOpen={showCheckout}
                ariaHideApp={false}
                className='checkout-modal'>
                <h1 className='modal-title'>You're Almost There!</h1>
                <br />
                <h2 className='text-xl'>Please fill in your shipment and payment details below</h2>
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
                                    ref={firstNameInputRef}></input>
                                    {!inputsValidity.firstName && <p className='invalid'>Please enter your first name</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label className='checkout-label'>Last name:</label>
                                <input
                                    className='checkout-input'
                                    name='lname'
                                    type='text'
                                    ref={lastNameInputRef}></input>
                                    {!inputsValidity.lastName && <p className='invalid'>Please enter your last name</p>}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='checkout-label'>Address:</label>
                            <input
                                className='checkout-input-lg'
                                name='address'
                                type='text'
                                ref={addressInputRef}></input>
                                {!inputsValidity.address && <p className='invalid'>Please enter your street address</p>}
                        </div>
                        <div className='flex flex-row space-x-3 sm:flex-col sm:space-x-0'>
                            <div className='flex flex-col w-40'>
                                <label className='checkout-label'>City:</label>
                                <input
                                    className='checkout-input'
                                    name='city'
                                    type='text'
                                    ref={cityInputRef}></input>
                                    {!inputsValidity.city && <p className='invalid'>Please enter you city name</p>}
                            </div>
                            <div className='flex flex-col w-40'>
                                <label className='checkout-label'>State:</label>
                                <input
                                    className='checkout-input'
                                    name='state'
                                    type='text'
                                    ref={stateInputRef}></input>
                                    {!inputsValidity.state && <p className='invalid'>Please enter your abbreviated state, ex: WI</p>}
                            </div>
                            <div className='flex flex-col w-40'>
                                <label className='checkout-label'>Zip code:</label>
                                <input
                                    className='checkout-input'
                                    name='zcode'
                                    type='text'
                                    ref={zipCodeInputRef}></input>
                                    {!inputsValidity.zipCode && <p className='invalid'>Please enter your 5 digit zip code</p>}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='checkout-label'>Phone number (without dashes):</label>
                            <input
                                className='checkout-input-lg'
                                name='phone'
                                type='text'
                                ref={phoneInputRef}></input>
                                {!inputsValidity.phone && <p className='invalid'>Please enter your 10 digit zip code without dashes</p>}
                            <label className='checkout-label'>Email:</label>
                            <input
                                className='checkout-input-lg'
                                name='email'
                                type='email'
                                ref={emailInputRef}></input>
                                {!inputsValidity.email && <p className='invalid'>Please enter a valid email</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label className='checkout-label'>Name on Card:</label>
                            <input
                                className='checkout-input-lg'
                                name='cc-name'
                                type='text'
                                ref={cardNameInputRef}></input>
                                {!inputsValidity.cardName && <p className='invalid'>Please enter the name on the card</p>}
                            <label className='checkout-label'>Card number (without dashes):</label>
                            <input
                                className='checkout-input-lg'
                                name='cc-number'
                                type='text'
                                ref={cardNumberInputRef}></input>
                                {!inputsValidity.cardNumber && <p className='invalid'>Please enter you 16 digit card number without dashes</p>}
                            <label className='checkout-label'>Card type:</label>
                            <form action='' method='post' className='space-x-4 sm:space-x-0 sm:flex sm:flex-col'>
                                <label>
                                    <input type='radio' name='cc-type' value='Visa' ref={cardTypeInputRef} 
                                     />Visa</label>
                                <label>
                                    <input type='radio' name='cc-type' value='Mastercard'
                                    ref={cardTypeInputRef}
                                     />Mastercard</label>
                                <label>
                                    <input type='radio' name='cc-type' value='Discover'
                                    ref={cardTypeInputRef}
                                     />Discover</label>
                                <label>
                                    <input type='radio' name='cc-type' value='American Express'
                                    ref={cardTypeInputRef}
                                     />American Express</label>
                            </form>
                            {!inputsValidity.cardType && <p className='invalid'>Please select your card type</p>}
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row space-x-3 sm:flex-col sm:space-x-0'>
                                <div className='flex flex-col'>
                                    <label className='checkout-label w-40'>Expiration:</label>
                                    <input
                                        className='checkout-input'
                                        name='expiration'
                                        type='text'
                                        placeholder='mm/yy'
                                        ref={expirationInputRef}></input>
                                        {!inputsValidity.expiration && <p className='invalid'>Please enter the card's expiration date as MM/YY</p>}
                                </div>
                                <div className='flex flex-col w-40'>
                                    <label className='checkout-label'>SSN:</label>
                                    <input
                                        className='checkout-input'
                                        name='ssn'
                                        type='text'
                                        placeholder='123'
                                        ref={ssnInputRef}></input>
                                        {!inputsValidity.ssn && <p className='invalid'>Please enter the card's 3 digit security code</p>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <br />
                <div>
                    <span className='flex flex-row justify-end'>
                        <p className='w-24 mr-9 lg:mr-8 md:mr-7 sm:mr-6'>Subtotal:</p>
                        <p>{subtotal.toFixed(2)}</p>
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
                        <p>{total.toFixed(2)}</p>
                        <br />
                    </span>
                </div>
                <br />
                <div className='align-modal-btns'>
                    <button className='modal-btns' onClick={closeCheckout}>Continue Shopping?</button>
                    <button className='modal-btns' onClick={confirmHandler}>Checkout!</button>
                </div>
                <br />
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Checkout />, document.getElementById('checkout'))
export default Checkout