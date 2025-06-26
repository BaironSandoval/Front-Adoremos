// src/app/quienes-somos/page.tsx
'use client';
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Box p={8}>
      <Heading mb={4}>Quiénes Somos</Heading>
      <VStack align="start" spacing={4}>
        <Text fontSize="lg">
          En <strong>Adoremos</strong> fusionamos la pasión por la danza árabe con la elegancia de un estilo de vida que celebra la feminidad, el arte y la cultura ancestral.
        </Text>
        <Text fontSize="lg">
          Somos más que una tienda. Somos una comunidad vibrante de mujeres que encuentran en la danza oriental una forma de expresión, empoderamiento y conexión espiritual. Cada uno de nuestros productos está cuidadosamente seleccionado o diseñado para acompañarte en tu camino artístico: desde vestuarios y accesorios auténticos, hasta elementos escénicos, velos, instrumentos y más.
        </Text>
        <Text fontSize="lg">
          Nuestra misión es inspirar a las bailarinas —desde principiantes hasta profesionales— a elevar su arte con productos de calidad, apoyo constante y una identidad que honra lo sagrado del movimiento. En cada prenda, cada diseño y cada detalle, celebramos la fuerza, la belleza y el ritmo que habita en ti.
        </Text>
      </VStack>
    </Box>
  );
}
