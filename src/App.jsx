import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

import CartContextProvider from "./context";
import Home from "./Components/Home/home";
import LoginForm from "./Components/LoginForm/login";
import NotFound from "./Components/Notfound";
import Products from "./Components/Products/products";
import Cart from "./Components/Cart/cart";
import ProductDetails from "./Components/ProductIemDetails/details";
import ProtectedRoutes from "./Components/ProtectedRoutes";

import "./App.css";

function App() {
  return (
    <CartContextProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="products/:id/" element={<ProductDetails />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </CartContextProvider>
  );
}

export default App;
