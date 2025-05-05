import { getDoctor, getDoctors } from "../../api/doctors/doctor-api";
//======================================================
export const handleGetDoctors = async () => {
  try {
    const response = await getDoctors();
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetDoctor = async (id) => {
  try {
    const response = await getDoctor(id);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
