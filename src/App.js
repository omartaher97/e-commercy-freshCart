import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import home from './components/Home/Home';
import UserContextProvider from './components/Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductsDetails from './components/ProductsDetails/ProductsDetails';
import CartContextProvider from './components/CartContext/CartContext';
import toast, { Toaster } from 'react-hot-toast';



let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'navbar', element: <Navbar /> },
      { path: 'notfound', element: <Notfound /> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'ProductsDetails/:id', element: <ProtectedRoute><ProductsDetails /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> }
      
    ]
  }
]);


function App() {


  return <>

    <CartContextProvider>

      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </UserContextProvider>

    </CartContextProvider>

    <Toaster />

  </>




}

export default App;
