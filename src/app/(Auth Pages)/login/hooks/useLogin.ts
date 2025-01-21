import { LoginValidationSchema } from "@/lib/validations/login-form.validation"
import { useMutation } from "@tanstack/react-query"
import type { FormikHelpers } from "formik"
import { useRouter } from "next/navigation"
import { submitLogin } from "../services/submit-login"
import type { LoginValues } from "../lib/types"

export const useLogin = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: submitLogin,
    onSuccess: async (data) => {
      console.log("Login successful:", data)
      router.push("/profile/1") 
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message)
    },
  })

  const handleSubmit = async (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    try {
      await mutation.mutateAsync(values)
    } finally {
      setSubmitting(false)
    }
  }

  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidationSchema,
    handleSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error?.message,
  }
}