export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("adminToken");
  return Boolean(token);
}