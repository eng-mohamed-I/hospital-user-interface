import { getSpecialties } from "../../api/specialties/specialties-api";
//================================================================
export const handleGetSpecialies = async () => {
  try {
    const response = await getSpecialties();
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
