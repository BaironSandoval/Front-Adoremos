"use client";

import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "@/lib/api/products";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      toast({
        title: "Error al cargar productos",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: "Producto eliminado",
        status: "success",
        duration: 2000,
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      toast({
        title: "Error al eliminar",
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gestión de Productos</Heading>
        <Button as={Link} href="/admin/products/new" colorScheme="teal">
          ➕ Crear Producto
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Precio</Th>
            <Th>Cantidad</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.length === 0 ? (
            <Tr>
              <Td colSpan={4} textAlign="center" py={10}>
                No hay productos disponibles.
              </Td>
            </Tr>
          ) : (
            products.map((product) => (
              <Tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>${product.price}</Td>
                <Td>{product.quantity}</Td>
                <Td>
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width="80"
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    <span>Sin imagen</span>
                  )}
                </Td>
                <Td>
                  <Button
                    as={Link}
                    href={`/admin/products/${product._id}/edit`}
                    size="sm"
                    colorScheme="yellow"
                    mr={2}
                  >
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      if (confirm("¿Estás seguro de eliminar este producto?")) {
                        handleDelete(product._id);
                      }
                    }}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
