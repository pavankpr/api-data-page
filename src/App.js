import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => (
  <>
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
  </>
);

export default App;
