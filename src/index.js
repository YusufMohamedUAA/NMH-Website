import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // corrected import
import App from './App';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Map from "./pages/Map";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
      
        
      </Route>
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />}/>
      <Route path="map" element={<Map/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
