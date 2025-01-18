import React from 'react';
import { Row, Button} from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'; 

const Home = () => {

  // const HandleOnClick = () => {
  //   const navigate = useNavigate();
  //   navigate('/register');
  // }

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Row className="justify-content-center text-center">
            <h1>This is the home page</h1>
            <p>To continue please Register</p>
            <Button href="/register" variant="warning" style={{ width: '20%' }}>
              Register
            </Button>
            <p className='mt-3'>Already have an account?</p>
            <Button href="/login" variant="warning" style={{ width: '20%' }}>
              Login
            </Button>
        </Row>
    </div>
    </>
  );
};

export default Home;