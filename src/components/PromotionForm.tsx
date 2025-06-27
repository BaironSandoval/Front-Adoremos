"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { uploadImageToServer } from "@/lib/utils/uploadImage";
import { isAxiosErrorWithMessage } from "@/lib/utils/isAxiosErrorWithMessage";

interface PromotionFormProps {
  initialTitle?: string;
  initialImage?: string;
  onSubmit: (data: { title: string; image: string }) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function PromotionForm({
  initialTitle = "",
  initialImage = "",
  onSubmit,
  isSubmitting = false,
  submitLabel = "Guardar promoción",
}: PromotionFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [image, setImage] = useState(initialImage);
  const [preview, setPreview] = useState(initialImage);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const imageUrl = await uploadImageToServer(file);
        setImage(imageUrl);
        setPreview(imageUrl);
        toast({ title: "Imagen subida con éxito", status: "success" });
      } catch (err: unknown) {
        const message = isAxiosErrorWithMessage(err)
          ? err.response.data.message
          : "Error desconocido";
        toast({
          title: "Error al subir imagen",
          description: message,
          status: "error",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4} isRequired>
        <FormLabel>Título de la promoción</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: 2x1 en camisetas"
        />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Imagen</FormLabel>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {uploading && <p style={{ color: "gray" }}>Subiendo imagen...</p>}
        {preview && (
          <Image
            src={preview}
            alt="Vista previa"
            mt={2}
            borderRadius="md"
            maxW="300px"
          />
        )}
      </FormControl>

      <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
