import React from "react";
import {  Route, Routes } from "react-router";
import App from "../App";
import ChatPage from "../components/ChatPage";

const AppRoutes = () => {
  return (
    
      
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/chat" element={ <ChatPage/>}></Route>
           <Route path="/about" element={<h1>This is About Page</h1>}></Route>
            <Route path="/*" element={<h1>404 not found</h1>}></Route>
        </Routes>

    
  );
};

export default AppRoutes;
