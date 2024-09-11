import { Signup } from "./pages/freelancer/Signup";
import { Login } from "./pages/freelancer/Login";
import Applicants from "./pages/Applicants";
import Projects from "./pages/client/Projects";
import { ClientSignup } from "./pages/client/ClientSignup";
import { ClientLogin } from "./pages/client/ClientLogin";
import Projectsection from "./pages/freelancer/Projectsection";
import Landing from "./pages/Landing"

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
        path:"/employer/projects", element:(<Projects />)
    },
    {
        path:"applicants", element:(<Applicants />)
    },
    {
        path:"/freelancer/projects", element:(<Projectsection />)
    },
    {
        path:"/", element:(<Landing />)
    }

]
export default routes;