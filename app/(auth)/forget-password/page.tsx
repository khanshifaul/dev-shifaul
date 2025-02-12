"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import * as z from "zod";

// Validation schema for email input
const forgetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    if (!recaptchaToken) {
      setRecaptchaError("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setRecaptchaError(null);

    await authClient.forgetPassword(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          setSuccessMessage("Reset email sent.");
          setCanResend(false);
          setIsSuccess(true);
          setCountdown(60);
        },
        onError: (ctx) => {
          setLoading(false);
          if (ctx.error.status === 403) {
            setErrorMessage("Please verify your email address.");
          } else {
            setErrorMessage(ctx.error.message || "An error occurred.");
          }
        },
      }
    );
  }

  // Countdown timer
  useEffect(() => {
    if (countdown === null || countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50"
    >
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaUser
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          aria-hidden="true"
                        />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                          aria-label="Enter your email address"
                          required
                          disabled={isSuccess}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* reCAPTCHA */}
              {!isSuccess && (
                <div className="flex flex-col items-center">
                  <ReCAPTCHA
                    sitekey={process.env.RECAPTCHA_SITE_KEY!}
                    onChange={(token) => {
                      setRecaptchaToken(token);
                      setRecaptchaError(null);
                    }}
                  />
                  {recaptchaError && (
                    <p className="text-red-600 text-sm mt-2">
                      {recaptchaError}
                    </p>
                  )}
                </div>
              )}

              {errorMessage && (
                <motion.p
                  className="text-red-600 text-center mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {errorMessage}
                </motion.p>
              )}

              {isSuccess && successMessage && (
                <motion.p
                  className="text-green-600 text-center mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {successMessage}
                </motion.p>
              )}
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
                disabled={loading || !canResend}
                aria-label="Reset Password"
              >
                {loading
                  ? "Sending..."
                  : successMessage
                  ? `Resend after (${countdown})`
                  : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center w-full border-t pt-4">
            <div className="w-full text-center text-sm text-gray-600">
              {"Back to "}
              <Link
                href="/sign-in"
                className="text-blue-600 hover:text-blue-500 transition-colors"
                aria-label="Back to sign in"
              >
                Sign In
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
