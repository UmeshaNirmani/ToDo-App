import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import ToDos from './components/todos';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <Routes>       
          <Route path="/" element={<Home />}  />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<ToDos />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
