import Posts from './Posts'
import Post from './Post'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Logout from './Logout'


const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "posts",
        element: <Posts/>
    },
    {
        path: "posts/:location",
        element: <Posts/>,
    },
    {
        path: "posts/:location/:id",
        element: <Post/>,
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "signup",
        element: <Signup />
    },
    {
        path: "logout",
        element: <Logout />
    },
];

export default routes;