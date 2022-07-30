import { Link } from 'react-router-dom';

import React from 'react';

const DashboardNav = () => {

  const active = window.location.pathname;

  return (
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <Link className={`nav-link ${active === "/dashboard" && "active"}`} to='/dashboard'>Your Bookings</Link>
        </li>

        <li className="nav-item">
            <Link className={`nav-link ${active === "/dashboard/seller" && "active primary"}`} to='/dashboard/seller'>Your Hotels </Link>
        </li>

    </ul>
  )
}

export default DashboardNav