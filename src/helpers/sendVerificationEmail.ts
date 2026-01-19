import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";

export async function sendVerificationEmail(
  email: string,
  verifyCode: string
): Promise<any> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'NEXT | verification Code',
            react: VerificationEmail({ otp: verifyCode }),
          });
        return {
            success: true,
            message: "verification code send successfully"
        }
    } catch (emailError) {
        console.error("Error sending verification email ",emailError)
        return {
            success: false,
            message: "Failed to send verification code"
        }
    }
}
