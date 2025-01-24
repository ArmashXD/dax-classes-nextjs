"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { firebaseAuth } from "@/config/firebase";
import {
  initialValues,
  LoginValidationSchema,
} from "@/lib/validations/login-form.validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";
import { LoginDTO } from "../services/submit-login";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { mutation } = useLogin();
  const router = useRouter();

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
        .then((authUser) => {
          console.log(
            "Success. The user is created in Firebase, 'authUser' is: ",
            authUser
          );
          localStorage.setItem("user", JSON.stringify(authUser.user));

          authUser.user?.getIdToken().then((token) => {
            // localStorage.setItem("token", token);
            Cookies.set("token", token);
          });
          router.push("/dashboard");
        })
        .catch((error) => {
          // setError(error.message)
          console.log(error);
        });

      if (mutation.isPaused) {
        return;
      }

      mutation.mutate(values);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
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
          {status && (
            <div className="text-red-500 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {status}
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || mutation.isPaused || mutation.isPending}
          >
            {isSubmitting || mutation.isPaused || mutation.isPending
              ? "Signing In..."
              : "Sign In"}
          </Button>
          <Link href="/register">Already have an account? Register</Link>
        </Form>
      )}
    </Formik>
  );
}
