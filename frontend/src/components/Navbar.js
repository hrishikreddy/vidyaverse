import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
// import '../assets/CSS/Navbar.css'; // Import custom CSS file

const Navbar = ({ islogin }) => {
  return (
    <nav className="navbar">
       <NavLink to="/home" className='title'> <span class="material-symbols-outlined">
                  home
              </span>
              VidyaVerse
      </NavLink>
      <ul>
      {!islogin &&<>
        <li>
          <NavLink activeClassName="active" to={"/signin"}>
            sign in
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={"/signup"}>
            sign up
          </NavLink>
        </li></>}
        {islogin &&
        <>
          <li>
            <NavLink to='/home' activeClassName='active'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/aboutus' activeClassName='active'>
            <span class="material-symbols-outlined">
                  info
              </span>
               AboutUs</NavLink>
          </li>
          <li>
            <NavLink to='/contactus' activeClassName='active'>
            <span class="material-symbols-outlined">
            contact_support
            </span>
              ContactUs</NavLink>
          </li>
          <li>
            <NavLink to={"/aihelp"} activeClassName="active">
            <span class="material-symbols-outlined">
            chat
            </span>
              AI help
            </NavLink>
          </li>
          <li>
            <span class="material-symbols-outlined">
              account_circle
            </span>
          </li>
        </>
        }
      </ul>
    </nav>
  );
}

export default Navbar;
