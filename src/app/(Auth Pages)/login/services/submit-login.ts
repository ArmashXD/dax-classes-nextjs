export const submitLogin = async (data: { email: string; password: string }) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Login failed. Please check your credentials.");
  }

  const result = await response.json(); // Get the response from the API
  return result; // Assuming result contains a success flag or user data
};
