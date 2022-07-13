import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'
import swal from "sweetalert"


function Register({closeLogin}) {

    const [showRegister, setShowRegister] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validFirstName, setValidFirstName] = useState(false)
    const [formErrors, setFormErrors] = useState({
        firstName: ''
    })

    const openRegister = () => {
        setShowRegister(true)
    }
    const closeRegister = () => {
        setShowRegister(false)
        closeLogin()
    }

    const customerDetails = e => {
        switch (e.target.name) {
            case 'fname':
                setFirstName(e.target.value)
                break
            case 'lname':
                setLastName(e.target.value)
                break
            case 'username':
                setUsername(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            default:
                e.preventDefault()
        }
    }

    const registerHandler = () => {
        const body = {firstName, lastName, username, password}
        axios.post('/register', body).then(res => alert(res.data))
        closeRegister()
        swal("Thanks for registering as a new customer! You'll now be able to login to your account.")
    }

    return (
        <div>
            <button className='modal-btns' onClick={e => openRegister()}>Register a new account</button>
            <ReactModal
                isOpen={showRegister}
                ariaHideApp={false}
                className='register-modal'>
                <div className='flex flex-col'>
                    <p className='modal-title'>Register for a New Account</p>
                    <br />
                    <div className='flex flex-col ml-6'>
                        <label>First Name: </label>
                        <input
                            name='fname'
                            type='text'
                            value={firstName}
                            onChange={customerDetails}
                            className='login-input'></input>
                        <br />
                        <label>Last Name: </label>
                        <input
                            name='lname'
                            type='text'
                            onChange={customerDetails}
                            className='login-input'></input>
                        <br />
                        <label>Username:</label>
                        <input
                            name='username'
                            type='text'
                            onChange={customerDetails}
                            className='login-input'></input>
                        <br />
                        <label>Password:</label>
                        <input
                            name='password'
                            type='password'
                            onChange={customerDetails}
                            className='login-input'></input>
                    </div>
                    <br />
                    <br />
                    <div className='align-modal-btns'>
                        <button className='modal-btns' onClick={closeRegister}>Cancel</button>
                        <button className='modal-btns' onClick={registerHandler}>Submit</button>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Register />, document.getElementById('register'))
export default Register