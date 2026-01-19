"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());

    const supabase = getSupabaseBrowserClient();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      dispatch(fetchCurrentUser());
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return null;
}
