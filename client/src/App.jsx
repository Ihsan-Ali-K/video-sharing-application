import { useState } from 'react'

import './App.css'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import VideoList from './components/VideoList';
import SingleVideo from './components/SingleVideo';
import Subscriptions from './components/Subscriptions';
import SearchList from './components/SearchList';

const Layout = () => {
  return (
      <>
        <Navbar />
        <Categories />
        <Outlet /> 
        </>   
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <VideoList />
      },
      {
        path: "/singlevideo/:id",
        element: <SingleVideo />
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />
      },
      {
        path: "/searchlist",
        element: <SearchList />
      }
    ]
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
