import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './components/Home'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])
function App() {
  return (
    <>
    <RouterProvider router={appRouter}>
    </RouterProvider>
    </>
  )
}

export default App