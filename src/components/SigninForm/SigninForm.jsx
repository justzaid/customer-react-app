import { React, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import * as authService from '../../services/authService'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

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


const SigninForm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState([''])
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
          const user = await authService.signin(formData);
          props.setUser(user);
          navigate('/dashboard');
        } catch (error) {
          updateMessage(error.message);
        }
      };
    
    return (
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className='g-0'>
                <MDBCol md='5'>
                    <MDBCardImage src='https://images.pexels.com/photos/8867246/pexels-photo-8867246.jpeg' alt="login form image" className='rounded-start w-100 h-100'/>
                    </MDBCol>

                    <MDBCol md='6'>
                    <MDBCardBody className='d-flex flex-column'>

                    <div className='d-flex flex-row mt-2'>
                        <img 
                        src="https://cdn-icons-png.freepik.com/256/3076/3076141.png?ga=GA1.1.632310140.1737565413&semt=ais_hybrid"
                        alt="Logo"
                        className="me-3" 
                        style={{ width: '50px', height: '50px', color: '#ff6219' }} 
                        />
                        <span className="h1 fw-bold mb-0">AirQue</span>
                    </div>

                    <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                    <form onSubmit={handleSubmit}>
                        <MDBInput wrapperClass='mb-4' size="lg" type='email' id='email' name={'email'} label='Email address' autoComplete='off' onChange={handleChange} value={formData.email}/>
                        <MDBInput wrapperClass='mb-4' size="lg" type='password' id='password' name={'password'} label='Password' autoComplete='off' onChange={handleChange} value={formData.password}/>
                        
                        <MDBBtn className="mb-4 px-5" color='primary' size='lg'>Login</MDBBtn>
                        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>
                    </form>

                    {message && <p style={{ color: 'red' }}>{message}</p>}

                    <div className='d-flex flex-row justify-content-start'>
                        <a href="#!" className="small text-muted me-1">Terms of use.</a>
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

export default SigninForm;