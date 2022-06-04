

import React from 'react';
import ReactDom from 'react-dom';
import './style.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BookingContext from './BookingContext';





ReactDom.render(
  <BrowserRouter>
    <BookingContext>
      <App />
    </BookingContext>
  </BrowserRouter>,
  document.getElementById('root'));
