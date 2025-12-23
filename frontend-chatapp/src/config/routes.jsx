import React from "react";
import {  Route, Routes } from "react-router";
import App from "../App";

const AppRoutes = () => {
  return (
    
      
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/chat" element={<h1>This is Chat ui</h1>}></Route>
           <Route path="/about" element={<h1>This is About Page</h1>}></Route>
            <Route path="/*" element={<h1>404 not found</h1>}></Route>
        </Routes>

    
  );
};

export default AppRoutes;
