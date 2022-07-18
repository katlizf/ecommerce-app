import React, {useRef, useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'
import swal from "sweetalert"

// should style errors

const isEmpty = value => value.trim() === ''


function Register({closeLogin}) {

    const [showRegister, setShowRegister] = useState(false)
    const [inputsValidity, setInputsValidity] = useState({
        firstName: true,
        lastName: true,
        username: true,
        password: true
    })

    const firstNameInputRef = useRef()
    const lastNameInputRef = useRef()
    const usernameNameInputRef = useRef()
    const passwordNameInputRef = useRef()


    const confirmHandler = e => {
        e.preventDefault()

        const enteredFirstName = firstNameInputRef.current.value
        const enteredLastName = lastNameInputRef.current.value
        const enteredUsername = usernameNameInputRef.current.value
        const enteredPassword = passwordNameInputRef.current.value

        const enteredFirstNameIsValid = !isEmpty(enteredFirstName)
        const enteredLastNameIsValid = !isEmpty(enteredLastName)
        const enteredUsernameIsValid = !isEmpty(enteredUsername)
        const enteredPasswordIsValid = !isEmpty(enteredPassword)

        setInputsValidity({
            firstName: enteredFirstNameIsValid,
            lastName: enteredLastNameIsValid,
            username: enteredUsernameIsValid,
            password: enteredPasswordIsValid
        })

        const formIsValid = 
            enteredFirstNameIsValid &&
            enteredLastNameIsValid &&
            enteredUsernameIsValid &&
            enteredPasswordIsValid

        if (!formIsValid) {
            return
        }

        const registerHandler = () => {
            const body = {enteredFirstName, enteredLastName, enteredUsername, enteredPassword}
            axios.post('/register', body).then(res => alert(res.data))
            closeRegister()
            swal("Thanks for registering as a new customer! You'll now be able to login to your account.")
        }

        if (formIsValid) {
            registerHandler()
            return
        }
    }

    const openRegister = () => {
        setShowRegister(true)
    }
    const closeRegister = () => {
        setShowRegister(false)
        closeLogin()
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
                            ref={firstNameInputRef}
                            className='login-input'></input>
                            {!inputsValidity.firstName && <p>Please enter your first name</p>}
                        <br />
                        <label>Last Name: </label>
                        <input
                            name='lname'
                            type='text'
                            ref={lastNameInputRef}
                            className='login-input'></input>
                            {!inputsValidity.lastName && <p>Please enter your last name</p>}
                        <br />
                        <label>Username:</label>
                        <input
                            name='username'
                            type='text'
                            ref={usernameNameInputRef}
                            className='login-input'></input>
                            {!inputsValidity.username && <p>Please enter a username</p>}
                        <br />
                        <label>Password:</label>
                        <input
                            name='password'
                            type='password'
                            ref={passwordNameInputRef}
                            className='login-input'></input>
                            {!inputsValidity.password && <p>Please enter a password</p>}
                    </div>
                    <br />
                    <br />
                    <div className='align-modal-btns'>
                        <button className='modal-btns' onClick={closeRegister}>Cancel</button>
                        <button className='modal-btns' 
                        onClick={confirmHandler}
                        >Submit</button>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Register />, document.getElementById('register'))
export default Register