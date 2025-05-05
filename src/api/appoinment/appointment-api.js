import { apiClient } from "../api-client";
//=========================================

export const makeAppointment = (data) =>
  apiClient.post("/appointments/book", data);

export const getPatientAppointments = (email) =>
  apiClient.get(`/appointments/patient/${email}`);

export const getAppointmentReports = (id) =>
  apiClient.get(`/appointments/reports/${id}`);
