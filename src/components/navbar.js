import { React, useState } from 'react'
import Menu from '../config/menu'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { UserAuth } from '../context/AuthContext';
import {useScrollPosition} from '../util/useScrollPosition';
import { Link } from 'react-router-dom';
// import Logo from "../assets/Logo";
import Logo from "../assets/flame.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const { user, logOut, navigate } = UserAuth();
  const menu = user ? Menu.in : Menu.out;

  const handleClick = async () => {
    try {
      await logOut();
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    // Root Nav
    <div className='flex w-full bg-purple-gray z-[5]'>
      {/* Top or Desktop Nav */}
      <div className='flex w-full'>
        <div className='flex justify-between w-full p-[15px] md:px-[50px] mx-auto'>
          <div className='flex'>
            <Link to="/" className='flex lg:text-3xl text-2xl font-bungee text-magic-mint items-center mr-5'>Stock Nitro
                <img alt='StockNitro Logo' className="h-[25px w-[25px] pb-2" src={Logo} />
            </Link>
            {menu.map(item => (
            <Link key={item.anchor} to={item.url} className="md:flex hidden my-[5px] ml-[35px] overflow-hidden relative align-middle md:text-2xl text-xl font-space-grotesk text-white hover:underline underline-offset-8 decoration-4 hover:-translate-y-1 duration-75">
              {item.anchor}
            </Link>
            ))}
          </div>

          {user ?
            <div className='flex'><p onClick={handleClick} className='md:flex hidden font-space-grotesk text-purple-gray bg-magic-mint md:text-2xl text-xl items-center py-[10px] px-[15px] rounded-lg cursor-pointer hover:underline underline-offset-4 decoration-1 hover:-translate-y-0.5 duration-75'>
              Sign out
            </p>
            </div> :
            <div className='flex gap-2'>
              <Link to='/signin' className='md:flex hidden font-space-grotesk text-purple-gray bg-magic-mint md:text-2xl text-xl items-center py-[10px] px-[15px] rounded-lg cursor-pointer hover:underline underline-offset-4 decoration-1 hover:-translate-y-0.5 duration-75'>
                Sign In
              </Link>
              <Link to='/register' className='md:flex hidden font-space-grotesk text-purple-gray bg-magic-mint md:text-2xl text-xl items-center py-[10px] px-[15px] rounded-lg cursor-pointer hover:underline underline-offset-4 decoration-1 hover:-translate-y-0.5 duration-75'>
                  Register
              </Link>
            </div>
          }
          {open ? <AiOutlineClose onClick={() => setOpen(false)} className='md:hidden cursor-pointer' color='#acfcd9' size={25} /> : <AiOutlineMenu onClick={() => setOpen(true)} className='md:hidden cursor-pointer' color='#acfcd9' size={25} />}
        </div>
      </div>
      {/* <div className='absolute flex flex-col top-0 left-0 bg-purple-gray border border-r-magic-mint min-h-full max-w-[400px]'>
              <p className='text-white font-bold text-xl '>Stock Nitro</p>
      </div> */}
    </div>
  )
}

export default Navbar