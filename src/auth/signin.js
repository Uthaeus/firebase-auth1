import { useForm } from "react-hook-form";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../store/auth-context";

function Signin() {
    const { handleSubmit, register, reset } = useForm();
    const { signin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    async function submitHandler(data) {
        console.log('sign in', data);

        setIsLoading(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        try {
            await signin(data.email, data.password);
            navigate('/');
        } catch {
            setErrorMessage('Could not sign you in')
        }
        setIsLoading(false);
        reset();
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign In</h2>
                    {errorMessage && <Alert variant={'danger'}>{errorMessage}</Alert>}
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' {...register('email', { required: true })} />
                        </Form.Group>

                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' {...register('password', { required: true})} /> 
                        </Form.Group>

                        <Button type='submit' disabled={isLoading} variant="primary" className="w-100">{isLoading ? 'loading...' : 'Submit'}</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-align-center mt-3">
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    );
}

export default Signin;