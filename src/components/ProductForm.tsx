"use client";

import {
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
import { isAxiosErrorWithMessage } from "@/lib/utils/isAxiosErrorWithMessage";

type ProductFormProps = {
  initialData?: {
    name: string;
    price: number;
    quantity: number;
    category?: string; // ← CAMBIADO
    images: string[]; // ← CAMBIADO
    description?: string;
  };
  onSubmit: (data: {
    name: string;
    price: number;
    quantity: number;
    category?: string; // ← CAMBIADO
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
  const [category, setCategory] = useState(initialData?.category || ""); // ← CAMBIADO
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(uploadImageToServer);
      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
      toast({ title: "Imágenes subidas con éxito", status: "success" });
    } catch (err: unknown) {
      const message = isAxiosErrorWithMessage(err)
        ? err.response.data.message
        : "Error inesperado";
      toast({
        title: "Error al subir imágenes",
        description: message,
        status: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, price, quantity, images, description, category }); // ← CAMBIADO
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
        <FormLabel>Categoría</FormLabel>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría del producto"
        />
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
