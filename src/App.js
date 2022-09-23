import "./App.css";
import './Sidebar.css'

// Components
import Create from "./components/Create";
import Show from "./components/Show";
import Edit from "./components/Edit";
import Sidebar from "./components/Sidebar";


// Router import
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Show />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/sidebar" element={<Sidebar />}></Route>
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
