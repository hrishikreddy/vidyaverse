import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar1 = ({ islogin, setIslogin }) => {
  const [menu, setMenu] = useState(false);

  const toggler = () => {
    setMenu(prev => (!prev));
  };

  const signOut = () => {
    sessionStorage.setItem("islogin", JSON.stringify(false));
    setIslogin(false);
  };

  return (
    <div className="lg:flex bg-dark-background z-[20] mx-auto w-full items-center justify-between p-2 border bg-gray-200">
      {/* Logo */}
      <div className='w-full lg:w-auto flex items-center justify-between lg:justify-start'>
        <div className='flex'>
          <img
            src="https://th.bing.com/th/id/OIG2.3I5AIG7giQ6F8ZvA0Y_6?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
            alt="Logo"
            className="w-16 h-16 m-2 rounded-full"
          />
          <div className="ml-3 inline-block text-2xl font-bold self-center font-serif">vidyaverse</div>
        </div>
        <div className='mr-2 bg-gray-400 rounded-md p-2 active: border-2 active:border-red-300 lg:hidden' onClick={(e) => { toggler(); }}>
          <MenuIcon fontSize={"large"} />
        </div>
      </div>

      <div className={menu ? ('bg-black/50 w-screen h-screen fixed top-0 left-0  z-10 ') : ('')}>
        <div className={menu ? ('bg-white w-[300px] h-screen absolute top-0 left-0 duration-300') : ('bg-white w-[300px] h-screen absolute top-0 left-[-100%] duration-300')}>
          <h1 className="font-bold font-serif text-2xl p-2 border-b-2"> VidyaVerse</h1>
          <CloseIcon className=' cursor-pointer absolute top-0 right-0 p-1 m-1 border focus:border-gray-50 border-1 focus:border-2 rounded-full' sx={{ fontSize: 40 }} onClick={(e) => setMenu(prev => (!prev))} />
          <nav>
            <ul className='flex flex-col p-1 ml-1'>
              {islogin && <>
                <NavLink to="/aboutus" className='text-xl font-sans flex border-1 border-black py-2 '><InfoIcon className='mr-2 pt-1' />about us</NavLink>
                <NavLink to="/contactus" className='text-xl font-sans flex border-1 border-black py-2 '><ContactSupportIcon className='mr-2 pt-1' />contact us</NavLink>
                <NavLink to="/home" className='text-xl font-sans flex border-1 border-black py-2 '><HomeIcon className='mr-2 pt-1' />Home</NavLink>
                <NavLink to="/aihelp" className='text-xl font-sans flex border-1 border-black py-2 '><DesignServicesIcon className='mr-2 pt-1' />Ai Help</NavLink>
                <NavLink to="" className='text-xl font-sans flex border-1 border-black py-2 '><ExitToAppIcon className='mr-2 pt-1' />services</NavLink>
              </>
              }
              {!islogin && <>
                <NavLink to="/signin" className='text-xl font-sans flex border-1 border-black py-2 '><InfoIcon className='mr-2 pt-1' />signin</NavLink>
                <NavLink to="/signup" className='text-xl font-sans flex border-1 border-black py-2 '><ContactSupportIcon className='mr-2 pt-1' />signup</NavLink>
              </>

              }
            </ul>
          </nav>
        </div>
      </div>

      <div className={` hidden  lg:flex-row lg:items-center lg:h-12 lg:justify-between lg:flex  transition-all duration-300`}>
        {/* Common styles for all links */}
        {islogin && <>
          <NavLink to="/home" className="flex justify-center border  ml-2 mr-2 bg-blue-700  p-2 rounded-md font-serif hover:bg-blue-800 hover:text-white text-lg transition-all " >

            <span className="material-symbols-outlined  hover:text-black mr-0.5 align-middle">
              home
            </span>
            Home
          </NavLink>

          {/* About Us Link */}
          <NavLink className="flex justify-center border   ml-2 mr-2 bg-blue-700  p-2 rounded-md font-serif hover:bg-blue-800 hover:text-white text-lg" to="/aboutus">
            <>About Us</>
          </NavLink>

          {/* Services Link */}
          <NavLink className="flex justify-center border  ml-2 mr-2 bg-blue-700  p-2 rounded-md font-serif hover:bg-blue-800 hover:text-white text-lg" to="/contactus">
            <>contactus</>
          </NavLink>

          {/* Settings Link */}
          <NavLink className="flex justify-center border  ml-2 mr-2 bg-blue-700  p-2 rounded-md font-serif hover:bg-blue-800 hover:text-white text-lg" to="/aihelp">
            Ai Help
          </NavLink>

          {/* Goodbye Link */}
          <button className="flex justify-center border  ml-2 mr-2 bg-blue-700  p-2 rounded-md font-serif hover:bg-blue-800 hover:text-white text-lg" onClick={signOut} >
            <>SignOut</>
          </button>
          <div className='bg-blue-500  rounded-md  ml-2 mr-2'>
            <NavLink to="/profile">
              <AccountBoxIcon sx={{"fontSize":45,color:'white'}}/>
            </NavLink>
          </div>
        </>
        }
        {!islogin && <>
          <NavLink className="flex justify-center border  ml-2 mr-2 bg-blue-700  p-2 rounded-md font-serif hover:bg-blue-800 hover:text-white text-lg" to="signin">
            <>signin</>
          </NavLink>
          <NavLink className="flex justify-center border  ml-2 mr-2 bg-blue-700  p-2 rounded-md font-serif hover:bg-blue-800 hover:text-white text-lg" to="signup">
            <>signup</>
          </NavLink>
        </>
        }
      </div>
    </div>
  );
};

export default Navbar1;
