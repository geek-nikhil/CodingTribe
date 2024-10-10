import React from 'react'
import Calendar from './Calendar'
import { useDispatch } from 'react-redux';  
import { addUser } from '../utilities/userSlice';
function Main() {
  const dispatch = useDispatch();
  const user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const token =  localStorage.getItem('token') || null;
  dispatch(addUser({ token: token, userInfo: user }));

  console.log(user )
  console.log(token)  
  return (
    <>
    <div>
      <Calendar/>
    </div>
    </>  
)
}

export default Main
