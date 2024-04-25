import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from 'thirdweb/react';
import { client } from './utils/constants';
import App from './App';
import './index.css';
// import { StateContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider clientId = {client}>
        <Router>
            {/* <StateContextProvider> */}
                <App />
            {/* </StateContextProvider> */}
        </Router>
    </ThirdwebProvider>
)