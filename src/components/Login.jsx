import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Redirect} from 'react-router-dom'



function Login() {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    const checkUserExists = user => {
        const body = {id: user.id, username: user.username, password: user.password}
        axios.post(`http://localhost:4000/api/login`, body).then(res => res.data)
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
                <button onClick={closeModal}>Submit</button>
            </ReactModal>
        </div>
    )
}


ReactDOM.createPortal(<Login />, document.getElementById('modal'))

export default Login