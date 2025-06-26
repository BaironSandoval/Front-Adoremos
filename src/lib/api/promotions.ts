const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sitio-adoremos.onrender.com/api";

export const getPromotions = async () => {
  const res = await fetch(`${BASE_URL}/promotions`);
  if (!res.ok) throw new Error("Error al obtener promociones");
  return res.json();
};

export const getPromotionById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/promotions/${id}`);
  if (!res.ok) throw new Error("Error al obtener la promoción");
  return res.json();
};

export const createPromotion = async (promotion: {
  title: string;
  image: string;
}) => {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${BASE_URL}/promotions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(promotion),
  });

  if (!res.ok) throw new Error("Error al crear la promoción");
  return res.json();
};

export const updatePromotion = async (id: string, promotion: {
  title: string;
  image: string;
}) => {
  const res = await fetch(`${BASE_URL}/promotions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(promotion),
  });

  if (!res.ok) throw new Error("Error al actualizar la promoción");
  return res.json();
};

export const deletePromotion = async (id: string) => {
  const res = await fetch(`${BASE_URL}/promotions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar la promoción");
  return res.json();
};
