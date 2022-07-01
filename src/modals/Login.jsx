import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Register from './Register'



function Login() {

    const [showLogin, setShowLogin] = useState(false)

    const openLogin = () => {
        setShowLogin(true)
    }
    const closeLogin = () => {
        setShowLogin(false)
    }

    const checkUserExists = user => {
        const body = {id: user.id, username: user.username, password: user.password}
        axios.post(`http://localhost:4000/api/login`, body).then(res => alert(res.data)).catch(err => alert(err.response.data))
        closeLogin()
    }

    return (
        <div>
            <button onClick={e => openLogin()}>Login</button>
            <ReactModal
                isOpen={showLogin}
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
                    <p className='center'>Login</p>
                    <label className='center'>Username</label>
                    <input
                        name='username'
                        type='text'
                        required
                        value=''
                        className='center-input'></input>
                    <label className='center'>Password</label>
                    <input
                        name='password'
                        type='text'
                        value=''
                        className='center-input'></input>
                    <button onClick={closeLogin}>Cancel</button>
                    <button onClick={checkUserExists}>Login</button>
                </div>
                <Register />
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Login />, document.getElementById('login'))
export default Login