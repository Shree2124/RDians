import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { createAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const supabaseAdmin = await createAdmin();

    // Fetch all auth users
    const listUsersResponse = await supabaseAdmin?.auth.admin.listUsers();
    const authError = listUsersResponse?.error ?? null;
    const users =
      listUsersResponse &&
      "data" in listUsersResponse &&
      Array.isArray((listUsersResponse.data as any).users)
        ? (listUsersResponse.data as any).users
        : [];

    // Find the auth user
    const authUser = users.find((u: { email?: string }) => u.email === email);

    if (authError || !authUser) {
      return NextResponse.json(
        { error: "Auth user not found" },
        { status: 404 }
      );
    }

    console.log("auth user", authUser.id);

    const userId = authUser.id;

    // Check if profile exists
    const data = await supabaseAdmin
      ?.from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    const profile = data?.data;
    console.log("profile ", profile);

    const generateOTP = () =>
      Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = () => new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // CASE 1: Profile does NOT exist → create profile
    if (!profile) {
      const verifyCode = generateOTP();

      console.log("Data", {
        id: userId,
        email,
        role,
        otp: verifyCode,
        otp_expires_at: expiresAt(),
        verified: false,
      });

      const res = await supabaseAdmin?.from("profiles").insert({
        id: userId,
        email,
        role,
        otp: verifyCode,
        otp_expires_at: expiresAt(),
        verified: false,
      });

      console.log(res);

      if (res?.error)
        return NextResponse.json({
          message: "Faield to create user",
          status: "ERROR",
          error: res.error,
        });

      await sendVerificationEmail(email, verifyCode);

      return NextResponse.json({
        message: "OTP sent to email",
        status: "NEW_PROFILE",
      });
    }

    // CASE 2: Profile exists and already verified
    if (profile.verified) {
      return NextResponse.json(
        {
          error: "User already verified. Please login.",
          status: "ALREADY_VERIFIED",
        },
        { status: 409 }
      );
    }

    // CASE 3: Profile exists but NOT verified
    if (!profile.verified) {
      const now = new Date();
      const otpExpired =
        !profile.otp_expires_at || new Date(profile.otp_expires_at) < now;
      const otpNotExpired =
        profile.otp_expires_at && new Date(profile.otp_expires_at) > now;

      if (otpExpired) {
        // regenerate OTP
        const verifyCode = generateOTP();
        await supabaseAdmin?.from("profiles")
          .update({ otp: verifyCode, otp_expires_at: expiresAt() })
          .eq("id", userId);

        const emailResponse = await sendVerificationEmail(email, verifyCode);
        if (!emailResponse.success) {
          return NextResponse.json(
            { success: false, message: emailResponse.message },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: "OTP regenerated and sent",
          status: "OTP_SENT",
        });
      }

      // OTP still valid → resend
      if (otpNotExpired) {
        const emailResponse = await sendVerificationEmail(email, profile.otp);
        if (!emailResponse.success) {
          return NextResponse.json(
            { success: false, message: emailResponse.message },
            { status: 500 }
          );
        }
      }
    }
    return NextResponse.json({ message: "OTP resent", status: "OTP_RESENT" });
  } catch (err) {
    console.error("Create Profile Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
