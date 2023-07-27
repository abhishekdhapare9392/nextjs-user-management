"use client";
import React from "react";
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <Toaster />
      <hr />
      <p>Profile Page</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white mt-3 font-bold py-2 px-4 rounded"
        onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
