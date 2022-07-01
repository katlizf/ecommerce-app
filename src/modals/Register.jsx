import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'


function Register() {

    const [showRegister, setShowRegister] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const openRegister = () => {
        setShowRegister(true)
    }
    const closeRegister = () => {
        setShowRegister(false)
    }

    const customerDetails = e => {
        switch (e.target.name) {
            case 'fname': 
                setFirstName(e.target.value)
                break;
            case 'lname': 
                setLastName(e.target.value)
                break;
            case 'username': 
                setUsername(e.target.value)
                break;
            case 'password': 
                setPassword(e.target.value)
                break;
            default:
                e.preventDefault()
        }
    }

    const registerHandler = () => {
        const body = {firstName, lastName, username, password}
        axios.post('http://localhost:4000/api/register', body).then(res => alert(res.data))
        closeRegister()
        alert("Thanks for registering as a new customer! You'll now be able to login to your account.")
    }

    return (
        <div>
            <button onClick={e => openRegister()}>Register a new account</button>
            <ReactModal
                isOpen={showRegister}
                ariaHideApp={false}
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
                <div className='flex flex-col'>
                    <p className='center'>Register for a New Account</p>
                    <label className='center'>First Name: </label>
                    <input
                        name='fname'
                        type='text'
                        onChange={customerDetails}
                        className='center-input'></input>
                    <label className='center'>Last Name: </label>
                    <input
                        name='lname'
                        type='text'
                        onChange={customerDetails}
                        className='center-input'></input>
                    <label className='center'>Username</label>
                    <input
                        name='username'
                        type='text'
                        onChange={customerDetails}
                        className='center-input'></input>
                    <label className='center'>Password</label>
                    <input
                        name='password'
                        type='password'
                        onChange={customerDetails}
                        className='center-input'></input>
                    <button onClick={closeRegister}>Cancel</button>
                    <button onClick={registerHandler}>Submit</button>
                </div>
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Register />, document.getElementById('register'))
export default Register