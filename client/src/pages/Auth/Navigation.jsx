import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApislice.js";
import { logout } from "../../redux/features/auth/authSlice";

import ContentWrapper from "../../components/ContentWrapper.jsx";

import { toast } from "react-toastify";

import Logo from "../../assets/logo.png";
import AdminMenu from "../Admin/AdminMenu.jsx";

import FavoritesCount from "../Products/FavoritesCount.jsx";

import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import { motion } from "framer-motion";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(userInfo);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [showSidebar, setShowSidebar] = useState(false);

  //Mobile devices
  const [mobileMenu, setMobileMenu] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
      toast.success("User successfully Logged out");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[80px] p-5 text-black text-center z-50 transition-all ease-in duration-300 flex justify-between items-center shadow-md bg-white`}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FFB900] z-50"></div>
      <ContentWrapper>
        <div className="flex justify-between items-center text-black">
          <div className="flex justify-between items-center w-full ">
            <div className="flex gap-10">
              <div>
                <button
                  className={`rounded-lg flex text-black hover:text-[#FFB900]`}
                  onClick={openMobileMenu}
                >
                  {mobileMenu ? (
                    <AiOutlineClose
                      color="#FFB900"
                      size={26}
                      className="text-black hover:text-[#FFB900]"
                    />
                  ) : (
                      <HiOutlineMenuAlt1
                      color="#FFB900"
                        size={26}
                      className="text-black hover:text-[#FFB900]"
                      />
                  )}
                </button>
              </div>
              <div className="hidden md:flex xl:flex lg:flex justify-center gap-6 items-center">
                <Link to="/" className="flex items-center">
                  <AiOutlineHome
                    size={26}
                    className="text-black hover:text-[#FFB900]"
                  />
                </Link>
                <Link to="/shop" className="flex items-center">
                  <AiOutlineShopping
                    size={26}
                    className="text-black hover:text-[#FFB900]"
                  />
                </Link>
                <Link to="/cart" className="flex items-center relative">
                  <AiOutlineShoppingCart
                    size={26}
                    className="text-black hover:text-[#FFB900]"
                  />
                  <div className="absolute top-[-10px] left-4">
                    {cartItems?.length > 0 && (
                      <span>
                        <span className="h-4 w-4 px-1 py-0 text-sm bg-[#FFB900] text-black rounded-full font-bold border border-black">
                          {cartItems?.reduce((a, c) => a + c.qty, 0)}
                        </span>
                      </span>
                    )}
                  </div>
                </Link>
                <Link to="/favorite" className="flex items-center relative">
                  <MdOutlineFavoriteBorder
                    size={26}
                    className="text-black hover:text-[#FFB900]"
                  />
                  <FavoritesCount />
                </Link>
              </div>
            </div>

            <Link to="/" className=" md:flex items-center">
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={Logo}
                className="w-[140px]"
              />
            </Link>

            <div
              className={`${userInfo?.isAdmin ? "flex gap-2 md:gap-3" : ""} relative`}
            >
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                {userInfo ? (
                  <span className="flex gap-2 text-base font-bold capitalize text-black hover:text-[#FFB900]">
                    <p>Hello,</p> {userInfo.username}
                  </span>
                ) : (
                  <></>
                )}
                {userInfo && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ml-1 ${dropdownOpen ? "transform rotate-0 transition-transform" : "transform rotate-360 transition-transform"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#FFB900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                )}
              </button>

              <div
                onClick={() => setDropdownOpen(false)}
                className="relative w-full"
              >
                {userInfo?.isAdmin && (
                  <AdminMenu
                    setDropdownOpen={setDropdownOpen}
                    dropdownOpen={dropdownOpen}
                  />
                )}
              </div>

              {dropdownOpen && userInfo && (
                <ul
                  className={`absolute bg-white text-black rounded shadow-lg top-[50px] right-0 border border-[#FFB900] w-40 lg:w-52 z-20`}
                  onClick={() => setDropdownOpen(false)}
                >
                  <h2 className="w-full text-sm xl:text-lg font-semibold xl:font-bold border-b border-[#FFB900] py-3">
                    My Account
                  </h2>

                  {userInfo.isAdmin && (
                    <>
                      <li className="flex items-center hover:bg-[#FFB900] hover:text-black transition-all duration-500 h-8 rounded m-2 px-2">
                        <Link
                          to="/admin/dashboard"
                          className="flex gap-3 items-center justify-center "
                        >
                          <MdOutlineSpaceDashboard size={24} />
                          Dashboard
                        </Link>
                      </li>
                      <li className="flex items-center hover:bg-[#FFB900] hover:text-black transition-all duration-500 h-8 rounded m-2 px-2">
                        <Link
                          to="/admin/productlist"
                          className="flex gap-3 items-center justify-center "
                        >
                          <BsBoxSeam size={24} />
                          Products
                        </Link>
                      </li>
                      <li className="flex items-center hover:bg-[#FFB900] hover:text-black transition-all duration-500 h-8 rounded m-2 px-2">
                        <Link
                          to="/admin/categorylist"
                          className="flex gap-3 items-center justify-center "
                        >
                          <MdOutlineCategory size={24} />
                          Category
                        </Link>
                      </li>
                      <li className="flex items-center hover:bg-[#FFB900] hover:text-black transition-all duration-500 h-8 rounded m-2 px-2">
                        <Link
                          to="/admin/orderlist"
                          className="flex gap-3 items-center justify-center "
                        >
                          <CiCircleList size={24} />
                          Orders
                        </Link>
                      </li>
                      <li className="flex items-center hover:bg-[#FFB900] hover:text-black transition-all duration-500 h-8 rounded m-2 px-2 border-b border-[#FFB900] mb-4">
                        <Link
                          to="/admin/userlist"
                          className="flex gap-3 items-center justify-center "
                        >
                          <RiContactsLine size={24} />
                          Users
                        </Link>
                      </li>
                    </>
                  )}

                  <li className="flex hover:bg-[#FFB900] hover:text-black transition-all duration-500 h-8 rounded m-2 px-2">
                    <Link
                      to="/profile"
                      className="flex gap-3 items-center justify-center "
                    >
                      <RiAccountCircleLine size={24} />
                      Profile
                    </Link>
                  </li>
                  <li className="flex items-center hover:bg-[#FFB900] hover:text-black transition-all duration-500 h-8 rounded m-2 px-2">
                    <button
                      onClick={logoutHandler}
                      className="flex gap-3 items-center justify-center"
                    >
                      <MdLogout size={24} />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {!userInfo && (
              <ul className="flex justify-between items-center gap-4">
                <li>
                  <Link to="/login" className="flex items-center text-black hover:text-[#FFB900]">
                    <AiOutlineLogin size={26} className="" />
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="flex items-center text-black hover:text-[#FFB900]">
                    <AiOutlineUserAdd size={26} className="" />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu  */}
        {mobileMenu && (
          <div
            className={`mobile bg-[#FFB900] h-[100vh] flex text-black pt-4`}
            onClick={() => setMobileMenu(false)}
          >
            <ContentWrapper>
              <Link
                to="/"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <span className="text-2xl lg:text-5xl font-bold pl-5 xl:pl-0">
                  Home
                </span>{" "}
              </Link>

              <Link
                to="/shop"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <span className="text-2xl lg:text-5xl font-bold pl-5 xl:pl-0">
                  Shop
                </span>{" "}
              </Link>

              <Link to="/cart" className="flex relative">
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                  <span className="text-2xl lg:text-5xl font-bold pl-5 xl:pl-0">
                    Cart
                  </span>{" "}
                </div>
              </Link>

              <Link to="/favorite" className="flex relative">
                <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                  <span className="text-2xl lg:text-5xl font-bold pl-5 xl:pl-0">
                    Favorites
                  </span>
                </div>
              </Link>
            </ContentWrapper>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};
export default Navigation;
