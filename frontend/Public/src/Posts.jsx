import { useState } from 'react'
import { useParams } from "react-router-dom";
import List from '../components/List'
import Header from '../components/nav';
import styles from '../stylesheets/Posts.module.css';

function Posts() {

    let { location } = useParams();
    if(!location) {
      location = "";
    }
    return(
      <>
        <Header />
        <main className={styles.main}>
          <h1>{location === "" ? "All" : location}</h1>
          <div className={styles.container}>
            <List location={location}/>
          </div>
        </main>
      </>
    )
  }
  
  export default Posts