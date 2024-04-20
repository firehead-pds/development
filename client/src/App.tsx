import Signup from "./pages/Signup.tsx";
import {
  createBrowserRouter,
  Link as ReactRouterLink,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import { Link } from "@chakra-ui/react";

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

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
