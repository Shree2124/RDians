"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { user, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
      else if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
      )
        router.replace("/unauthorized");
    }
  }, [user, loading, allowedRoles, router]);

  if (loading || !user) return null;

  return <>{children}</>;
};

export default AuthLayout;
