
import React, {useState} from "react";
import Login from "./Login"
import RegisterUser from "./SignUp"
import Dashboard from "./Dashboard"
import Home from "./Home";
import './App.css'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'





function App() {



//user authentication state
const [isAutheticated, setIsAuthenticated] = useState(false)
const [userId, setUserId] = useState('')
const [userName, setUserName] = useState('')




const ProtectedRoute = ({ isAuth, redirectPath}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};



  return(
      
    <>
   
 <Routes>
        <Route index element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login  setIsAuthenticated={setIsAuthenticated}
                                              setUserId = {setUserId}
                                              setUserName = {setUserName}/>} />
        <Route path="/signUp" element={<RegisterUser/>} />
        
        <Route element={<ProtectedRoute isAuth={isAutheticated} redirectPath={'login'} />}>
          <Route path="/dashboard" element={<Dashboard userId={userId}
                                                       userName={userName}/>} />
        </Route>
       
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
         
  </Routes>

</>
  )
}

export default App;
