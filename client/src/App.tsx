import Signup from "./pages/Signup.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Link as ReactRouterLink,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import { Link } from "@chakra-ui/react";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
