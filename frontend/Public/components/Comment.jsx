import {DateTime} from 'luxon'; 
import { useParams, useNavigate } from 'react-router';



function Comment({comment, userID, handleDelete}) {
    const {location, id} = useParams();
    

    let date_formatted = DateTime.fromISO(comment.date).toFormat('yyyy-MM-dd HH:mm');

        return(
            <div>
                <h3>{comment.author}</h3>
                <p>{comment.content}</p>
                <p>{`Date: ${date_formatted}`}</p>
                {comment.author_id === userID && <button onClick={() => handleDelete(comment._id, location, id)}>Delete</button>}
                <hr/>
            </div>
        )
}


export default Comment;