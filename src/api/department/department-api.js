import { apiClient } from "../api-client";
//==========================================

export const getDeparments = (page, limit) =>
  apiClient.get(`/departments?page=${page}&limit=${limit}`);

export const departmentsSearch = (keyword, page, limit) =>
  apiClient.get(
    `/departments/search?keyword=${keyword}&page=${page}&limit=${limit}`
  );

export const getDepartment = (id) => apiClient.get(`/departments/${id}`);

export const getDepartmentDoctors = (id) =>
  apiClient.get(`departments/${id}/doctors`);

export const getDepartmentAvailableDates = (id) =>
  apiClient.get(`/departments/${id}/availability`);
