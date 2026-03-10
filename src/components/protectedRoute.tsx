"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (user === undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
