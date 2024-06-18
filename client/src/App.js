import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentEmpId, setCurrentEmpId] = useState(null);

  const [formData, setFormData] = useState({
    emp_id: '',
    emp_name: '',
    emp_mailid: '',
    emp_phone: '',
    dob: '',
    reporting_manager_name: '',
    role: '',
    years_of_exp: '',
    address: ''
  });

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/employees');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleToggle = () => {
    if (!showTable && employees.length === 0) {
      fetchEmployees();
    }
    setShowTable(!showTable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = isUpdating
        ? await fetch(`/api/employees/${currentEmpId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
        : await fetch('/api/employees', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setEmployees((prevEmployees) => {
        if (isUpdating) {
          return prevEmployees.map(emp => (emp.emp_id === currentEmpId ? result.data : emp));
        } else {
          return [...prevEmployees, result.data];
        }
      });

      // Clear form and reset updating state
      setFormData({
        emp_id: '',
        emp_name: '',
        emp_mailid: '',
        emp_phone: '',
        dob: '',
        reporting_manager_name: '',
        role: '',
        years_of_exp: '',
        address: ''
      });
      setIsUpdating(false);
      setCurrentEmpId(null);

    } catch (error) {
      console.error('Error submitting form:', error); // Log the error for debugging
      setError(error.message);
    }
  };

  const handleDelete = async (emp_id) => {
    const delobj = { data: emp_id };
    console.log(delobj);
    try {
      const response = await fetch('/api/employees/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(delobj)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      // Update the state by removing the deleted employee
      setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.emp_id !== emp_id));
    } catch (error) {
      console.error('Error deleting employee:', error); // Log the error for debugging
      setError(error.message);
    }
  };

  const handleUpdate = (emp) => {
    setFormData({
      emp_id: emp.emp_id,
      emp_name: emp.emp_name,
      emp_mailid: emp.emp_mailid,
      emp_phone: emp.emp_phone,
      dob: emp.dob,
      reporting_manager_name: emp.reporting_manager_name,
      role: emp.role,
      years_of_exp: emp.years_of_exp,
      address: emp.address
    });
    setIsUpdating(true);
    setCurrentEmpId(emp.emp_id);
  };

  return (
    <div className="container">
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="emp_id" className="col-sm-2 col-form-label">Id:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="emp_id" name="emp_id" value={formData.emp_id} onChange={handleChange} disabled={isUpdating} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="emp_name" className="col-sm-2 col-form-label">Name:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="emp_name" name="emp_name" value={formData.emp_name} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="emp_mailid" className="col-sm-2 col-form-label">Mail:</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="emp_mailid" name="emp_mailid" value={formData.emp_mailid} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="emp_phone" className="col-sm-2 col-form-label">Phone:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="emp_phone" name="emp_phone" value={formData.emp_phone} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="dob" className="col-sm-2 col-form-label">DOB:</label>
            <div className="col-sm-10">
              <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="reporting_manager_name" className="col-sm-2 col-form-label">Reporting Manager:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="reporting_manager_name" name="reporting_manager_name" value={formData.reporting_manager_name} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="role" className="col-sm-2 col-form-label">Role:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="years_of_exp" className="col-sm-2 col-form-label">Years of Experience:</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="years_of_exp" name="years_of_exp" min="0" value={formData.years_of_exp} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-sm-2 col-form-label">Address:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {isUpdating ? 'Update' : 'Submit'}
          </button>
          {isUpdating && (
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => {
                setIsUpdating(false);
                setFormData({
                  emp_id: '',
                  emp_name: '',
                  emp_mailid: '',
                  emp_phone: '',
                  dob: '',
                  reporting_manager_name: '',
                  role: '',
                  years_of_exp: '',
                  address: ''
                });
                setCurrentEmpId(null);
              }}
            >
              Cancel Update
            </button>
          )}
        </form>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleToggle}>
        {showTable ? 'Hide Employees' : 'Show Employees'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {showTable && employees.length > 0 && (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Emp Name</th>
              <th>Emp Mail ID</th>
              <th>Emp Phone</th>
              <th>DOB</th>
              <th>Reporting Manager</th>
              <th>Role</th>
              <th>Years of Exp</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.emp_id}>
                <td>{emp.emp_id}</td>
                <td>{emp.emp_name}</td>
                <td>{emp.emp_mailid}</td>
                <td>{emp.emp_phone}</td>
                <td>{emp.dob}</td>
                <td>{emp.reporting_manager_name}</td>
                <td>{emp.role}</td>
                <td>{emp.years_of_exp}</td>
                <td>{emp.address}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(emp.emp_id)}>Delete</button>
                  <button className="btn btn-warning ml-2" onClick={() => handleUpdate(emp)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeTable;
