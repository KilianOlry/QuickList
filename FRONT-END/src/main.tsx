import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Nav from "./components/global/Nav.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import AddList from "./pages/AddList.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/creer_liste",
    element: <AddList />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav />
    <main>
      <RouterProvider router={router} />
    </main>
  </StrictMode>,
)
