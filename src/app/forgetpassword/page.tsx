"use client";
import axios from "axios";

import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  const HandleSendEmail = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.post("api/users/forgetpassword", { email });
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm mx-auto w-full">
        <h1 className="text-3xl text-center mb-6 font-semibold">
          Movie <span className="bg-orange-500 text-black inline-block px-1">Desk</span>
        </h1>
        <p className="font-medium text-2xl">{loading ? "Processing" : "Enter you Email Address"}</p>
        {Error && <p className="text-red-500">Something went Wrong...</p>}
        <form>
          <div className="my-4">
            <label htmlFor="username" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent rounded-md outline-none border focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
            />
          </div>

          <button
            onClick={HandleSendEmail}
            className="my-4 block w-full rounded-md outline-none border border-orange-500 bg-orange-500 hover:bg-orange-600 focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
          >
            Send Mail
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
