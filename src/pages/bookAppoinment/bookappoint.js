import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import styles from "./BookAppointment.module.css";
import useAuth from "../../hooks/useAuth";
import { generateTimeSlots } from "../../utilities/api";
import {
  handleGetDepartment,
  handleGetDepartmentAvailability,
  handleGetDepartments,
} from "../../services/department/department-service";
import { handleMakeAppointment } from "../../services/appointment/appointment-service";
//========================================================
const BookAppointment = () => {
  const { id } = useParams();
  const [availableDates, setAvailableDates] = useState([]);
  const [department, setDepartment] = useState();
  const [departments, setDepartments] = useState([]);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    department: "",
    patient: "",
    day: "",
    date: "",
    fromTime: "",
    toTime: "",
    notes: "",
  });

  const navigate = useNavigate();
  const toast = useRef(null);
  const { auth } = useAuth();

  useEffect(() => {
    if (id) {
      fetchDepartment(id);
      fetchDepartmentAvailability(id);
    } else {
      fetchDepartments();
    }
  }, [id]);

  useEffect(() => {
    if (auth?.user?.data?.id) {
      setFormData((prev) => ({
        ...prev,
        patient: auth.user.data.id,
      }));
    }
  }, [auth?.user?.data?.id]);

  const fetchDepartment = async (id) => {
    try {
      const response = await handleGetDepartment(id);
      setDepartment(response.data);
      setFormData((prev) => ({
        ...prev,
        department: response.data._id,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await handleGetDepartments(1, 100);
      setDepartments(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartmentAvailability = async (departmentId) => {
    try {
      setAvailableDates([]);
      const response = await handleGetDepartmentAvailability(departmentId);
      if (response.data && response.data.availableDates) {
        setAvailableDates(response.data.availableDates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNextDateOfDay = (day) => {
    const pad = (num) => num.toString().padStart(2, "0");
    const daysMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const today = new Date();
    const resultDate = new Date(today);

    const delta = (7 + daysMap[day] - today.getDay()) % 7 || 7;
    resultDate.setDate(today.getDate() + delta);

    const year = resultDate.getFullYear();
    const month = pad(resultDate.getMonth() + 1);
    const dayOfMonth = pad(resultDate.getDate());

    return `${year}-${month}-${dayOfMonth}`;
  };

  const handleDateChange = (date) => {
    const selectedDate = availableDates.find((d) => d.day === date);
    if (selectedDate) {
      const { openTime, closeTime, day } = selectedDate;
      const date = getNextDateOfDay(day);
      setFormData({
        ...formData,
        date,
        day,
        fromTime: openTime,
        toTime: closeTime,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { department, toTime, fromTime, day } = formData;

    if (!auth?.user?.data?.id) {
      return navigate("/signin");
    }

    if (!department || !day || !fromTime || !toTime) {
      setFormError("All fields are required");
      return;
    }

    try {
      // await handleMakeAppointment({
      //   department,
      //   date: appointmentDate,
      //   patientEmail: auth?.user?.data?.email,
      // });

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Appointment booked successfully!",
        life: 3000,
      });

      setFormData({
        department,
        patient: auth.user.data.id,
        day: "",
        date: "",
        fromTime: "",
        toTime: "",
        notes: "",
      });
      console.log(formData);

      setFormError("");
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error?.response?.data.message || "Something went wrong while booking",
        life: 3000,
      });
    }
  };

  return (
    <div className="container my-5">
      <Toast ref={toast} />
      <h2 className="mb-4">Book Appointment</h2>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Department Selection */}
        {!id ? (
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Select Department
            </label>
            <select
              id="department"
              className="form-select"
              value={formData.department._id}
              onChange={(e) => {
                setFormData({ ...formData, department: e.target.value });
                fetchDepartmentAvailability(e.target.value);
                console.log(department);
              }}
            >
              <option value="">Choose department...</option>
              {departments?.map((dept, index) => (
                <option key={index} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {formError && !formData?.department && (
              <div className="text-danger">Please select a department</div>
            )}
          </div>
        ) : (
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              value={department?.name || ""}
              readOnly
            />
          </div>
        )}

        {/* Date Selection */}
        {availableDates.length > 0 ? (
          <div className="mb-3">
            <label className="form-label">Select Date</label>
            <div className="d-flex flex-wrap gap-2">
              {availableDates.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  className={`btn btn-outline-primary ${
                    formData.day === d.day ? "active" : ""
                  }`}
                  onClick={() => handleDateChange(d.day)}
                >
                  <div> {d.day}</div>
                  <div>
                    from: {d.openTime}, to: {d.closeTime}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-1">No available dates yet.</div>
        )}

        {formError && <div className="text-danger mb-2">{formError}</div>}

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
  );
};
//========================================================
export default BookAppointment;
