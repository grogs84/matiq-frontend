/* eslint-disable react/prop-types */
function OverviewTab({ person }) {
  if (!person) {
    return <div>No person data available</div>;
  }

  return (
    <div className="overview-tab">
      <h3>Basic Information</h3>
      <div className="info-grid">
        <div className="info-item">
          <label>First Name:</label>
          <span>{person.first_name || 'Not available'}</span>
        </div>
        <div className="info-item">
          <label>Last Name:</label>
          <span>{person.last_name || 'Not available'}</span>
        </div>
        <div className="info-item">
          <label>Search Name:</label>
          <span>{person.search_name || 'Not available'}</span>
        </div>
        <div className="info-item">
          <label>Date of Birth:</label>
          <span>{person.date_of_birth || 'Not available'}</span>
        </div>
        <div className="info-item">
          <label>City of Origin:</label>
          <span>{person.city_of_origin || 'Not available'}</span>
        </div>
        <div className="info-item">
          <label>State of Origin:</label>
          <span>{person.state_of_origin || 'Not available'}</span>
        </div>
      </div>

      {person.roles && person.roles.length > 0 && (
        <div className="roles-section">
          <h4>Roles</h4>
          <div className="roles-list">
            {person.roles.map((role, index) => (
              <span key={index} className={`role-badge ${role.role_type}`}>
                {role.role_type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OverviewTab;