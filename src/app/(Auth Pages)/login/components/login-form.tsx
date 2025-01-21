"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AlertCircle } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function LoginForm() {
  const { initialValues, validationSchema, handleSubmit } = useLogin();
  const router = useRouter();

  // Correctly define the navigateToRegister function
  function navigateToRegister(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault(); // Prevent the default form submission behavior
    router.push("/register"); // Navigate to the register page
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Field name="email" as={Input} type="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Field name="password" as={Input} type="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          {status && (
            <div className="flex items-center gap-2 text-green-500">
              <AlertCircle size={16} />
              {status}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Button
            variant="outline"
            onClick={navigateToRegister} // Navigate to register page
          >
            Already have an account? Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}
