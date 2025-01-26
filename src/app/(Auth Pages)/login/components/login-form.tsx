"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firebaseAuth } from "@/config/firebase";
import { initialValues,LoginValidationSchema} from "@/lib/validations/login-form.validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";
import { LoginDTO } from "../services/submit-login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const { mutation } = useLogin();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (
    values: LoginDTO,
    { setSubmitting }: FormikHelpers<LoginDTO>
  ) => {
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      ) 
        router.push("/dashboard");
      }catch(error: any) {
          console.error(error);
          setError(error.message)
        }finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Field
              as={Input}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Field as={Input} id="password" name="password" type="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || mutation.isPaused || mutation.isPending}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Link href="/register">Already have an account? Register</Link>
        </Form>
      )}
    </Formik>
  );
}
