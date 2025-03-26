import { React, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import * as authService from '../../services/authService'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './SignupForm.css'

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';


const SignupForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState([''])
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    });

    const updateMessage = (msg) => {
        setMessage(msg);
      };

    const handleChange = (event) => {
    updateMessage('');
    setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const newUserResponse = await authService.signup(formData);
          props.setUser(newUserResponse.user);
          navigate('/dashboard');
        } catch (error) {
          updateMessage(error.message);
        }
      };

    const { username, email, password, passwordConf } = formData;

    const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
    };
    
    return (
        <MDBContainer className="my-20 max-w-7xl">
            <MDBCard>
                <MDBRow className='g-3'>
                    <MDBCol md='4'>
                        <MDBCardImage src='https://images.unsplash.com/photo-1628445419644-13f0a9f0a9c0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Signup form image" className='rounded-start w-100 h-100'/>
                    </MDBCol>

                    <MDBCol md='5'>
                        <MDBCardBody className='d-flex flex-column'>

                        <div className='d-flex flex-row mt-2'>
                            <img 
                            src="https://cdn-icons-png.freepik.com/256/3076/3076141.png?ga=GA1.1.632310140.1737565413&semt=ais_hybrid"
                            alt="Logo"
                            className="me-3" 
                            style={{ width: '50px', height: '50px', color: '#ff6219' }} 
                            />
                            <span className="company h1 fw-bold mb-0">Airque</span>
                        </div>

                        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Create an account</h5>

                        <form onSubmit={handleSubmit}>
                            <MDBInput wrapperClass='mb-4' size="lg" type='text' id='username' name='username' label='Username' autoComplete='off' onChange={handleChange} value={username}/>
                            <MDBInput wrapperClass='mb-4' size="lg" type='email' id='email' name='email' label='Email address' autoComplete='new-email' onChange={handleChange} value={email}/>
                            <MDBInput wrapperClass='mb-4' size="lg" type='password' id='password' name='password' label='Password' autoComplete='off' onChange={handleChange} value={password}/>
                            <MDBInput wrapperClass='mb-4' size="lg" type='password' id='confirm' name='passwordConf' label='Password' autoComplete='off' onChange={handleChange} value={passwordConf}/>
                            
                            <MDBBtn className="mb-4 px-5" color='primary' size='lg' disabled={isFormInvalid()}>Submit</MDBBtn>

                            <p className="mb-5 pb-lg-2">Already have an account? <Link to="/signin" style={{color: 'darkorange'}}>Sign in here</Link></p>
                        </form>

                        {message && <p style={{ color: 'red' }}>{message}</p>}

                        <div className='d-flex flex-row justify-content-start'>
                            <a href="#!" className="small text-muted me-1">Terms of use</a>
                        </div>
                        <div className='d-flex flex-row justify-content-start'>
                            <a href="#!" className="small text-muted">Privacy policy</a>
                        </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
}

export default SignupForm;