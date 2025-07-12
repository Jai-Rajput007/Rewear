"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const FormSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("login"), ...loginSchema.shape }),
  z.object({ mode: z.literal("register"), ...registerSchema.shape }),
]);

export function AuthForm({ mode = "login" }: { mode?: "login" | "register" }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: mode === "register" 
      ? {
          mode: "register" as const,
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          mode: "login" as const,
          email: "",
          password: "",
        },
  });

  const { login, register } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      if (data.mode === "register") {
        await register(data.name, data.email, data.password);
        toast({
          title: "Success",
          description: "Registration successful! Please log in.",
        });
        router.push("/login");
      } else {
        await login(data.email, data.password);
        toast({
          title: "Success",
          description: "Successfully logged in!",
        });
        router.push("/dashboard");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : `Failed to ${mode}`;
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full rounded-2xl p-8 md:p-12 shadow-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-gray-100 dark:border-gray-800 transform transition-all duration-300 hover:shadow-3xl">
      <div className="flex flex-col items-center mb-8 relative z-20">
        <div className="w-32 h-32 relative mb-6">
          <Image 
            src="/rewear-logo.png" 
            alt="Rewear Logo" 
            fill 
            priority 
            className="object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center tracking-tight">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mt-3 text-center max-w-sm">
          {mode === "login" ? "Login to Rewear to continue" : "Join Rewear to start swapping"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-8">
          <div className="space-y-6">
            {mode === "register" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        className="rounded-md border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 dark:focus:ring-blue-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="rewear@example.com" 
                      className="rounded-md border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 dark:focus:ring-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="rounded-md border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 dark:focus:ring-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            {mode === "register" && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="rounded-md border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 dark:focus:ring-blue-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            )}
          </div>

          <Button 
            className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md" 
            type="submit"
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            {isLoading 
              ? (mode === "login" ? "Signing in..." : "Creating account...") 
              : (mode === "login" ? "Sign in" : "Create account")}
          </Button>
        </form>
      </Form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-zinc-900 text-gray-500 dark:text-gray-400">
              {mode === "login" ? "New to Rewear?" : "Already have an account?"}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          {mode === "login" ? (
            <Link 
              href="/register" 
              className="text-sm font-medium text-teal-500 hover:text-teal-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Create your account →
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="text-sm font-medium text-teal-500 hover:text-teal-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Sign in to your account →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}