"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";
import { useUser } from "@/providers/UserContext";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      let userData = await signInWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );
      setSuccessMessage("You have been logged in successfully!");
      setUser({
        uid: userData?.user?.uid,
        name: userData?.user?.displayName,
        email: userData?.user?.email,
      });

      router.push("/dashboard"); // Redirect to the dashboard page
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in. Please try again.");
    }
  };

  if (!mounted) return null; // Only render after the component is mounted

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      {error && (
        <div className="text-red-500 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}
      {successMessage && (
        <div className="text-green-500 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          {successMessage}
        </div>
      )}
      <Button type="submit" className="w-full">
        Login
      </Button>

      <Link href="/register">Don't have an account? Register</Link>
    </form>
  );
}

export default LoginForm;
