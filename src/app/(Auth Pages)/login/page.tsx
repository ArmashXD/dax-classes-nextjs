import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./components/login-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({});
  async function create() {
    "use server";
    // Mutate data
    console.log("Creating...");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <Button onClick={create} variant="default">
          Create
        </Button>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Please sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
