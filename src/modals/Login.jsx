import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {data} from 'autoprefixer'



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
                isOpen={showModal}
                style={{
                    overlay: {
                        position: 'absolute'
                    },
                    content: {
                        position: 'absolute',
                        top:'10%', 
                        left:'33%',
                        bottom: '10%',
                        right: '10%',
                        width: '35%',
                        height: '60%',
                        border:'2px solid #ccc'
                    }}}>
                <div className='flex flex-col'>
                    <p className='center'>Login Below or Register by Entering a New Username and Password</p>
                    <label className='center'>Username</label>
                    <input
                        name='username'
                        type='text'
                        required
                        value={data.username}
                        className='center-input'></input>
                    <label className='center'>Password</label>
                    <input
                        name='password'
                        type='text'
                        value={data.password}
                        className='center-input'></input>
                    <button onClick={closeModal}>Submit</button>
                </div>

            </ReactModal>
        </div>
    )
}


ReactDOM.createPortal(<Login />, document.getElementById('login'))

export default Login