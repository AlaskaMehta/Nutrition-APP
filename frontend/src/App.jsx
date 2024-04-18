
import './App.css'
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Track from './components/Track'
import { UserContext } from './contexts/UserContext'
import { useState ,useEffect} from 'react'

function App() {

  const [loggedUser,setLoggedUser]=useState(null);
  useEffect(()=>{
        console.log(loggedUser)
    })

  return (
    <>
    
      <UserContext.Provider value={{loggedUser,setLoggedUser}}> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/track' element={<Track/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
      </BrowserRouter>
       </UserContext.Provider>
    </>
  )
}

export default App
