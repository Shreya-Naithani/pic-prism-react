import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import GsapTransition from './Components/GsapTransition';
import {Provider} from 'react-redux';
import store from './Redux/Store/store';


function App() {
  return (
   <>
   <Provider store={store}>
   <BrowserRouter>
   <Navbar/>
   <GsapTransition/>
   <Footer/>
   </BrowserRouter>
   </Provider>
   </>
  )
}

export default App
