"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Spinner,
  Textarea,
  useToast,
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { uploadImageToServer } from "@/lib/utils/uploadImage";

type ProductFormProps = {
  initialData?: {
    name: string;
    price: number;
    quantity: number;
    images: string[]; // ← CAMBIADO
    description?: string;
  };
  onSubmit: (data: {
    name: string;
    price: number;
    quantity: number;
    images: string[]; // ← CAMBIADO
    description?: string;
  }) => Promise<void>;
  submitText?: string;
};

export default function ProductForm({
  initialData,
  onSubmit,
  submitText = "Guardar",
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [quantity, setQuantity] = useState(initialData?.quantity || 1);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [description, setDescription] = useState(initialData?.description || "");
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(uploadImageToServer);
      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
      toast({ title: "Imágenes subidas con éxito", status: "success" });
    } catch (err: any) {
      toast({
        title: "Error al subir imágenes",
        description: err.message,
        status: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, price, quantity, images, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Nombre del producto</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Precio</FormLabel>
        <NumberInput min={0} value={price} onChange={(value) => setPrice(Number(value))}>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Cantidad</FormLabel>
        <NumberInput min={1} value={quantity} onChange={(value) => setQuantity(Number(value))}>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe el producto"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Imágenes del producto</FormLabel>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              handleImageUpload(files);
            }
          }}
        />
        {uploading && <Spinner size="sm" mt={2} />}
        {images.length > 0 && (
          <Wrap mt={3}>
            {images.map((img, idx) => (
              <WrapItem key={idx}>
                <Image src={img} alt={`img-${idx}`} boxSize="100px" borderRadius="md" />
              </WrapItem>
            ))}
          </Wrap>
        )}
      </FormControl>

      <Button type="submit" colorScheme="teal">
        {submitText}
      </Button>
    </form>
  );
}
