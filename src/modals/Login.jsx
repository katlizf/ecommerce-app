import React from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'
import Register from './Register'


function Login({checkCustExists, setUsername, setPassword, logout, loggedInUser, openLogin, setShowLogin, showLogin}) {

    const closeLogin = () => {
        setShowLogin(false)
    }

    const userCredentials = e => {
        switch (e.target.name) {
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


    return (
        <div class='nav-link'>
            <button id='login/logout' className='nav-link' onClick={e => {
                openLogin()
                logout()}}>Login</button>
            <ReactModal
                isOpen={showLogin}
                ariaHideApp={false}
                style={{
                    content: {
                        position: 'absolute',
                        top: '10%',
                        left: '37%',
                        bottom: '10',
                        width: '26%',
                        height: '60%'
                    }
                }}>
                <div className='flex-col'>
                    <p className='modal-title'>Login</p>
                    <br />
                    <div className='flex flex-col ml-6'>
                        <label>Username:</label>
                        <input
                            name='username'
                            type='text'
                            onChange={userCredentials}
                            className='login-input'></input>
                        <br />
                        <label>Password:</label>
                        <input
                            name='password'
                            type='password'
                            onChange={userCredentials}
                            className='login-input'></input>
                    </div>
                    <br />
                    <div className='align-modal-btns'>
                        <button className='modal-btns' onClick={closeLogin}>Cancel</button>
                        <button className='modal-btns' onClick= {() => {
                            checkCustExists()
                            closeLogin()
                            }}>Login</button>
                    </div>
                </div>
                <br />
                <br />
                <Register closeLogin={closeLogin} />
            </ReactModal>
        </div>
    )
}

ReactDOM.createPortal(<Login />, document.getElementById('login'))
export default Login