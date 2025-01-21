"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { useLogin } from "../hooks/useLogin"

export default function LoginForm() {
  const { initialValues, validationSchema, handleSubmit, isPending, isSuccess, isError, error } = useLogin()

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Field as={Input} id="email" name="email" type="email" placeholder="you@example.com" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Field as={Input} id="password" name="password" type="password" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          {isSuccess && (
            <div className="text-green-500 text-sm flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Login successful!
            </div>
          )}
          {isError && (
            <div className="text-red-500 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error || "Failed to login."}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting || isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  )
}