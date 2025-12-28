import './App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/Moviedetails'
import {Routes, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
 
  

  return (
    <div>
      <NavBar></NavBar>
    <main className='main-content'>
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/favorites" element={ <Favorites/>}/> 
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
    </main>
    </div>
  )
}



export default App
