import type { LoginValues } from "../lib/types"

export const submitLogin = async (data: LoginValues): Promise<{ message: string }> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Failed to login: ${response.statusText}`)
  }

  return await response.json()
}