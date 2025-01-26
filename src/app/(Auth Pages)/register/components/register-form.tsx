"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { firebaseAuth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true); // Set mounted to true after the component is mounted
  }, []);

  const router = useRouter(); // This will now work after the component is mounted

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      console.log("User registered:", userCredential.user);

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Error registering user. Please try again.");
    }
  };

  if (!mounted) return null; // Return null until the component is mounted

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}
      <Button type="submit" className="w-full">
        Register
      </Button>

      <Link href="/login">Already have an account? Login</Link>
    </form>
  );
}

export default RegisterForm;
