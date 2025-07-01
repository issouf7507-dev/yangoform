import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Fonction utilitaire pour récupérer un cookie
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = getCookie("authToken");
      const currentUser = getCookie("user");

      if (authToken === "authenticated" && currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
      } else {
        setIsAuthenticated(false);
        setUser("");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setUser(username);
        router.push("/participants");
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      return { success: false, error: "Erreur de connexion" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setIsAuthenticated(false);
      setUser("");
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      // Forcer la déconnexion même en cas d'erreur
      setIsAuthenticated(false);
      setUser("");
      router.push("/login");
    }
  };

  const requireAuth = (redirectTo = "/login") => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    requireAuth,
  };
}
