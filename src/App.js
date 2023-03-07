import React from "react";
import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4287f5",
      },
      black: {
        main: "#000",
      },
    },
  });
  const fetchProducts = () => {
    commerce.products.list().then(({ data }) => {
      setProducts(data);
    });
  };

  const fetchCart = () => {
    commerce.cart.retrieve().then((response) => setCart(response));
  };

  const handleAddToCart = async (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
      setCart(item);
    });
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const emptyCart = () => {
    const cart = commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log(products);
  // console.log(cart);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar totalItems={cart.total_items} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Products products={products} onAddToCart={handleAddToCart} />
              }
            />
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                  emptyCart={emptyCart}
                />
              }
            />
            <Route
              exact
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                />
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
