import styles from '../stylesheets/Card.module.css'
import { Link } from 'react-router-dom'

function Card({src, title, author, date, id}) {
    return(
        <Link to={id} className={styles.card}>
            <img src={src} alt="image" className={styles.image}/>
            <div className={styles.info}>
                <h2>{title}</h2>
                <p>Written by: {author}</p>
                <p>Posted on : {date}</p>
            </div>
        </Link>
    )
}

Card.defaultProps = {
    src: "../src/assets/earth-globe_2086111.png",
    title: "Title",
    author: "Author",
    date: "date"
};

export default Card;