// components/BlogPostForm.tsx
"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import NextImage from "next/image";
import { uploadImageToServer } from "@/lib/utils/uploadImage";
import { isAxiosErrorWithMessage } from "@/lib/utils/isAxiosErrorWithMessage";

type BlogPostFormProps = {
  initialValues?: {
    title?: string;
    content?: string;
    author?: string;
    image?: string;
  };
  onSubmit: (data: {
    title: string;
    content: string;
    author: string;
    image: string;
  }) => void;
  isEditing?: boolean;
};

export default function BlogPostForm({
  initialValues = {},
  onSubmit,
  isEditing = false,
}: BlogPostFormProps) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [content, setContent] = useState(initialValues.content || "");
  const [author, setAuthor] = useState(initialValues.author || "");
  const [image, setImage] = useState(initialValues.image || "");
  const [imagePreview, setImagePreview] = useState(initialValues.image || "");
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleImage = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImageToServer(file);
      setImage(url);
      setImagePreview(url);
      toast({ title: "Imagen subida", status: "success" });
    } catch (err: unknown) {
      const message = isAxiosErrorWithMessage(err)
        ? err.response.data.message
        : "Error al subir imagen";
      toast({ title: message, status: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, author, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Título</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Contenido</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Autor</FormLabel>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Imagen</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImage(file);
          }}
        />
        {uploading && <Spinner size="sm" />}
        {imagePreview && (
          <NextImage
            src={imagePreview}
            alt="preview"
            width={150}
            height={100}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        )}
      </FormControl>

      <Button type="submit" colorScheme={isEditing ? "blue" : "teal"}>
        {isEditing ? "Actualizar" : "Publicar"}
      </Button>
    </form>
  );
}
