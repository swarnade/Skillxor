import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/freelancer/Signup";
import { Login } from "./pages/freelancer/Login";
import Applicants from "./pages/Applicants"
import Projects from "./pages/client/Projects"; 
import { ClientSignup } from "./pages/client/ClientSignup";
import { ClientLogin } from "./pages/client/ClientLogin";


function App() {
  const router = createBrowserRouter(Routes)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="freelancer/signup" element={<Signup />} />
        <Route path="freelancer/login" element={<Login />} />

        <Route path="client/signup" element={<ClientSignup />} />
        <Route path="client/login" element={<ClientLogin />} />

        <Route path="/applicants" element={<Applicants />} /> 
        <Route path="/client/projects" element={<Projects />} /> 
      </Routes>
    </BrowserRouter>
  );
}
export default App;
