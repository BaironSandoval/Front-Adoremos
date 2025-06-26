"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
  images?: string[];
};

export default function ProductDetailClient({ product }: { product: Product }) {
  if (!product) {
    return (
      <Box p={8}>
        <Spinner />
      </Box>
    );
  }

  const allImages = product.images?.length ? product.images : [product.image];
  const firstImage = allImages?.[0];

  const whatsappMessage = `Hola, estoy interesada(o) en el producto: *${product.name}*. ¿Está disponible aún?`;
  const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <Box p={8} maxW="800px" mx="auto">
      <Button as={Link} href="/shop" colorScheme="gray" mb={4}>
        ← Volver
      </Button>

      <VStack spacing={6} align="stretch">
        {firstImage && (
          <Image
            src={firstImage}
            alt={product.name}
            borderRadius="md"
            maxH="400px"
            objectFit="cover"
          />
        )}

        {allImages.length > 1 && (
          <HStack spacing={3}>
            {allImages.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Miniatura ${idx}`}
                boxSize="70px"
                objectFit="cover"
                borderRadius="md"
                border="1px solid #ccc"
              />
            ))}
          </HStack>
        )}

        <Heading size="lg">{product.name}</Heading>
        <Text fontSize="xl" color="green.500">
          ${product.price.toFixed(2)}
        </Text>
        <Text fontWeight="medium">Disponible: {product.quantity} unidades</Text>

        {product.description && (
          <Text fontSize="md" mt={4}>
            {product.description}
          </Text>
        )}

        <Button
          as="a"
          href={whatsappUrl}
          target="_blank"
          colorScheme="green"
          size="lg"
        >
          Comprar por WhatsApp
        </Button>
      </VStack>
    </Box>
  );
}
