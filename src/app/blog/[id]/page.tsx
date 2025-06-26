import { use } from "react";
import { fetchPostById } from "@/lib/api/blog";
import BlogDetailClient from "./BlogDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default function BlogPostPage({ params }: Props) {
  const { id } = use(params);
  const post = use(fetchPostById(id));

  return <BlogDetailClient post={post} />;
}
