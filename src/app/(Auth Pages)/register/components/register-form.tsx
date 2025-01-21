"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { IRegisterFormData } from "../types";
import { useRouter } from "next/navigation"; // Importing useRouter

export default function RegisterForm() {
  const [formData, setFormData] = useState<IRegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Use the useRouter hook for redirection
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.email || !formData.password || !formData.name) {
      setError("Please fill in all fields");
      return;
    }

    // Simulating a network request
    try {
      // Example registration request: replace with actual API request
      console.log("Registering user with:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async operation

      // If registration is successful, show a success message
      setSuccessMessage("Registration successful! Please log in.");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 2000); // Delay redirection for 2 seconds to let the success message show
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
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

      {successMessage && (
        <div className="text-green-500 text-sm flex items-center">
          {successMessage}
        </div>
      )}

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <Link href="/login">Already have an account? Login</Link>
    </form>
  );
}
