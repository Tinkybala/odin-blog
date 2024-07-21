import { Link } from 'react-router-dom';
import Header from '../components/nav';
import styles from '../stylesheets/Signup.module.css';

function Signup() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            mode: "cors",
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({
                email: e.target[0].value,
                password: e.target[1].value,
                password2: e.target[2].value,
                first_name: e.target[3].value,
                last_name: e.target[4].value,
            })
        })

        const data = await response.json();
        console.log(data);
    }

    return(
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.box}>
                    <form method="POST" onSubmit={handleSubmit} className={styles.form}>
                        <label>
                            E-mail
                            <input type="email" name="email"></input>
                        </label>
                        <label>
                            Password
                            <input type="password" name="password"></input>
                        </label>
                        <label>
                            Confirm Password
                            <input type="password" name="password2"></input>
                        </label>
                        <label>
                            First Name
                            <input type="text" name="first_name"></input>
                        </label>
                        <label>
                            Last Name
                            <input type="text" name="last_name"></input>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </main>
        </>
    )
}

export default Signup;