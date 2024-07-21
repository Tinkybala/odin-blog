import Posts from './Posts'
import Post from './Post'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Logout from './Logout'
import Create from './create'
import Update from './Update'


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
        path: "posts/:location/:id/update",
        element: <Update />
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
    {
        path: "create",
        element: <Create />
    }
];

export default routes;