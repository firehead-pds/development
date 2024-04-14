import FormsCadastro from './pages/FormsCadastro'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/sign-up" element={<FormsCadastro />} />
));

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
