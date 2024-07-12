import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { auth } from "../../firebase/firebase";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  console.log(getTotalCartItems())
  const menuRef = useRef();
  const { user } = useContext(ShopContext);
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const logoutHandler = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  console.log(user);

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => {
          setMenu("shop");
        }}
        className="nav-logo"
      >
        <img src={logo} alt="" />
        <p>Asmithe</p>
      </Link>
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/">Shop</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("knitting");
          }}
        >
          <Link to="/knitting">Knitting</Link>
          {menu === "knitting" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("pottery");
          }}
        >
          <Link to="/pottery">Pottery</Link>
          {menu === "pottery" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("painting");
          }}
        >
          <Link to="/painting">Painting</Link>
          {menu === "painting" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
