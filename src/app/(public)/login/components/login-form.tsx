"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiLoginRequestSchema, baseErrorSchema, TApiLoginRequest } from "@/lib/schema";
import { TBaseError } from "@/lib/schema";
import { useSearchParams } from "next/navigation";
import { loginUser } from "@/lib/api/auth";

const LoginForm = () => {
  const [errors, setErrors] = useState<TBaseError["errors"]>([]);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next");
  const form = useForm<TApiLoginRequest>({
    resolver: zodResolver(apiLoginRequestSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: TApiLoginRequest) => {
    setErrors([]);
    try {
      const response = await loginUser(data, redirectTo);
      const validated = baseErrorSchema.safeParse(response);
      if (validated.success) {
        setErrors(validated.data.errors);
      }
    } catch (error) {
      console.log(error);
      setErrors([
        {
          message:
            typeof error === "string"
              ? error
              : "Unexpected error happened during login. Try again later or contact support"
        }
      ]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24">
        <Heading variant="heading2" tag="h1">
          Log in
        </Heading>
        {errors.length > 0 && (
          <Alert variant="error" title="Unable to log in">
            <ul className={errors.length > 1 ? "list-inside list-disc" : ""}>
              {errors.map((error, index) => {
                return <li key={index}>{error.message}</li>;
              })}
            </ul>
          </Alert>
        )}
        <div className="space-y-16">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-8">
          <Button className="w-full">Log in</Button>
          <div className="text-muted-foreground">
            <span>Dont have an account?</span>{" "}
            <Link
              href={redirectTo ? `/register?next=${encodeURIComponent(redirectTo)}` : "/register"}
              variant={"link"}
              size="custom"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
