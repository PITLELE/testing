import { useState } from 'react';
import './employee.css';

function Employee(props) {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (endDate < startDate) {
      setMessage('End date cannot be earlier than start date.');
      return;
    }

    let newApplication = {
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate
    };

    props.onSubmitApplication(newApplication);

    setMessage('Your leave application has been submitted successfully!');

  
  }

  
  function displayApplications() {
    let rows = [];

    for (let i = 0; i < props.applications.length; i++) {
      let application = props.applications[i];

      rows.push(
        <div className="submitted-application" key={application.id}>
          <h2>Leave Application</h2>

          <p>
            <strong>Leave Type:</strong> {application.leaveType}
          </p>

          <p>
            <strong>Start Date:</strong> {application.startDate}
          </p>

          <p>
            <strong>End Date:</strong> {application.endDate}
          </p>

          <p>
            <strong>Status:</strong> {application.status}
          </p>
        </div>
      );
    }

    return rows;
  }
  function displayApplicationContent() {
  if (props.applications.length == 0) {
    return <p>You have not submitted any leave applications yet.</p>;
  } else {
    return displayApplications();
  }
}

function displayMessage() {
  if (message != '') {
    return <p className="application-message">{message}</p>;
  } else {
    return null;
  }
}

  return (
    <div className="employee">
      <h1>Welcome to Digital E-Leave </h1>
      <p>Employee leave portal</p>

      <div className="leave-application-card">
        <h2>Apply for Leave</h2>

        <form onSubmit={handleSubmit}>
          <label>Leave Type</label>

          <select
            value={leaveType}
            onChange={(event) => setLeaveType(event.target.value)}
            required
          >
            <option value="">Select leave type</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Family Responsibility Leave">
              Family Responsibility Leave
            </option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>

          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />

          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
          />

          <button type="submit">Submit Application</button>
        </form>

        {displayMessage()}
      </div>

      <div>

        {displayApplicationContent()}
      </div>
    </div>
  );
}

export default Employee;
