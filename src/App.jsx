import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  function ProtectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      navigate("/Login");
    }
    return children
  }

  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/Register" element={<Register></Register>}></Route>
        <Route
          index
          element={
            <ProtectedRoute isAuthenticated={false}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
