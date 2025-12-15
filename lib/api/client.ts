import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUSTOMER_API,
  headers: {
    "Content-Type": "application/json",
  },
});
