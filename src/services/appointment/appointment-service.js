import {
  getAppointmentReports,
  getPatientAppointments,
  makeAppointment,
} from "../../api/appoinment/appointment-api";
//=====================================================
export const handleMakeAppointment = async (data) => {
  try {
    const response = await makeAppointment(data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetPatientAppointments = async (email) => {
  try {
    const response = await getPatientAppointments(email);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetAppointmentReports = async (id) => {
  try {
    const response = await getAppointmentReports(id);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
