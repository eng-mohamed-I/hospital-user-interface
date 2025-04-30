import { apiClient } from "../api-client";
//=========================================

export const makeAppointment = (data) =>
  apiClient.post("/appointments/book", data);

export const getPatientAppointments = (email) =>
  apiClient.get(`/appointments/patient/${email}`);

