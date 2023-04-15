import "./App.css";
import React from "react";
import "./scss/app.scss";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { FullPizza } from "./pages/FullPizza";
import { MainLayout } from "./layouts/MainLayout";
import loadable from 'react-loadable'

const Cart = loadable({
  loader: () => import(/* webpackCHunkName: "Cart" */'./pages/Cart'),
  loading: () => <div>Loading ...</div>
})

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
