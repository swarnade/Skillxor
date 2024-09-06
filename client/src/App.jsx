import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Applicants from "./pages/Applicants"; // Import Applicants component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/applicants" element={<Applicants />} /> {/* Add Applicants route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
