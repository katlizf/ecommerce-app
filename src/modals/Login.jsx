import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Register from './Register'


function Login() {

    const [showLogin, setShowLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const openLogin = () => {
        setShowLogin(true)
    }
    const closeLogin = () => {
        setShowLogin(false)
    }

    const userCredentials = e => {
        switch (e.target.name) {
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

    const checkUserExists = () => {
        const body = {username, password}
        axios.post(`http://localhost:4000/api/login`, body).then(res => alert(res.data)).catch(err => alert(err.response.data))
        closeLogin()
    }

    return (
        <div>
            <button onClick={e => openLogin()} id='link-btn'>Login</button>
            <ReactModal
                isOpen={showLogin}
                ariaHideApp={false}
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
                        // background: 'orange'
                    }}}>
                <div className='flex flex-col'>
                    <p className='center'>Login</p>
                    <label className='center'>Username</label>
                    <input
                        name='username'
                        type='text'
                        onChange={userCredentials}
                        className='center-input'></input>
                    <label className='center'>Password</label>
                    <input
                        name='password'
                        type='password'
                        onChange={userCredentials}
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