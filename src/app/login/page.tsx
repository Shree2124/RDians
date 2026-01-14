"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { dummyUsers, Role } from "@/data/dummyUsers";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    if (!selectedRole) return;

    const user = dummyUsers.find((u) => u.role === selectedRole);
    if (user) {
      dispatch(
        login({
          username: user.username,
          password: user.password,
          role: user.role,
        })
      );
      router.push("/auth/dashboard/");
    }
  }, [selectedRole, dispatch, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-6">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-blue-700 mb-2">
        Crisis Response Platform
      </h1>
      <p className="text-blue-600 mb-10 text-center max-w-xl">
        Select your role to access the national emergency coordination system.
        <br />
        <span className="text-sm font-medium">
          Authorized personnel only.
        </span>
      </p>

      {/* ROLE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {dummyUsers.map((user) => (
          <div
            key={user.role}
            onClick={() => setSelectedRole(user.role)}
            className="cursor-pointer bg-white border border-blue-200 rounded-xl p-6
                       hover:border-blue-500 hover:shadow-lg transition group"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {user.role.charAt(0).toUpperCase()}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-blue-700 capitalize mb-1">
              {user.role.replace("-", " ")}
            </h3>

            <p className="text-sm text-gray-600">
              Access system features related to{" "}
              <span className="font-medium capitalize">
                {user.role.replace("-", " ")}
              </span>
              .
            </p>

            <p className="mt-4 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition">
              Click to continue →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
