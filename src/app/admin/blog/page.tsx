"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deletePost, fetchBlogPosts } from "@/lib/api/blog";
import Link from "next/link";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  image: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadPosts = async () => {
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch {
      toast({ title: "Error al cargar publicaciones", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
      toast({ title: "Publicación eliminada", status: "info" });
    } catch {
      toast({ title: "Error al eliminar", status: "error" });
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={8}>
      <AdminProtectedRoute>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading>Entradas del Blog</Heading>
          <Button as={Link} href="/admin/blog/new" colorScheme="teal">
            ➕ Crear Entrada
          </Button>
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Imagen</Th>
              <Th>Título</Th>
              <Th>Contenido</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign="center" py={10}>
                  No hay entradas aún.
                </Td>
              </Tr>
            ) : (
              posts.map((post) => (
                <Tr key={post._id}>
                  <Td>
                    {post.image ? (
                      <Image src={post.image} alt={post.title} boxSize="60px" objectFit="cover" />
                    ) : (
                      <span>Sin imagen</span>
                    )}
                  </Td>
                  <Td>{post.title}</Td>
                  <Td>{post.content.slice(0, 50)}...</Td>
                  <Td>
                    <Flex gap={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        as={Link}
                        href={`/admin/blog/${post._id}/edit`}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(post._id)}
                      >
                        Eliminar
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </AdminProtectedRoute>
    </Box>
  );
}
