import { useEffect, useState } from "react";
import {
  handleDepartmentsSearch,
  handleGetDepartments,
} from "../../services/department/department-service";
import { Link } from "react-router-dom";
//==============================================================
export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  useEffect(() => {
    fetchDepartments(currentPage, limit);
  }, [currentPage]);

  const fetchDepartments = async (page, limit) => {
    try {
      const response = await handleGetDepartments(page, limit);
      setDepartments(response.data);
      setTotalPages(response.total);
      console.log(departments);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartmentSearch = async (search) => {
    try {
      const response = search
        ? await handleDepartmentsSearch(search, currentPage, limit)
        : await handleGetDepartments(currentPage, limit);

      setDepartments(response.data);
      setTotalPages(response.total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSearch = (e) => {
    setCurrentPage();
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold text-primary">Our Departments</h1>

      {/* Search Box */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by department name"
              value={search}
              onChange={(e) => {
                handleChangeSearch(e);
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                fetchDepartmentSearch(search);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      <div className="row g-4">
        {departments.map((dept, index) => (
          <div key={index} className="card  col-sm-6 col-lg-4">
            <Link className=" h-100 shadow-sm" to={`/departments/${dept._id}`}>
              <div className="card-body">
                <h5 className="card-title text-primary">{dept.name}</h5>
                <p className="card-text">{dept.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-5">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
