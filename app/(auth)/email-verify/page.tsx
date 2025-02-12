"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerifyPage() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const token = params.token;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);
      try {
        if (!token) {
          setMessage("Check your email for the verification link.");
          return;
        }
        // Pass the token as part of a query object.
        const result = await authClient.verifyEmail({ query: { token } });
        if (result.data?.status && result.data.user) {
          setMessage("Email verified successfully! Redirecting to sign in...");
          setTimeout(() => router.push("/sign-in"), 3000);
        } else if (
          result.error &&
          result.error.message === "Email already verified"
        ) {
          setMessage(
            "Your email is already verified. Redirecting to sign in..."
          );
          setTimeout(() => router.push("/sign-in"), 3000);
        } else {
          setMessage("Email verification failed. Please try again.");
        }
      } catch {
        setMessage(
          "An error occurred during email verification. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-4 p-4">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-center text-gray-600">{message}</p>
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          )}
          {/* Fallback button if verification fails */}
          {!loading && message.includes("failed") && (
            <Button
              className="w-full mt-4"
              onClick={() => router.push("/sign-up")}
            >
              Go Back to Sign Up
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
