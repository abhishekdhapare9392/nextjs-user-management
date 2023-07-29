"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const [user, setUser] = useState({
    email: "",
    isAdmin: false,
    isVerified: false,
    username: "",
    _id: "",
  });

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setUser(res.data.data);
    console.log(res.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <Toaster />
      <hr />
      <div className="p-3 bg-green-300 text-black border rounded">
        <p>
          <strong>Username: </strong>
          {user.username}
        </p>
        <p>
          <strong>Email: </strong>
          {user.email}
        </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white mt-3 font-bold py-2 px-4 rounded"
        onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
