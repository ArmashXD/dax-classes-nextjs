interface LoginData {
  email: string;
  password: string;
}

interface SafeUser {
  id: number;
  email: string;
  name: string;
}

export const submitLogin = async (data: LoginData) => {
  // Using JSONPlaceholder users endpoint to simulate login
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }

  const users = await response.json();
  const user = users.find((u: any) => u.email.toLowerCase() === data.email.toLowerCase());
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Create a plain object with only the needed properties
  const safeUser: SafeUser = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  // Simulate token creation
  const token = btoa(JSON.stringify({ userId: safeUser.id, email: safeUser.email }));
  document.cookie = `token=${token}; path=/`;
  
  return { success: true, user: safeUser };
};
