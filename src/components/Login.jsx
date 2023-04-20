import React, { useContext, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app)

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {login,} = useContext(AuthContext)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPass, setShowPass] = useState(false)
    const emailRef = useRef()
    

    // location setup
    const from = location.state?.from?.pathname || '/';
    const handleLogin = (event) =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('')
        setSuccess('')
        form.reset()
        login(email, password)
        .then(result =>{
            navigate(from, {replace : true})
            setSuccess('Login Successful')
        })
        .catch(error =>  {
            setError(error.message);
        })

    }

    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
            alert('please type your email')
            return
        }
        
        sendPasswordResetEmail(auth, email)
        .then(result =>{
            alert('please check your email')
        })
        .catch(error =>{
            setError(error.message)
        })
    }


    return (
        <div>
            <Form onSubmit={handleLogin} className='w-25 border rounded p-3 mx-auto mt-4'>
            <h3>Please Login</h3>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={showPass ? 'text' : "password"} name="password" placeholder="Password" required/>
                </Form.Group>
                <p><input onClick={() => setShowPass(!showPass)} type="checkbox" name="" id="" /> Show Password</p>
                <button className='btn btn-link p-0' onClick={handleForgetPassword}>Forgotten Password?</button>
                <input className='btn btn-primary d-block mt-3' variant="primary" type='submit' value={'Login'} />
                <p className='text-danger mt-3'>{error}</p>
                <p className='text-success mt-3'>{success}</p>
                <p>New to smart hotel? <Link to="/register">create a account.</Link></p>
            </Form>
        </div>
    );
};

export default Login;