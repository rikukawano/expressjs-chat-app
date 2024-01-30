import "./App.css";
import Navbar from "./components/Navbar";
import { AppProvider } from "./contexts/AppContext";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
