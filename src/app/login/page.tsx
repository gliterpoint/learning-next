import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Next App",
  description: "Login Page Generated by create next app",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm mx-auto w-full">
        <h1 className="text-3xl text-center mb-6 font-semibold">
          Movie <span className="bg-orange-500 text-black inline-block px-1">Desk</span>
        </h1>
        <p className="font-medium text-2xl">Login</p>
        <form>
          <div className="my-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
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
              required
              className="w-full bg-transparent rounded-md outline-none border focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500"
            />
          </div>
          <button className="my-4 block w-full rounded-md outline-none border border-orange-500 bg-orange-500 hover:bg-orange-600 focus:border-orange-500 py-3 px-4 transition-all ease-in-out duration-500">
            Login
          </button>
        </form>
        <p className="text-center">
          <Link href="/reset-password" className="text-orange-500">
            Forgot Password?
          </Link>
        </p>
        <p className="text-center">
          Don&apos;t have an account?&nbsp;
          <Link href="/signup" className="text-orange-500">
            Signup Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;