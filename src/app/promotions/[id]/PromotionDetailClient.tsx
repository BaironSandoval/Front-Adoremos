"use client";

import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

interface Promotion {
  _id: string;
  title: string;
  image: string;
}

type Props = {
  promotion: Promotion;
};

export default function PromotionDetailClient({ promotion }: Props) {
  const whatsappMessage = `Hola, estoy interesado(a) en la promoción: *${promotion.title}*. ¿Podrían darme más información?`;
  const whatsappUrl = `https://wa.me/573126127202?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <Box p={8} maxW="700px" mx="auto">
      <Button as={Link} href="/" colorScheme="gray" mb={4}>
        ← Volver
      </Button>

      <Heading mb={4}>{promotion.title}</Heading>

      <Image
        src={promotion.image}
        alt={promotion.title}
        borderRadius="md"
        mb={6}
        maxH="400px"
        objectFit="cover"
      />

      <VStack spacing={4}>
        <Text fontSize="lg">¡Aprovecha esta promoción exclusiva!</Text>
        <Button
          as="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          colorScheme="green"
          width="100%"
        >
          Comprar por WhatsApp
        </Button>
      </VStack>
    </Box>
  );
}
