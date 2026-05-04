"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in on every page load
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      // If user session exists, they are logged in
      // This ensures auto-login on every app open
      if (userData && token) {
        // User is logged in, no need to redirect
        // The session is persistent and will work across page refreshes
        console.log("User session found - auto-logged in");
      }
      
      // Trigger userUpdated event to notify other components
      window.dispatchEvent(new Event("userUpdated"));
    };

    checkAuth();
  }, [pathname]);

  return <>{children}</>;
}
