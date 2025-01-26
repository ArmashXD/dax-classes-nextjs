"use client";

import { useUser } from "@/providers/UserContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function DashboardPage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  console.log({ user });

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
      console.log("User successfully logged out");
      router.push("/login");
    } catch (error: any) {
      console.error("Error logging out:", error?.message);
    }
  };

  return (
    <div>
      Dashboard
      <button className="ml-4 border" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
