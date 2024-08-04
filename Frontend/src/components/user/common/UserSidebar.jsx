import React from "react";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'; 

export const UserSidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="sidebar scrollbar-thin overflow-y-auto scrollbar-thumb-[#3a486e] scrollbar-track-[#1b2b56]" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li>
                <Link to={`/dashboard/home`} className="no-underline">
                  <DashboardOutlinedIcon /> <span> Dashboard</span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="no-underline">
                  <PersonOutlineOutlinedIcon /> <span>Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
