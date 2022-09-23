import "./styles/App.css";


// Components
import Create from "./components/Create";
import Show from "./components/Show";
import Edit from "./components/Edit";





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
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
