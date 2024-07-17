import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Slices/authSlice';
import navSlice from '../Slices/navSlice';

const store = configureStore({
    reducer:{
        auth:authSlice,
        nav:navSlice
    }
});


export default store;