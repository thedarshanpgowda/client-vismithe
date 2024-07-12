import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:4000/allproducts")
        .then((res) => {
          console.log(res.data);
          setAllProducts(res?.data || []);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);

  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    setCartItems(() => {
      let cart = {};
      for (let index = 0; index < all_product.length; index++) {
        cart[index] = 0;
      }
      // console.log(cart);
      return cart;
    });
  }, [all_product]);

  const [user, setUser] = useState(null);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    console.log(cartItems);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    // console.log(totalItem)
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    user,
    setUser,
    setAllProducts,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
