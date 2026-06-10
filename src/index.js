import React from 'react';
import { createRoot } from 'react-dom/client';  // ← import from 'react-dom/client'
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Map from "./pages/Map";

const root = createRoot(document.getElementById('root'));  // ← pass the DOM element here
root.render(                                               // ← then call .render() on it
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="map" element={<Map />} />
    </Routes>
  </BrowserRouter>
);