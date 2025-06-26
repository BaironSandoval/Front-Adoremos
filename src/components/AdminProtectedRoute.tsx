"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}