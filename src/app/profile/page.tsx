"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [Data, setData] = useState("nothing");

  const HandleLogout = async () => {
    try {
      await axios.get("api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const HandleUserDetails = async () => {
    const response = await axios.get("api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-4xl text-center mb-10 ">Profile Page</h1>
      <h4 className="bg-purple-700 text-white rounded-sm py-1 px-2 mb-4">
        {Data === "nothing" ? "Nothing" : <Link href={`/profile/${Data}`}>{Data}</Link>}
      </h4>
      <button
        onClick={HandleUserDetails}
        className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md text-white font-semibold mb-4"
      >
        Get Data
      </button>
      <button
        onClick={HandleLogout}
        className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md text-white font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
