import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {sendEmailVerification} from 'firebase/auth'


const Register = () => {
    const {register} = useContext(AuthContext)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPass, setShowPass] = useState(false)

    const handleRegister = (event) =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        setSuccess('')
        setError('')

        if(!/(?=.*?[A-Z])/.test(password)){
            setError('One Letter Should be Uppercase')
            return;
        }
        else if(password !== confirm){
            setError('Invalid confirm password!!')
            return;
        }
        else if(password.length < 6){
            setError('At least 6 character!!')
            return;
        }
        register(email, password)
        .then(result => {
            const loggedUser = result.user;
            form.reset()
            setSuccess('successfully create account')
            setShowPass(false)
            handleVerification(loggedUser)
        })
        .catch(error =>{
            console.log(error);
            setError(error.message)
        })
    }

    const handleVerification = (loggedUser) =>{
        sendEmailVerification(loggedUser)
        .then(result =>{
            alert('please verify your email')
        })
        .catch(error => {
            setError(error)
        })
    }


    return (
        <div>
            <Form onSubmit={handleRegister} className='w-25 border rounded p-3 mx-auto mt-4'>
            <h3>Please Register</h3>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={showPass ? 'text' : "password"} name='password' placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type={showPass ? 'text' : "password"} name='confirm' placeholder="confirm password" required />
                </Form.Group>
                <p><input onClick={() => setShowPass(!showPass)} type="checkbox" name="" id="" /> Show Password</p>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <input className='btn btn-primary' variant="primary" type='submit' value={'Register'} />
                <p className='text-danger mt-3'>{error}</p>
                <p className='text-success mt-3'>{success}</p>
            </Form>
        </div>
    );
};

export default Register;