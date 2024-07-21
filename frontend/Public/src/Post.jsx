import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import List from '../components/List';
import styles from '../stylesheets/Post.module.css';
import {DateTime} from 'luxon'; 
import { AuthContext } from './App';
import Comment from '../components/Comment';
import Header from '../components/nav';
import sanitizer from 'dompurify';



function Post() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState({content: ''});
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem("countries_token");
    let { location, id } = useParams();

    //function to get posts and comments from API
    const fetchData = async () => {
        try {
            const [post, comments] = await Promise.all([
                fetch(`http://localhost:3000/posts/${location}/${id}`, {mode: 'cors'})
                    .then(response => response.json())
                    .then(post => post),
                fetch(`http://localhost:3000/posts/${location}/${id}/comments`, {mode: 'cors'})
                    .then(response => response.json())
                    .then(comments => comments),
            ]);

            setPost(post);
            setComments(comments);
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    //function to post new comment to API
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/posts/${location}/${id}/comments`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })

        if(response.ok) {
            const newComment = await response.json();
            setComments([...comments, newComment]);
            setInput({content: ''});
        }
    }

    //function to manage state change for comment input
    const handleChange = (e) => {
        setInput({content: e.target.value});
    }

    //function that handles comment deletion
    async function handleDelete(commentID, continent, postID) {


        const token = localStorage.getItem("countries_token");
        //send DELETE request
        const response = await fetch(`http://localhost:3000/posts/${continent}/${postID}/comments/${commentID}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    
        if(response.ok) {
            console.log("Comment deleted:");
            fetchData();         /* This reloads the comments after deletion */
        } else {
            const result = await response.json()
            console.log(result.message);
            console.error("Delete failed");
        }
    }

    return(
      <>
        <Header />
        <main className={styles.main}>
        <p>{DateTime.fromISO(post.date).toFormat('yyyy-MM-dd HH:mm')}</p>
        <p>{`Written by: ${post.author}`}</p>
            <div className={styles.post}>
                <h2>{post.title}</h2>
                <div dangerouslySetInnerHTML={{__html: sanitizer.sanitize(post.content)}}></div>
            </div>
            <h2>Comments</h2>
            <div className={styles.comments}>
                {comments.map((comment, index) => {
                    return <Comment userID={user.userID} comment={comment} handleDelete={handleDelete} key={index}/>
                })}
                <form onSubmit={handleSubmit}>
                    <label>
                        Add Comment
                        <input type="text" name="content" onChange={handleChange} value={input.content}></input>
                        <button type="submit">Submit</button>
                    </label>
                </form>
            </div>
        </main>
      </>
    )
}

export default Post;