import './Dashboard.css';

const Dashboard = ({ userLeaves }) => {

  return (
    <div className="dashboard">
      <h2>Employee Leave Logs</h2>
      {/* <h3>My Leaves</h3> */}
      {userLeaves.map((user) => (
        <div className="dashboard-item" >
           {/* <p>{user.username}</p>
           <p>{user.department}</p> */}
         {user.leave_list.length > 0 && <table className="leave-table" key={userLeaves._id}>
            <thead>
              <tr>
                <th>Name</th>
                <th>department</th>
                <th>Leave Type</th>
                <th>Duration</th> 
              </tr>
            </thead>
            <tbody>
              {user.leave_list.map((leave, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.department}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.duration}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>Total Leave</td>
                <td>
                    {user.leave_list.reduce((acc, leave)=> acc + leave.duration, 0)}
                </td>
              </tr>
            </tbody>
          </table>}
        </div>
      ))} 
    </div>
  );
};

export default Dashboard;




