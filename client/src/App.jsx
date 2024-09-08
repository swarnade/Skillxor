import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Applicants from "./pages/Applicants"
import Projects from "./pages/Projects"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/applicants" element={<Applicants />} /> 
        <Route path="/projects" element={<Projects />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
