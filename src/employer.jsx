
import { useNavigate } from 'react-router-dom';
import './employer.css';

function Employer(props) {

  const navigate = useNavigate();

  
  function displayApplications() {

    let rows = [];

    for (let i = 0; i < props.applications.length; i++) {

      let application = props.applications[i];

      function approveApplication() {
        props.onUpdateStatus(application.id, 'Approved');
      }

      function rejectApplication() {
        props.onUpdateStatus(application.id, 'Rejected');
      }

      rows.push(
        <tr key={application.id}>
          <td>{application.leaveType}</td>
          <td>{application.startDate}</td>
          <td>{application.endDate}</td>
          <td>{application.status}</td>

          <td>
            <button onClick={approveApplication}>
              Approve
            </button>

            <button onClick={rejectApplication}>
              Reject
            </button>
          </td>
        </tr>
      );
    }

    return rows;
  }

  // Displays a message when no applications exist
  function displayEmptyMessage() {

    if (props.applications.length == 0) {
      return <p>No leave applications have been submitted yet.</p>;
    } else {
      return null;
    }
  }

  return (
    <div className="employer-container">

      <div className="employer-header">
        <div>
          <h1>Manage submitted leave applications</h1>
          <p>Employer leave portal.</p>
        </div>

        <button onClick={function() { navigate('/'); }}>
          Logout
        </button>
      </div>

      <div className="employer-card">

        <h2>Leave Applications</h2>

        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {displayApplications()}
          </tbody>
        </table>

        {displayEmptyMessage()}

      </div>

    </div>
  );
}

export default Employer;
