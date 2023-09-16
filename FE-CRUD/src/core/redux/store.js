import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../features/Users/usersSlice'
import { useDispatch } from 'react-redux'

export  const store = configureStore({
    reducer: { user: userReducer }
  })
  
export  const useAppDispatch = () => useDispatch();

export default store;