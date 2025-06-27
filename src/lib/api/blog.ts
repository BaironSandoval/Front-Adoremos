const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sitio-adoremos.onrender.com/api";

// Obtener todas las publicaciones
export const fetchBlogPosts = async () => {
  const res = await fetch(`${BASE_URL}/blog`);
  if (!res.ok) throw new Error("Error al obtener entradas del blog");
  return res.json();
};

export const fetchPublicPosts = async () => {
  const res = await fetch(`${BASE_URL}/blog`);
  if (!res.ok) throw new Error("Error al obtener los posts");
  return res.json();
};


export const fetchPostById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/blog/${id}`);
  if (!res.ok) throw new Error("Error al obtener la entrada");
  return res.json();
};

// Crear una publicación nueva
export const createPost = async (post: {
  title: string;
  content: string;
  image: string;
}) => {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${BASE_URL}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Error al crear publicación");
  return res.json();
};

// Obtener una publicación por ID
export const getPostById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/blog/${id}`);
  if (!res.ok) throw new Error("Error al cargar publicación");
  return res.json();
};

// Actualizar publicación
export const updatePost = async (
  id: string,
  post: { title: string; content: string; image: string }
) => {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Error al actualizar publicación");
  return res.json();
};

// Eliminar publicación
export const deletePost = async (id: string) => {
  const token = localStorage.getItem("adminToken");
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar publicación");
  return res.json();
};
