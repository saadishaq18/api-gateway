import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function UserHeader({ title }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // const isEmployeesPage = currentPath.includes('employees');

  return (
    <>
      {/* Page Header */}
      <div className="page-header mt-4">
        <div className="row">
          <div className="col-sm-8 float-left">
            <h3 className="page-title">{title}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/home">Dashboard</Link>
              </li>
             
                {/* <li className="breadcrumb-item active">
                  <span>Employees</span>
                </li> */}
            
            </ul>
          </div>
        
            {/* <div className="col-sm-4 text-right">
              <Link to="add" className="ml-auto">
                <button className="btn btn-primary">Add User</button>
              </Link>
            </div> */}
        
        </div>
      </div>
      {/* /Page Header */}
    </>
  );
}

export default UserHeader;
