import { fetchProductById } from "@/lib/api/products";
import ProductDetailClient from "./ProductDetailClient";
import { use } from "react"; // necesario para unwrap de thenables

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: Props) {
  const { id } = use(params); // ⚠️ unwrap con use()

  const product = use(fetchProductById(id)); // ⚠️ fetch también con use()

  return <ProductDetailClient product={product} />;
}
