"use client";

import { Box, Heading, Text, Image, Button } from "@chakra-ui/react";
import Link from "next/link";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
};

type Props = {
  post: BlogPost;
};

export default function BlogDetailClient({ post }: Props) {
  return (
    <Box p={8} maxW="800px" mx="auto">
      <Button as={Link} href="/blog" colorScheme="gray" mb={4}>
        ← Volver
      </Button>

      <Heading mb={2}>{post.title}</Heading>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Por {post.author} — {new Date(post.createdAt).toLocaleDateString()}
      </Text>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          borderRadius="md"
          mb={6}
          maxH="400px"
          objectFit="cover"
        />
      )}

      <Text whiteSpace="pre-line" fontSize="md">
        {post.content}
      </Text>
    </Box>
  );
}
