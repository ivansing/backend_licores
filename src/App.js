//import "./styles/App.css";
import "./styles/styles.css"

// Components
import Create from "./components/Create";
import Edit from "./components/Edit";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import Register from "./components/Register";
import Productos from "./components/Productos";
import Login from "./pages/Login";
import Categorias from "./components/Categorias";

// Router import
import { BrowserRouter, Route, Routes } from "react-router-dom";






function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/productos" element={<Productos />}></Route>
          <Route path="/categorias" element={<Categorias />}></Route>
          <Route path="/login" element={<Login />}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
