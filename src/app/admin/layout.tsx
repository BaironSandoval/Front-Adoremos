// admin/layout.tsx
"use client";

import { ReactNode } from "react";
import { Box, VStack, Button, Text, Icon } from "@chakra-ui/react";
import {
  FaTachometerAlt,
  FaBox,
  FaBlog,
  FaBullhorn,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { IconType } from "react-icons";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // 👈 actualiza el estado del contexto
    router.push("/admin/login");
  };

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      {isAuthenticated && (
        <Box
          as="aside"
          width="250px"
          bg="gray.100"
          p={4}
          boxShadow="md"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <VStack align="stretch" spacing={3}>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              🛠️ Admin Panel
            </Text>

            <NavItem href="/admin/dashboard" icon={FaTachometerAlt}>
              Dashboard
            </NavItem>
            <NavItem href="/admin/products" icon={FaBox}>
              Productos
            </NavItem>
            <NavItem href="/admin/blog" icon={FaBlog}>
              Blog
            </NavItem>
            <NavItem href="/admin/promotions" icon={FaBullhorn}>
              Promociones
            </NavItem>
          </VStack>

          <Button
            leftIcon={<FaSignOutAlt />}
            colorScheme="red"
            variant="ghost"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Box>
      )}

      <Box flex="1" p={4}>
        {children}
      </Box>
    </Box>
  );
}

function NavItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: IconType
  children: ReactNode;
}) {
  return (
    <Button
      as={Link}
      href={href}
      leftIcon={<Icon as={icon} />}
      justifyContent="start"
      variant="ghost"
      colorScheme="gray"
    >
      {children}
    </Button>
  );
}
