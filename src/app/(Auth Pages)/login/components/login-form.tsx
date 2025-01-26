"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useUser } from '@/app/context/userContext'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/config/firebase';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const { setUser, user } = useUser(); 

  useEffect(() => {
    // If user is already logged in redirect to dashboard
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const authUser = await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      console.log('User logged in:', authUser.user);

      if (authUser.user.email && authUser.user.uid) {
        const userData = {
          email: authUser.user.email,
          uid: authUser.user.uid,
        };

        // Save user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData)); 
        setUser(userData); 

        // Save token in cookies
        authUser.user.getIdToken().then((token) => {
          Cookies.set('token', token); 
        });

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        console.error('Error: Email or UID is null');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
              className="input"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Field
              as={Input}
              id="password"
              name="password"
              type="password"
              className="input"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
