import Card from '../components/Card'
import { useEffect, useState } from 'react';

function List({location}) {

    const [items, setItems] = useState([]);
    const token = localStorage.getItem('countries_token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let options = {mode: 'cors', headers: {'X-Site-Type': "public"}};
                if(token) {
                    options = {...options, headers : {authorization: `Bearer ${token}`, 'X-Site-Type': "public"}};
                }
                const response = await fetch(`http://localhost:3000/posts/${location}`, options);
                if(response.ok) {
                    const result = await response.json();
                    setItems(result);
                }
            } catch(e) {
                console.log(e);
            }
        }

        fetchData();
    }, [location])


    return(
        items.map( (item, index) => {
            return <Card title={item.title} author={item.author} date={item.date} id={item._id} key={index}/>
        })
    )
}

export default List;