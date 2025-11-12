import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AuthProvider>
    <ThemeProvider attribute="class" defaultTheme="light">
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
      </AuthProvider>
  </StrictMode>
);
