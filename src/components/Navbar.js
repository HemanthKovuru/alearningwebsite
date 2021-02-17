import React from "react";
import "./../scss/Navbar.scss";

const Navbar = ({ handlePopUp }) => {
  return (
    <div className='navbar__container'>
      <div className='navbar'>
        <div className='logo'>Learning Website</div>
        <div className='navbar__right'>
          <span onClick={handlePopUp} className='btn btn-signup'>
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
