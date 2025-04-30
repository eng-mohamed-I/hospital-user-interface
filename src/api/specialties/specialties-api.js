import { apiClient } from "../api-client";
//===========================================
export const getSpecialties = () => apiClient.get("/specialties");
