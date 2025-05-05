import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  handleGetDepartment,
  handleGetDepartmentAvailability,
  handleGetDepartmentDoctors,
} from "../../../services/department/department-service";
import DoctorsPageCard from "../../../components/DoctorsPageCard";
import AvailableDatesSlider from "../availableDates/departmentAvailableDates";
//===========================================================================
export default function DepartmentProfile() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState();
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [availableDates, setAvailableDates] = useState();

  useEffect(() => {
    fetchDepartment();
    fetchDepartmentDoctors(id);
    fetchDepartmentAvailableDates(id);
  }, [id]);

  const fetchDepartment = async () => {
    try {
      const response = await handleGetDepartment(id);
      setDepartment(response.data);
    } catch (error) {
      console.error("Failed to fetch department:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentDoctors = async (id) => {
    try {
      const response = await handleGetDepartmentDoctors(id);
      setDoctors(response.data);
      setDoctorsCount(response.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartmentAvailableDates = async (id) => {
    try {
      const response = await handleGetDepartmentAvailability(id);
      setAvailableDates(response.data.availableDates);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!department)
    return <div className="text-center py-5">Department not found</div>;

  return (
    <div className="container py-5">
      <div className=" shadow-sm p-4">
        <h2 className="text-primary fw-bold mb-3">{department.name}</h2>
        <p className="lead">{department.description}</p>
        <hr />

        {/* Available Dates */}
        <div className="container">
          {availableDates && availableDates.length > 0 ? (
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 mb-4">
                <AvailableDatesSlider availableDates={availableDates} />
              </div>

              <div className="col-12 col-md-6 mb-4 text-center">
                <Link
                  to={`/bookappointment/${id}`}
                  className="btn btn-success px-4 py-2"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted py-4">
              No Available Dates yet.
            </div>
          )}
        </div>

        <hr />
        {/* Doctors Cart */}
        <div className="mt-4">
          <ul className="list-unstyled">
            <li>
              <strong>Doctors :</strong> {doctorsCount}
            </li>
          </ul>
        </div>
        <div className="doctor-cards row">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={doctor._id}>
                <DoctorsPageCard
                  photo={doctor.Image?.secure_url}
                  name={doctor.name}
                  specialty={doctor.specialization}
                  location={doctor?.statistics?.patientsTreated}
                  qualifications={doctor.experience}
                  doctorId={doctor._id}
                  price={doctor.price}
                />
              </div>
            ))
          ) : (
            <p>No doctors yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
