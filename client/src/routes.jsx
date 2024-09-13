import { Signup } from "./pages/freelancer/Signup";
import { Login } from "./pages/freelancer/Login";
import Applicants from "./pages/Applicants";
import Projects from "./pages/client/Projects";
import { ClientSignup } from "./pages/client/ClientSignup";
import { ClientLogin } from "./pages/client/ClientLogin";
import Projectsection from "./pages/freelancer/Projectsection";
import Landing from "./pages/Landing"
import Profile from "./pages/freelancer/Profile";
import Serverstatus from "./pages/Serverstatus";
import Applied from "./pages/client/Applied";
const routes=[

    //Main Landing Page
    {
        path:"/", element:(<Landing />)
    },


    //Freelancer Interface Route
    {
        path:"/freelancer/signup", element:(<Signup />)
    },
    {
        path:"/freelancer/login", element:(<Login />)
    },
    {
        path:"/freelancer/projects", element:(<Projectsection />)
    },
    {
        path:'/freelancer/profile/:username',element:(<Profile/>)
    },


    //Employer Interface Route
    {
        path:"/employer/signup", element:(<ClientSignup />)
    },
    {
        path:"/employer/login", element:(<ClientLogin />)
    },
    {
        path:"/employer/projects", element:(<Projects />)
    },
    {
        path:'/project/applied/:id',element:(<Applied/>)
    },
    {
        path:"applicants", element:(<Applicants />)
    },

    //Server Info
    {
        path:'/serverstatus',element:(<Serverstatus/>)
    },


]
export default routes;