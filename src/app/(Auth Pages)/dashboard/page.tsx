"use client";
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  )
}


