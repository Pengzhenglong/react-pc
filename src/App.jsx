import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/Login/index.jsx";
import Layout from "@/pages/Layout/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
