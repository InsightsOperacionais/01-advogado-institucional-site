export const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000/api",
  token: process.env.NEXT_PUBLIC_API_TOKEN || "",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    "Content-Type": "application/json",
  },
};
