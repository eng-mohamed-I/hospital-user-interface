import { getDeparments } from "../../api/department/department-api";
//=====================================================

export const handleGetDepartments = async () => {
  try {
    const response = await getDeparments();
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
