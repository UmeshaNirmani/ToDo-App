import React, { useState } from 'react';
import { Row, Button, Form, Container, Card, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import { Signup } from '../api/index';
import { render } from '@testing-library/react';

const Register = () => {
  const navigate = useNavigate();

  // Form validation
  const validationSchema = Yup.object({
    Name: Yup.string().required('* Required'),
    Email: Yup.string().email('Invalid email address').required('* Required'),
    Password: Yup.string().min(4, 'Password must be at least 4 characters').required('* Required'),
  });
  const formik = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Password: '',
    },
    validationSchema,

    // Form submission
    onSubmit: async (values, onSubmitProps) => {        
      try {
        const response = await Signup(values);         
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        if(response.status === 200){
          navigate('/login');
        } 
      } catch (error) {
        console.error('Error adding user:', error);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        onSubmitProps.setErrors({ Name: 'Registration failed.' + {error} + 'Please try again.' });
      }
    },
  });

  return (
    <>
      <Container
        fluid
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Col xs={6}>
          <Card style={{ padding: '25px' }}>
            <h5 className="text-center">User Registration</h5> 
            <Alert onSubmit={formik.setErrors} variant="danger"></Alert>       
            <Form role="form" onSubmit={formik.handleSubmit}>            
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Name"
                  placeholder="Enter Name"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.Name && Boolean(formik.errors.Name)}
                />
                {formik.touched.Name && formik.errors.Name && (
                  <Form.Text className="text-danger">{formik.errors.Name}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  placeholder="Enter email address"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.Email && Boolean(formik.errors.Email)}
                />
                {formik.touched.Email && formik.errors.Email && (
                  <Form.Text className="text-danger">{formik.errors.Email}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  placeholder="Password"
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.Password && Boolean(formik.errors.Password)}
                />
                {formik.touched.Password && formik.errors.Password && (
                  <Form.Text className="text-danger">{formik.errors.Password}</Form.Text>
                )}
              </Form.Group>

              <Row className="justify-content-center">
                <Button variant="primary" type="submit" style={{ width: '50%' }}>
                  Submit
                </Button>
              </Row>
            </Form>
            <div className='mb-3 mt-3 text-center'>Already registered? <a href='/login'>Log in</a></div>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Register;