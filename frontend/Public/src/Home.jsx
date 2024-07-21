import { useContext } from "react";
import { AuthContext } from './App';
import Header from '../components/nav'

function Home() {
  const { isAuthenticated, user} = useContext(AuthContext);

  return(
    <>
      <Header />
      <main>
        <h2>Welcome to the Countries Wiki</h2>
        <h3>Information about countries of the world!</h3>
        {isAuthenticated && <h3>Hello {user.first_name}!</h3> }
      </main>
    </>
  )
}

export default Home;
