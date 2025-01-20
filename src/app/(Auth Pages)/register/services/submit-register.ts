import { IRegisterFormData } from "../types";

export const submitRegister = async (data: IRegisterFormData) => {
  // Using JSONPlaceholder posts endpoint to simulate registration
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: data.name,
      email: data.email,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const result = await response.json();
  
  // Simulate token creation
  const token = btoa(JSON.stringify({ userId: result.id, email: data.email }));
  document.cookie = `token=${token}; path=/`;
  
  return { success: true, user: result };
}; 