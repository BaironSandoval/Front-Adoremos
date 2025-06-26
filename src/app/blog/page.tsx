"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { fetchPublicPosts } from "@/lib/api/blog";
import Link from "next/link";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPublicPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error al cargar el blog:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Spinner size="lg" />;

  return (
    <Box p={8}>
      <Heading mb={4}>Blog</Heading>
      <Text mb={8}>
        Lee reflexiones, testimonios y artículos sobre vida, fe y crecimiento.
      </Text>

      <VStack spacing={8} align="stretch">
        {posts.map((post) => (
          <Box key={post._id} borderWidth="1px" borderRadius="md" p={4}>
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                borderRadius="md"
                mb={4}
                maxH="200px"
                objectFit="cover"
              />
            )}
            <Heading size="md" mb={2}>{post.title}</Heading>
            <Text noOfLines={3}>{post.content}</Text>
            <Text fontSize="sm" mt={2} color="gray.600">
              Por {post.author} — {new Date(post.createdAt).toLocaleDateString()}
            </Text>
            <ChakraLink
              as={Link}
              href={`/blog/${post._id}`}
              color="teal.500"
              mt={2}
              display="inline-block"
            >
              Leer más
            </ChakraLink>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
