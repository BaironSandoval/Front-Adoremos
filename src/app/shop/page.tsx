"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { api } from "@/lib/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get<Product[]>("/products");
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={8}>
      <Heading mb={6}>Tienda</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={6}>
        {products.map((product) => {
          const whatsappMessage = `Hola, estoy interesado(a) en comprar el producto: *${product.name}*. ¿Podrían darme más información?`;
          const whatsappUrl = `https://wa.me/573126127202?text=${encodeURIComponent(
            whatsappMessage
          )}`; // Reemplaza con tu número de WhatsApp

          return (
            <Box
              key={product._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              boxShadow="md"
            >
              <Image
                src={product.images?.[0] || "/placeholder.png"} // usa imagen por defecto si no hay
                alt={product.name}
                mb={4}
                borderRadius="md"
                boxSize="200px"
                objectFit="cover"
              />
              <Heading size="sm" mb={2} textAlign="center">
                {product.name}
              </Heading>
              <Text mb={1}>Precio: ${product.price}</Text>
              <Text mb={3} fontSize="sm">
                Disponible: {product.quantity}
              </Text>

              <VStack spacing={2} w="100%">
                <Link href={`/shop/${product._id}`} passHref>
                  <Button colorScheme="blue" width="100%">
                    Ver más
                  </Button>
                </Link>
                <Button
                  as="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme="green"
                  width="100%"
                >
                  Comprar
                </Button>
              </VStack>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
