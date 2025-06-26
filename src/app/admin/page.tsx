"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido al panel de administración</h1>
      <p>Selecciona una opción del panel lateral.</p>
    </div>
  );
}
