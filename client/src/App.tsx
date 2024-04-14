import Signup from "./pages/Signup.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import { Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Link as={ReactRouterLink} to={"/signup"}>
            Signup
          </Link>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
