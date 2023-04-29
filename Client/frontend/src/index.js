import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './components/about'
import PostgreSQL from './components/postgresql'
import MongoDB from './components/mongodb'
import MySQL from './components/mysql'
import AWS from './components/aws'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Connections from './pages/ManageConnections'
import GetData from './pages/GetDataFromAll'
const root = ReactDOM.createRoot(document.getElementById('root'));

const user = localStorage.getItem('token');
root.render(
  <Router>
    <Routes>
    { user &&  <Route path="/" element={<App />} /> }
    <Route path="/signup" exact element={<Signup />} />
    <Route path="/login" exact element={<Login />} />
     {user && <Route path="/about" element={<About />} /> }
     {user && <Route path="/postgresql" element={<PostgreSQL />} />}
     {user && <Route path="/mysql" element={<MySQL />} />}
     {user && <Route path="/aws" element={<AWS />} />}
     {user && <Route path="/mongodb" element={<MongoDB />} />}
     {user && <Route path="/manageConnections" element={<Connections />} />}
     {user && <Route path="/getData" element={<GetData />} />}
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
