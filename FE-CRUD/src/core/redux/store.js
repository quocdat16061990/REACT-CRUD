import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../features/Users/usersSlice'
import postReducer from '../../features/Posts/postSlice'
import { useDispatch } from 'react-redux'

export  const store = configureStore({
    reducer: { user: userReducer , post: postReducer }
  })
  
export  const useAppDispatch = () => useDispatch();

export default store;