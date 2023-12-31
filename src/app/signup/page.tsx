"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Next App",
  description: "Login Page Generated by create next app",
};

const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disableButton, setdisableButton] = useState(true);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setdisableButton(false);
    } else {
      setdisableButton(true);
    }
  }, [user]);

  const HandleSignUp = async (event: any) => {
    event.preventDefault();
    try {
      setloading(true);
      const response = await axios.post("api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
    } finally {
      setloading(false);
      setUser({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm mx-auto w-full">
        <h1 className="text-3xl text-center mb-6 font-semibold">
          Movie <span className="bg-orange-500 text-black inline-block px-1">Desk</span>
        </h1>
        <p className="font-medium text-2xl">{loading ? "Processing" : "Sign Up"}</p>
        <form onSubmit={HandleSignUp}>
          <div className="my-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
              className="w-full bg-transparent rounded-md outline-none border focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
            />
          </div>
          <div className="my-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full bg-transparent rounded-md outline-none border focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
            />
          </div>
          <div className="my-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="w-full bg-transparent rounded-md outline-none border focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="agreement" className="cursor-pointer" />
            <label htmlFor="agreement" className="block text-sm cursor-pointer">
              Agree{" "}
              <a href="/" className="text-orange-500">
                Term & Condition
              </a>
            </label>
          </div>
          <button className="my-4 block w-full rounded-md outline-none border border-orange-500 bg-orange-500 hover:bg-orange-600 focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500">
            {disableButton ? "No Sign up" : "Sign up"}
          </button>
        </form>
        <p className="text-center">
          Already have an account?&nbsp;
          <Link href="/login" className="text-orange-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
