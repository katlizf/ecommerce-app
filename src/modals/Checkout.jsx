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

    const makeChanges = e => {
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
        <div>
            <button onClick={e => openCheckout()}>Checkout</button>
            <ReactModal
                isOpen={showCheckout}
                style={{
                    overlay: {
                        position: 'absolute'
                    },
                    content: {
                        position: 'absolute',
                        top: '10%',
                        left: '33%',
                        bottom: '10%',
                        right: '10%',
                        width: '35%',
                        height: '60%',
                        border: '2px solid #ccc'
                    }
                }}>
                <p>Please complete your shipment details below to checkout</p>
                <div className='flex flex-col'>
                    <label>First name: 
                        <input className='user-input' name='fname' onChange={makeChanges}></input></label>
                    <label>Last name: 
                        <input className='user-input' name='lname' onChange={makeChanges}></input></label>
                </div>
                <div className='flex flex-col'>
                    <label>Address: 
                        <input className='user-input' name='address' onChange={makeChanges}></input></label>
                    <label>City: 
                        <input className='user-input' name='city' onChange={makeChanges}></input></label>
                    <label>State: 
                        <input className='user-input' name='state' onChange={makeChanges}></input></label>
                    <label>Zip code: 
                        <input className='user-input' name='zcode' onChange={makeChanges}></input></label>
                </div>
                <div className='flex flex-col'>
                    <label>Phone number: 
                        <input className='user-input' name='phone' onChange={makeChanges}></input></label>
                    <label>Email: 
                        <input className='user-input' name='email' onChange={makeChanges}></input></label>
                </div>
                <div>
                    <span className='flex flex-row'>
                        <p>Subtotal: </p>
                        <p>{subtotal}</p>
                    </span>
                    <span className='flex flex-row'>
                        <p>shipping: </p>
                        <p>{shipping.toFixed(2)}</p>
                        <p>FREE</p>
                    </span>
                    <span className='flex flex-row'>
                        <p>Total: </p>
                        <p>{total}</p>
                    </span>
                </div>
                <button onClick={closeCheckout}>Cancel</button>
                <button onClick={checkoutHandler}>Checkout</button>
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Checkout />, document.getElementById('checkout'))
export default Checkout