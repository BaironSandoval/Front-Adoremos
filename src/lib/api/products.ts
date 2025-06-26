// lib/api/products.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sitio-adoremos.onrender.com/api";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const fetchProductById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
};

export const createProduct = async (product: {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  images?: string[];
}) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

export const updateProduct = async (
  id: string,
  product: {
    name: string;
    price: number;
    quantity: number;
    description?: string;
    images: string[];
  }
) => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};


export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
};

