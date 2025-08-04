
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
import Clientes from "./components/Clientes";



// Router import
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";


function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                  <Home />
              </ProtectedRoute>
            }></Route>
            <Route path="/create" element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }></Route>
            <Route path="/createCategory" element={
              <ProtectedRoute>
                <CreateCategory />
              </ProtectedRoute>
            }></Route>
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }></Route>
            <Route path="/productos" element={
              <ProtectedRoute>
                <Productos />
              </ProtectedRoute>
            }></Route>
            <Route path="/categorias" element={
              <ProtectedRoute>
                <Categorias />
              </ProtectedRoute>
            }></Route>
            <Route path="/clientes" element={
              <ProtectedRoute>
                <Clientes />
              </ProtectedRoute>
            }></Route>
            <Route path="/alert" element={<Alert />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </AuthProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
