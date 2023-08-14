"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export const VerifyEmail = () => {
  const [Token, setToken] = useState("");
  const [Verified, setVerified] = useState(false);
  const [Error, setError] = useState(false);

  const HandleEmailVerification = async () => {
    try {
      await axios.post("api/users/verifyemail", { Token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (Token.length > 0) {
      HandleEmailVerification();
    }
  }, [Token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl text-center mb-10 ">Verify Your Email...</h1>
      <h4 className="bg-purple-700 text-white rounded-sm py-1 px-2 mb-4">{Token ? `${Token}` : "Nothing"}</h4>
      {Verified && (
        <>
          <h3 className="text-2xl text-center mb-10 ">Congratulations... Your Email is Verified.</h3>
          <Link href="/login">Login Now</Link>
        </>
      )}
      {Error && (
        <>
          <h3 className="text-2xl text-center mb-10 ">oppsss... Your Email is not Verified.</h3>
        </>
      )}
    </div>
  );
};
