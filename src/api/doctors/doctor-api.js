import { apiClient } from "../api-client";
//========================================

export const getDoctors = () => apiClient.get("/auth/doctors");

export const getDoctor = (id) => apiClient.get(`/auth/doctors/${id}`);
