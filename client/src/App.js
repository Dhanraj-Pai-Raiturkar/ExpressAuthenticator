import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" caseSensitive element={<Login/>} />
        <Route path="/register" caseSensitive element={<Register/>} />
        <Route path="/dashboard" caseSensitive element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
