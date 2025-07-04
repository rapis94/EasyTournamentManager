import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import ContextoLoginProvider from "./contextos/loginContext"
import './App.css'
import Login from './views/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Front from './views/Front';
function App() {

  return (
    <ContextoLoginProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/front/*" element={<Front />} />
      </Routes>
    </ContextoLoginProvider>
  )
}

export default App
