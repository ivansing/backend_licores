
import "./styles/styles.css";



// Components
import Create from "./components/Create";
import CreateCategory from "./components/CreateCategory";
import Edit from "./components/Edit";
import Home from "./pages/Home";
import Alert from "./components/Alert"
import Register from "./components/Register";
import Productos from "./components/Productos";
import Login from "./pages/Login";
import Categorias from "./components/Categorias";



// Router import
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
          }></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/createCategory" element={<CreateCategory />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/alert" element={<Alert />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/productos" element={<Productos />}></Route>
          <Route path="/categorias" element={<Categorias />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
