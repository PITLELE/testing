import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import './App.css';
import Employee from './employee';
import Employer from './employer';


function Login() {
  const navigate = useNavigate();

  
  function handleLogin(event) {
    event.preventDefault();

    let role = event.target.role.value;

    
    if (role == 'employee') {
      navigate('/employee');
    } else if (role == 'employer') {
      navigate('/employer');
    }
  }

  return (
    <div className="app-container">
      <div className="login-card">
        <h1>{import.meta.env.VITE_APP_NAME}</h1>
        <p>Employee Leave Management System</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
          />

          <label>Select Role</label>
          <select name="role" required>
            <option value="">Choose your role</option>
            <option value="employer">Employer</option>
            <option value="employee">Employee</option>
          </select>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}


function App() {

  const [applications, setApplications] = useState([]);

  
  function addApplication(newApplication) {

    let applicationWithDetails = {
      leaveType: newApplication.leaveType,
      startDate: newApplication.startDate,
      endDate: newApplication.endDate,
      id: Date.now(),
      status: 'Pending'
    };

    let updatedApplications = applications.concat(applicationWithDetails);

    setApplications(updatedApplications);
  }


  function updateApplicationStatus(applicationId, newStatus) {

    let updatedApplications = [];

    for (let i = 0; i < applications.length; i++) {

      let application = applications[i];

      if (application.id == applicationId) {

        let updatedApplication = {
          leaveType: application.leaveType,
          startDate: application.startDate,
          endDate: application.endDate,
          id: application.id,
          status: newStatus
        };

        updatedApplications.push(updatedApplication);

      } else {

        updatedApplications.push(application);

      }
    }

    setApplications(updatedApplications);
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/employee"
          element={
            <Employee
              applications={applications}
              onSubmitApplication={addApplication}
            />
          }
        />

        <Route
          path="/employer"
          element={
            <Employer
              applications={applications}
              onUpdateStatus={updateApplicationStatus}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
