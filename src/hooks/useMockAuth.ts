import { useState, useEffect } from "react";

export interface CloudflareAccessIdentity {
  email: string;
  name?: string;
  user_uuid?: string;
  [key: string]: unknown;
}

const MOCK_USER: CloudflareAccessIdentity = {
  email: "demo@admin.local",
  name: "Demo Administrator",
  user_uuid: "demo-user-12345",
};

export function useMockAuth() {
  const [user, setUser] = useState<CloudflareAccessIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mockAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUser(MOCK_USER);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Mock auth error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    mockAuth();
  }, []);

  const logout = () => {
    console.log("Mock logout - would redirect in production");
    setUser(null);
    setIsLoading(true);
    setTimeout(() => {
      setUser(MOCK_USER);
      setIsLoading(false);
    }, 500);
  };

  return {
    user,
    isLoading,
    error,
    logout,
  };
}

export { useMockAuth as useCloudflareAccess };
