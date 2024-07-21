import { useState, useContext } from 'react'
import { AuthContext } from './App';
import { useParams, Link } from "react-router-dom";
import List from '../components/List'
import Header from '../components/nav';
import Error from '../components/error';
import styles from '../stylesheets/Posts.module.css';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';


function Posts() {

    let { location } = useParams();
    if(!location) {
      location = "";
    }

    const { isAuthenticated, user} = useContext(AuthContext);

    if(!isAuthenticated) {
      return (
        <>
          <Error />
        </>
      )
    }

    return(
      <>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>{location === "" ? "All" : location}</h1>
          <div className={styles.container}>
            <List location={location}/>
            <Link to="/create" className={styles.create}>
              <span>
                <Icon path={mdiPlus} size={3} color="white"/>
                <p>Create New Post</p>
              </span>
            </Link>
          </div>
        </main>
      </>
    )
  }
  
  export default Posts