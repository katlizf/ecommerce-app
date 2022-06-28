import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom'



function Login() {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div>
            <button onClick={e => openModal()}>Login</button>
            <ReactModal 
                isOpen={showModal}>
                    <p>Login Below:</p>
                    <input
                        name='username'
                        type='text'
                        placeholder='Username'></input>
                    <input
                        name='password'
                        type='text'
                        placeholder='Password'></input>
                    <button onClick={closeModal}>Close</button>
                </ReactModal>
        </div>
    )
}


ReactDOM.render(<Login />, document.getElementById('root'))

export default Login