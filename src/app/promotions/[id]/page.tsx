import { use } from "react";
import { getPromotionById } from "@/lib/api/promotions";
import PromotionDetailClient from "./PromotionDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default function PromotionPage({ params }: Props) {
  const { id } = use(params);
  const promotion = use(getPromotionById(id));

  return <PromotionDetailClient promotion={promotion} />;
}
