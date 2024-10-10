import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupForm from './SignupForm';
import Main from './Main';
import ActivitySubmission from './ActivitySubmission';
import { useDispatch } from 'react-redux';
import { addUser } from '../utilities/userSlice';
function Body() {
  const dispatch = useDispatch();
  const user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const token =  localStorage.getItem('token') || null;
  dispatch(addUser({ token: token, userInfo: user }));

  console.log(user )
  console.log(token)  
            const appRouter = createBrowserRouter([
           {
            path : "/", 
            element : <SignupForm />
             },
            {
            path : "/main", 
            element : <Main />
              },
              {
                path : "/activitysub", 
                element : <ActivitySubmission />
                 }

            ]);
            return <RouterProvider router={appRouter} />;
}

export default Body;
