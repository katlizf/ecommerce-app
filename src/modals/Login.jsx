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
            <button id='link-btn' onClick={e => openLogin()}>Login</button>
            <ReactModal
                isOpen={showLogin}
                ariaHideApp={false}
                style={{
                    content: {
                        position: 'absolute',
                        top:'10%', 
                        left: '37%',
                        bottom: '10',
                        width: '26%',
                        height: '60%'
                    }}}>
                <div className='flex-col'>
                    <p class='modal-title'>Login</p>
                    <br />
                    <label>Username:</label>
                    <input
                        name='username'
                        type='text'
                        onChange={userCredentials}
                        className='center-input'></input>
                    <br />
                    <label>Password:</label>
                    <input
                        name='password'
                        type='password'
                        onChange={userCredentials}
                        className='center-input'></input>
                    <br />
                    <div class='align-modal-btns'>
                        <button class='modal-btns' onClick={closeLogin}>Cancel</button>
                        <button class='modal-btns' onClick={checkUserExists}>Login</button>
                    </div>
                </div>
                <br />
                <br />
                <Register closeLogin={closeLogin}/>
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Login />, document.getElementById('login'))
export default Login