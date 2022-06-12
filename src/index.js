import React from 'react'
import { render } from 'react-dom'
import 'fabric-webpack'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css';

const Index = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
) 

render(<Index />, document.getElementById('root'))
