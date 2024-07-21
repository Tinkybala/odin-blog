import { useContext } from "react";
import { AuthContext } from './App';
import Header from '../components/nav'

function Home() {
  const { isAuthenticated, user} = useContext(AuthContext);

  return(
    <>
      <Header />
      <main>
        <h2>Countries Wiki Content Management System</h2>
        {isAuthenticated && <h3>Hello {user.first_name}!</h3> }
      </main>
    </>
  )
}

export default Home;
