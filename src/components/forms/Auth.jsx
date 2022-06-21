import React from 'react'
import {useFormik} from 'formik'

function LoginForm() {

    const formik = useFormik({
        initialValues: {
            username:'',
            password:'',
            register: false
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={formik.values.username}
                    onChange={formik.handleChange}></input>
                <input
                    name='password'
                    type='text'
                    placeholder='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange}></input>
            </form>
        </div>
    )
}

export default LoginForm