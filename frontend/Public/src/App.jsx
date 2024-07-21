import routes from './routes';
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { createContext, useState, useEffect, useCallback } from 'react';
import './App.css';

const router = createBrowserRouter(routes);

//create context for isAuthenticated state
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userID: '',
  setUserID: () => {},
})

//function to check token
async function authenticate() {
  const token = localStorage.getItem("countries_token");

  const response = await fetch("http://localhost:3000/authenticate", {
    method: "POST",
    headers: {Authorization: `Bearer ${token}`},
  })

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    userID: '',
    first_name: '',
  });


  //check token on first load of website
  useEffect(() => {
    authenticate()
      .then(result => {
        setIsAuthenticated(result.authenticated);
        setUser({
          userID: result.userID,
          first_name: result.first_name,
        })
      })
      .catch(e => {
        console.log(e);
        setIsAuthenticated(false);
        setUser({}); 
      })
  }, [])


  return(
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App;
