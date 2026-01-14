"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

const NAV_ITEMS = {
  admin: [
    { label: "Overview", href: "/auth/dashboard" },
    { label: "Users", href: "/auth/dashboard/users" },
  ],
  citizen: [
    { label: "My Profile", href: "/auth/dashboard" },
    { label: "Activity", href: "/auth/dashboard/activity" },
  ],
};

export default function DashboardSidebar() {
  const { user } = useSelector((s: RootState) => s.auth);

  if (!user) return null;

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <nav className="p-4 space-y-2">
        {NAV_ITEMS[user.role].map((item:any) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 rounded-md text-slate-700 hover:bg-blue-50"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
