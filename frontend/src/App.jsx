
import './App.css'
import {BrowserRouter, Routes ,Route,useNavigate} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Track from './components/Track'
import Private from './components/Private'
import { UserContext } from './contexts/UserContext'
import { useState ,useEffect} from 'react'


function App() {

  const [loggedUser,setLoggedUser]=useState(localStorage.getItem("nutrify-user")!=null);
  // const navigate=useNavigate();
  

  return (
    <>
    
      <UserContext.Provider value={{loggedUser,setLoggedUser}}> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/track' element={<Private Component={Track}/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
      </BrowserRouter>
       </UserContext.Provider>
    </>
  )
}

export default App
