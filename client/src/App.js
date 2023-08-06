import { useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" caseSensitive element={<Login/>} />
        <Route path="/register" caseSensitive element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
