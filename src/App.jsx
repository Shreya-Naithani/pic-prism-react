import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import GsapTransition from './Components/GsapTransition';


function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <GsapTransition/>
   <Footer/>
   </BrowserRouter>
   </>
  )
}

export default App
