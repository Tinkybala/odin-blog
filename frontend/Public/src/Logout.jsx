import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './App';

function Logout() {
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    //delete client token
    localStorage.removeItem("countries_token");

    //reset states
    setIsAuthenticated(false);
    setUser({});

    //redirect to homepage
    navigate('/');
}

export default Logout;