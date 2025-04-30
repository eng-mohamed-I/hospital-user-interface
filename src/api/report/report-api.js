import { apiClient } from "../api-client";
//========================================

export const getAppointmentReports = (id) =>
  apiClient.get(`appointments/reports/${id}`);
