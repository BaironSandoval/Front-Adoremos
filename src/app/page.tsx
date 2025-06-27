'use client';

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

interface Promotion {
  _id: string;
  title: string;
  image: string;
}

export default function HomePage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await api.get("/promotions");
        setPromotions(res.data);
      } catch (error) {
        console.error("Error al cargar promociones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={8}>
      <Heading mb={6}>Bienvenido a Adoremos</Heading>
      <Text mb={10}>
        Una tienda con propósito. Descubre nuestras promociones especiales y mensajes inspiradores.
      </Text>

      <Heading size="md" mb={4}>Promociones</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={6}>
        {promotions.map((promo) => {
          const whatsappMessage = `Hola, estoy interesado(a) en la promoción: *${promo.title}*. ¿Podrían darme más información?`;
          const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(
            whatsappMessage
          )}`; // Reemplaza por tu número real

          return (
            <Box
              key={promo._id}
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
                src={promo.image}
                alt={promo.title}
                mb={4}
                borderRadius="md"
                boxSize="200px"
                objectFit="cover"
              />
              <Heading size="sm" mb={2} textAlign="center">
                {promo.title}
              </Heading>

              <VStack spacing={2} w="100%">
                <Link href={`/promotions/${promo._id}`} passHref>
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
