import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Pages/Layout.jsx'
import MenuPage from './Pages/MenuPage.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import RegisterRestaurant from './Pages/RegisterRestaurant.jsx'
import RestaurantPage from './Pages/RestaurantPage.jsx'
import UserOrders from './Pages/UserOrders.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/Store.js'
import { PersistGate } from 'redux-persist/integration/react'

const router=createBrowserRouter(
[
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/about', element: <About /> },
      { path: '/menu/:id', element: <MenuPage /> },
      { path: '/contact', element: <Contact /> },
      { path: '/registerrestaurant', element: <RegisterRestaurant/>},
      { path: '/order', element: <UserOrders/>},
      { path: '/admin', element: <RestaurantPage/>},
      // { path: '/login', element: <Login /> },
      { path: '*', element: <div>404</div> },
    ],
  },
]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
