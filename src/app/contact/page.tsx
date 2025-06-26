// src/app/contacto/page.tsx
'use client';
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function ContactPage() {
  return (
    <Box p={8}>
      <Heading mb={4}>Contáctanos</Heading>
      <VStack align="start" spacing={4}>
        <Text fontSize="lg">
          ¿Tienes preguntas, sugerencias o simplemente deseas saludarnos? En <strong>Adoremos</strong> valoramos profundamente cada mensaje y conexión con nuestra comunidad.
        </Text>
        <Text fontSize="lg">
          Ya sea que estés interesada en nuestros productos de danza, desees colaborar con nosotros o necesites ayuda con tu pedido, estamos aquí para acompañarte.
        </Text>
        <Text fontSize="lg">
          Escríbenos a través de nuestras redes sociales o directamente a nuestro correo electrónico, y te responderemos lo más pronto posible con la atención cálida y personalizada que mereces.
        </Text>
        <Text fontSize="md" fontStyle="italic">
          ✉️ contacto@adoremos.com  
          <br />
          📱 @adoremos.oficial
        </Text>
      </VStack>
    </Box>
  );
}
