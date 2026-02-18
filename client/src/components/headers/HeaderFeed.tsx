import logo from "@/assets/facebook.png";
import { FaSearch, FaFacebookMessenger, FaBell } from "react-icons/fa";
import { RiHome5Fill } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useMeQuery } from "@/utils/user";
import { mainEndPoint } from "@/assets/assets";

const iconsLinks = [
  { icon: RiHome5Fill, path: "/feed" },
  { icon: HiOutlineUsers, path: "/friends" },
];

export default function HeaderFeed() {
  const { pathname } = useLocation();
  const { user } = useMeQuery();
  return (
    <header className="bg-white shadow-md p-4 z-9999 fixed top-0 left-0 w-full h-fit">
      <div className="container center-y">
        <Link to="/feed" className="logo">
          <img src={logo} alt="Facebook Logo" className="w-10 h-10" />
        </Link>
        <div className="ml-6 md:flex hidden search relative items-center justify-center">
          <FaSearch className="absolute left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="py-2 pr-6 pl-10 bg-gray-100 rounded-full"
          />
        </div>
        <div className="md:hidden flex ml-4">
          <button className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer">
            <FaSearch />
          </button>
        </div>
        <div className="icons grow center gap-x-2">
          {iconsLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <link.icon
                className={`text-2xl ${pathname === link.path ? "text-blue-600" : "text-gray-600"}`}
              />
            </Link>
          ))}
        </div>
        <div className="user-actions center-y gap-x-3">
          <Link
            to="/feed/messenger"
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
          >
            <FaFacebookMessenger className="text-gray-700 text-xl" />
          </Link>
          <Link
            to="/feed/notifications"
            className="relative bg-gray-100 hover:bg-gray-200 p-3 rounded-full"
          >
            <span className="absolute bg-red-500 text-white w-4 h-4 center rounded-full text-sm -top-1 -right-1">
              0
            </span>
            <FaBell className="text-gray-700 text-xl" />
          </Link>
          <Link to="/profile">
            <img
              src={
                user?.image.public_id
                  ? user?.image.url
                  : mainEndPoint + user?.image.url
              }
              className="w-10 h-10 rounded-full"
              alt={user?.username}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
