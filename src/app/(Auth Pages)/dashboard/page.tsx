"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUser } from "@/app/context/userContext"; 

function DashboardPage() {
  const router = useRouter();
  const { logout } = useUser(); 

  const handleLogout = () => {
    
    logout(); // Function from useContext

    
    Cookies.remove("token");

    
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p className="text-gray-700 mb-6">You are now logged in!</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;


