import {
  departmentsSearch,
  getDeparments,
  getDepartment,
  getDepartmentDoctors,
  getDepartmentAvailableDates,
} from "../../api/department/department-api";
//=====================================================

export const handleGetDepartments = async (page, limit) => {
  try {
    const response = await getDeparments(page, limit);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleDepartmentsSearch = async (keyword, page, limit) => {
  try {
    const response = await departmentsSearch(keyword, page, limit);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetDepartment = async (id) => {
  try {
    const response = await getDepartment(id);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetDepartmentDoctors = async (id) => {
  try {
    const response = await getDepartmentDoctors(id);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetDepartmentAvailability = async (id) => {
  try {
    const response = await getDepartmentAvailableDates(id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
