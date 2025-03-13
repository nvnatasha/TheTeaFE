import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css';
import Login from "./Login/Login.jsx";
import Admin from "./Admin/Admin.jsx";
import Customers from "./Customers/Customers.jsx";
import Subscriptions from "./Subscriptions/Subscriptions.jsx";
import Teas from "./Teas/Teas.jsx";

function App() {
  const [userData, setUserData] = useState([])

  return (
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData}/>} />
        <Route path="/:username" element={<Admin setUserData={setUserData} userData={userData}/>} />
        
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:customerId" element={<Customers />} />

        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subscriptions/:subscriptionId" element={<Subscriptions />} />

        <Route path="/teas" element={<Teas />} />
        <Route path="/teas/:teaId" element={<Teas />} />

        <Route path="/customers/:customerId/subscriptions/:subscriptionId/teas" element={<Teas />} />
        <Route path="/subscriptions/:subscriptionId/teas" element={<Teas />} />
        <Route path="/teas/:teaId" element={<Teas />} />
      </Routes>
  );
}

export default App;
