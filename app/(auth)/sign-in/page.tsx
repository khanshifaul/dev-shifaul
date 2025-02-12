"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaKey,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";

const emailSignInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(emailSignInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof emailSignInSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: (ctx) => {
          if (ctx.data.twoFactorRedirect) {
          } else {
            router.push("/");
          }
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            alert("Please verify your email address");
          }
          alert(ctx.error.message);
        },
      }
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen"
    >
      <Card className={cn("max-w-md w-full shadow-xl rounded-2xl")}>
        <CardHeader className="flex flex-col items-center space-y-4 p-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Logo />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            {"Welcome Back!"}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {"Unlock your account with ease."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-center space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:dark:bg-blue-800 font-semibold py-2 rounded-lg transition-all cursor-pointer"
                onClick={async () => await authClient.signIn.passkey()}
              >
                <FaKey /> Sign in with Passkey
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <Button
                variant="outline"
                className="gap-2 cursor-pointer"
                onClick={() => authClient.signIn.social({ provider: "google" })}
              >
                <FcGoogle /> Google
              </Button>
              <Button
                variant="outline"
                className="gap-2 cursor-pointer"
                onClick={() => authClient.signIn.social({ provider: "github" })}
              >
                <FaGithub /> GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <FormControl>
                      <div className="relative">
                        <FaUser
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700">
                        Password
                      </Label>
                      <Link
                        href="/forget-password"
                        className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <FaLock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                          {showPassword ? (
                            <FaEyeSlash size={16} />
                          ) : (
                            <FaEye size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />

                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        id="remember"
                        {...form.register("rememberMe")}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                  </FormItem>
                )}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center w-full border-t pt-4">
            <div className="w-full text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
