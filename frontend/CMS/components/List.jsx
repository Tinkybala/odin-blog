import Card from '../components/Card'
import { useEffect, useState } from 'react';

function List({location}) {

    const [items, setItems] = useState([]);
    const token = localStorage.getItem("countries_token");
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/posts/${location}`, {
                mode: 'cors',
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`, 'X-Site-Type': "cms"}
            });
            if(response.ok) {
                const result = await response.json();
                setItems(result);
            } else {
                console.log(response);
            }
        }

        fetchData();
    }, [location])

    return(
        items.map( item => {
            return <Card title={item.title} author={item.author} date={item.date} id={item._id} status={item.status}/>
        })
    )
}

export default List;