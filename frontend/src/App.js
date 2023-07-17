import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import Information from "./components/Information"
import List from "./components/InventoryList"
import Update from "./components/ModifyList"
import Create from "./components/CreateItem"
import Remove from "./components/RemoveItem"
import Navb from "./components/Navb"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Shortage from './components/Shortage';



function App() {

  const { user } = useAuthContext();
  // const user = user;
  // console.log(user);

  return (
    <Router>
      <Navb />
      <Routes>
        <Route path="/" exact element={<Information/> } />
        <Route path="/list" exact element={user ? <List/> : <Navigate to="/login" />} />
        <Route path="/update" element={user ? <Update/> : <Navigate to="/login" /> } />
        <Route path="/create" element={user ? <Create/> : <Navigate to="/login" /> } />
        <Route path="/remove" element={user ? <Remove/> : <Navigate to="/login" /> } />
        <Route path="/shortage" element={user ? <Shortage/> : <Navigate to="/login" /> } />
        <Route path="/login" exact element={!user ? <Login/> : <Navigate to="/" /> } />
        <Route path="/signup" exact element={!user ? <Signup/> : <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default App;
