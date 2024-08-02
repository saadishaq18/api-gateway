import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserLogin } from "../components/user/auth/login/UserLogin";
import { UserRegister } from "../components/user/auth/register/ClientRegister";
import UserDashboard from "../components/user/dashboard/Index";
import { UserContent } from "../components/user/common/UserContent";
import { HomePage } from "../components/user/dashboard/HomePage";
import { UserProfile } from "../components/user/dashboard/UserProfile";

export const AppRoutes = () => {
  const storedToken = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  useEffect(() => {
    if (storedToken) {
      // Redirect to dashboard when a token is present
      // navigate("/dashboard/home");
    }
  }, [storedToken]);
  
  return (
    <Routes>
       {storedToken ? (
        <>
          <Route element={<UserDashboard />} >
            <Route index element={<Navigate to="/dashboard/home" />} />
            <Route path="/dashboard/*" element={<UserContent />}>
              <Route index element={<Navigate to="/dashboard/home" />} />
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Route>       
              </>
        ) : (
          <>
            <Route index element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
          </>
      )}
        </Routes>
      );
};


