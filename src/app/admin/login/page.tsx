"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { isAxiosErrorWithMessage } from "@/lib/utils/isAxiosErrorWithMessage";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      if (!res.data || !res.data.token) {
        throw new Error("Token no recibido");
      }
      const { token } = res.data;

      login(token); // guarda el token en el contexto
      localStorage.setItem("adminToken", token); // opcional, si no lo hace el contexto

      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 3000,
      });

      router.push("/admin");
    } catch (err: unknown) {
      const errorMessage = isAxiosErrorWithMessage(err)
        ? err.response.data.message
        : "Error desconocido";
      toast({
        title: "Error al iniciar sesión",
        description: errorMessage,
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={6}>Login Administrador</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            placeholder="admin@admin.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" w="full">
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
}
// Este componente es la página de inicio de sesión del administrador
// Utiliza Chakra UI para el diseño y Next.js para la navegación