"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { dummyUsers, Role } from "@/data/dummyUsers";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();

  const router = useRouter()

  const [role, setRole] = useState<Role>("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = dummyUsers.find((u) => u.role === role);
    if (user) {
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [role]);

  const handleLogin = () => {
    dispatch(login({ username, password, role }));
    router.push("/auth/dashboard/")

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <label className="block mb-2 font-semibold">Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full p-2 mb-4 border rounded"
        >
          {dummyUsers.map((u) => (
            <option key={u.role} value={u.role}>
              {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default page;
