import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useAuth } from '../store/auth-context';

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {

            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch {
            setErrorMessage('Could not sign you up');
        }
        setIsLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {errorMessage && <Alert variant={'danger'}>{errorMessage}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id='password-confirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Button type='submit' disabled={isLoading} className='w-100' variant='primary'>{isLoading ? <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true'> Loading...</Spinner>  : 'Submit'}</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/signin'>Sign In</Link> 
            </div>
        </>
    );
}

export default Signup;