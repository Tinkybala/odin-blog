
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './App';
import Header from '../components/nav';
import styles from '../stylesheets/Login.module.css';


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        website: 'public', 
    });

    const [errorMessage, setErrorMessage] = useState('');
    const { isAuthenticated, setIsAuthenticated, setUser, user} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/login",{
            method: "POST",
            headers: { 'Content-Type': 'application/json',},
            mode: "cors",
            body: JSON.stringify(formData),
        })


        if(!response.ok) {
            const result = await response.json()
            console.error(result);
            setErrorMessage(result.message);
        } else {
            const {userID, token, first_name} = await response.json();
            localStorage.setItem('countries_token', token)
            setIsAuthenticated(true);
            setUser({userID: userID, first_name: first_name});
            navigate('/');
        }
    }

    const handleOnChange = async (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    return(
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.box}>
                    <h2>Sign In</h2>
                    <form method="POST" onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputs}>
                                <input type="email" name="email" value={formData.email} placeholder='Email' onChange={handleOnChange} className={styles.input}></input>
                                <input type="password" name="password" value={formData.password} placeholder='Password' onChange={handleOnChange} className={styles.input}></input>
                        </div>
                        <button type="submit">Submit</button>
                        {errorMessage}
                    </form>
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                </div>
            </main>
        </>
    )
}

export default Login;