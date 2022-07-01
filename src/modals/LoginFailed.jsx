import React, {useState} from 'react'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom'

function LoginFailed() {

    const [showLoginFailed, setShowLoginFailed] = useState(false)

    const openLoginFailed = () => {
        setShowLoginFailed(true)
    }
    const closeLoginFailed = () => {
        setShowLoginFailed(false)
    }

  return (
    <div>
        <button onClick={e => openLoginFailed()}></button>
        <ReactModal
            isOpen={showLoginFailed}
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
                <h1>Login Failed</h1>
                <button>Try Again</button>
                <button>Register as a New User</button>
        </ReactModal>
    </div>
  )
}

ReactDOM.createPortal(<LoginFailed />, document.getElementById('login-failed'))
export default LoginFailed