// lib/utils/uploadImageToServer.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sitio-adoremos.onrender.com/api";

export async function uploadImageToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    const contentType = res.headers.get("Content-Type");
    const errorText = contentType?.includes("application/json")
      ? await res.json()
      : await res.text();

    throw new Error(
      typeof errorText === "string"
        ? errorText
        : errorText.message || "Error al subir imagen"
    );
  }

  return data.imageUrl;
}
