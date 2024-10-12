import Home from "./home";
import Login from "./login";
import Register from "./register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

// 定义
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
