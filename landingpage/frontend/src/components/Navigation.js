import React from 'react'
import icon from '../data/logo.png'

export const Navigation = () => {
  return (
    <div class="custom-navi">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    {/* <!-- Toggle button --> */}
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <!-- Navbar brand --> */}
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src={ icon }
          height="25"
          alt="OnlyFunds Logo"
          loading="lazy"
        />
      </a>
      {/* <!-- Left links --> */}
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">Dashboard</a>
        </li>
      </ul>
      {/* <!-- Left links --> */}
    </div>
    {/* <!-- Collapsible wrapper --> */}

    {/* <!-- Right elements --> */}
    <div class="d-flex align-items-center">

      {/* <!-- Login Icon --> */}
      <a href=""><i class="fa fa-sign-in fa-2xl" aria-hidden="true" ></i></a>
    </div>
    {/* <!-- Right elements --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
{/* <!-- Navbar --> */}
</div>
  )
}
