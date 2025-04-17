"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useForm, useWatch } from "react-hook-form";
import { baseErrorSchema, baseUserRegistrationSchema, TBaseError } from "@/lib/schema";
import { useSearchParams } from "next/navigation";
import { Fieldset } from "@/components/ui/fieldset";
import { RadioGroup } from "@/components/ui/radio-group";
import { IconHome, IconUser } from "@tabler/icons-react";
import FormRadioAccountCard from "./form-radio-account-card";
import { registerUser } from "@/lib/api/auth";
import { z } from "zod";

const formRegisterSchema = baseUserRegistrationSchema.extend({
  venueManager: z.enum(["guest", "host"])
});

export type FormRegisterData = z.infer<typeof formRegisterSchema>;

const RegisterForm = () => {
  const [errors, setErrors] = useState<TBaseError["errors"]>([]);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next");

  const accountParam = searchParams.get("type");
  const setDefaultAccount =
    accountParam === "guest" || accountParam === "host" ? accountParam : "guest";

  const form = useForm<FormRegisterData>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      venueManager: setDefaultAccount
    }
  });

  const accountType = useWatch({ control: form.control, name: "venueManager" });

  const onSubmit = async (data: FormRegisterData) => {
    setErrors([]);
    const venueManager = data.venueManager === "host";

    try {
      const response = await registerUser({ ...data, venueManager: venueManager }, redirectTo);
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
          Create an account
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
          <Fieldset legend="Account type" className="mb-24">
            <FormField
              control={form.control}
              name="venueManager"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                      <FormRadioAccountCard
                        value="guest"
                        description="Book amazing holiday homes"
                        title="Guest"
                        icon={IconUser}
                        isSelected={accountType === "guest"}
                      />
                      <FormRadioAccountCard
                        value="host"
                        listItems={[
                          "Book amazing holiday homes",
                          "List and manage your own property"
                        ]}
                        description="Book stays and list your own property"
                        title="Host"
                        icon={IconHome}
                        isSelected={accountType === "host"}
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription>
              You can change your account type later.{" "}
              <Link href="/become-a-host" variant={"link"} size="custom" className="text-sm">
                Learn about hosting
              </Link>
            </FormDescription>
          </Fieldset>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button className="w-full">Create account</Button>
          <div className="text-muted-foreground">
            <span>Already have an account?</span>{" "}
            <Link
              href={redirectTo ? `/login?next=${redirectTo}` : "/login"}
              variant={"link"}
              size="custom"
            >
              Log in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
