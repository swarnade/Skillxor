import { Signup } from "./pages/freelancer/Signup";
import { Login } from "./pages/freelancer/Login";
import Applicants from "./pages/Applicants";
import Projects from "./pages/client/Projects";
import { ClientSignup } from "./pages/client/ClientSignup";
import { ClientLogin } from "./pages/client/ClientLogin";
import Projectsection from "./pages/freelancer/Projectsection";

const routes=[
    {
        path:"/freelancer/signup", element:(<Signup />)
    },
    {
        path:"/freelancer/login", element:(<Login />)
    },
    {
        path:"/employer/signup", element:(<ClientSignup />)
    },
    {
        path:"/employer/login", element:(<ClientLogin />)
    },
    {
        path:"projects", element:(<Projects />)
    },
    {
        path:"applicants", element:(<Applicants />)
    },
    {
        path:"projectssection", element:(<Projectsection />)
    },

]
export default routes;