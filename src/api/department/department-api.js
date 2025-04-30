import { apiClient } from "../api-client";
//==========================================

export const getDeparments = () => apiClient.get("/departments");
