import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import Nav from "./components/global/Nav.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import AddList from "./pages/Lists/AddList.tsx";
import {createList, homepage, showLists} from "./utils/links.ts";
import ShowLists from "./pages/Lists/ShowLists.tsx";
import AddProduct from "./pages/Products/AddProduct.tsx";
import EditList from "./pages/Lists/EditList.tsx";

import './index.css'

export const router = createBrowserRouter([
  {
    path: homepage,
    element: <Homepage />,
  },
  {
    path: createList,
    element: <AddList />,
  },
  {
    path: showLists,
    element: <ShowLists />
  },
  {
    path: "/edit_list/:id",
    element: <EditList />
  },
  {
    path: "/add_product/:id",
    element: <AddProduct />
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
