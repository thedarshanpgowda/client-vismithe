import React, { useContext, useEffect, useRef, useState } from "react";
import "./CSS/LoginSignup.css";
import { auth } from "../firebase/firebase";
import { signInWithGoogle } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import toast from "react-hot-toast";

const LoginSignup = () => {
  const { setUser: setCurrentUser } = useContext(ShopContext);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [user, setUser] = useState(false);
  const [loggedIn, setloggedIn] = useState({
    user: {},
    isLoggedIn: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user?.multiFactor?.user);
      if (user) {
        setloggedIn({
          isLoggedIn: true,
          user: {
            name: user?.multiFactor?.user.displayName,
            email: user?.multiFactor?.user.email,
          },
        });
        setCurrentUser({
          name: user?.multiFactor?.user.displayName,
          email: user?.multiFactor?.user.email,
        });
      }

      if (!user) {
        setCurrentUser(null)
        setloggedIn({
          user : {},
          isLoggedIn : false
        });
      }
    });
  }, [auth]);

  const Singup = async () => {
    console.log(name?.current?.value);
    console.log(password?.current?.value);

    const signupUser = async (name, password, email) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
        });

        console.log("User signed up successfully:", user);
        toast.success("User signed up successfully");
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    };

    signupUser(name.current.value, password.current.value, email.current.value);
  };

  const loginHandler = async () => {
    const signinUser = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;

        console.log("User signed up successfully:", user);
        toast.success("User signed up successfully");
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    };

    signinUser(email.current.value, password.current.value);
  };


  const logoutHandler = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const GoogleLogin = () => {
    signInWithGoogle();
  };

  return !loggedIn.isLoggedIn ? (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {user ? <h1>Sign Up </h1> : <h1>Login </h1>}
        <div className="loginsignup-fields">
          {user && <input ref={name} type="text" placeholder="Your Name" />}
          <input ref={email} type="email" placeholder="Email Address" />
          <input ref={password} type="password" placeholder="Password" />
        </div>
        {user ? (
          <>
            <button onClick={Singup}>Sign-UP</button>
            <button
              style={{ backgroundColor: "#0b57d0c2" }}
              onClick={GoogleLogin}
            >
              Sign Up with google
            </button>
          </>
        ) : (
          <>
            <button onClick={loginHandler}>Log-in</button>
            <button
              style={{ backgroundColor: "#0b57d0c2" }}
              onClick={GoogleLogin}
            >
              Log-in with google
            </button>
          </>
        )}
        <p className="loginsignup-login">
          Dont have an account?
          <span style={{ cursor: "pointer" }}>
            &nbsp;{" "}
            {!user ? (
              <span onClick={() => setUser(true)}>Signup here </span>
            ) : (
              <span onClick={() => setUser(false)}>Login here</span>
            )}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="hoveredPage">
        <div className="loggedInDetails">
          <div className="success">
            <img
              src="https://cdn-icons-png.flaticon.com/128/5709/5709755.png"
              alt=""
            />
          </div>
          <div className="name">{loggedIn.user.name}</div>
          <div className="name">{loggedIn.user.email}</div>
          <div className="logubtn" onClick={logoutHandler}>
                Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
