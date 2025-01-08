import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path if needed
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
        <GoogleOAuthProvider clientId="217758845790-257slng4gnj41e2doloqgehirho1n12t.apps.googleusercontent.com"><App/></GoogleOAuthProvider>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

