"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { IRegisterFormData } from "../types";
import Link from "next/link";
import { useRegister } from "../hooks/useRegister";
import { toast } from "sonner";

export default function RegisterForm() {
  const [formData, setFormData] = useState<IRegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutation, isLoading, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutation.mutate(formData);
  };

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
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="c_password"
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
          {error.message}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>

      <Link href="/login" className="text-sm text-center block">
        Already have an account? Login
      </Link>
    </form>
  );
}
