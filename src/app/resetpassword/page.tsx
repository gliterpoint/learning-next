"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const ResetPassword = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [token, setToken] = useState("");

  const HandleResetPassword = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("api/users/resetpassword", { token, password });
      if (res.status === 200) {
        router.push("/");
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm mx-auto w-full">
        <h1 className="text-3xl text-center mb-6 font-semibold">
          Movie <span className="bg-orange-500 text-black inline-block px-1">Desk</span>
        </h1>
        <p className="font-medium text-2xl">{loading ? "Processing" : "Enter your new password"}</p>
        {Error && <p className="text-red-500">Something went Wrong...</p>}
        <form>
          <div className="my-4">
            <label htmlFor="username" className="block mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent rounded-md outline-none border focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
            />
          </div>

          <button
            onClick={HandleResetPassword}
            className="my-4 block w-full rounded-md outline-none border border-orange-500 bg-orange-500 hover:bg-orange-600 focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
