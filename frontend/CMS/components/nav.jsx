import { useContext } from "react";
import { AuthContext } from '../src/App';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Header.module.css';

function Header() {

    const { isAuthenticated, user} = useContext(AuthContext);
    return(
        <header className={styles.header}>
        <h1 className={styles.title}><Link to="/">Countries CMS</Link></h1>
            <nav className={styles.nav}>
            <ul className={styles.options}>
                {isAuthenticated &&
                    <>
                        <li><Link to="/posts/North America">North America</Link></li>
                        <li><Link to="/posts/South America">South America</Link></li>
                        <li><Link to="/posts/Europe">Europe</Link></li>
                        <li><Link to="/posts/Asia">Asia</Link></li>
                        <li><Link to="/posts/Australia">Australia</Link></li>
                        <li><Link to="/posts/Africa">Africa</Link></li>
                    </>
                }
                <li>{isAuthenticated ? <Link to="/logout">Logout</Link> :<Link to="/login">Login</Link>}</li>
            </ul>
            </nav>
        </header>
    );
}

export default Header;