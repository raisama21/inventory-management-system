import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { BsFillBoxFill } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

export default function SideNavigationBar() {
  const [{ user_data }, removeCookie] = useCookies(["user_data"]);
  const [showMenu, setShowMenu] = useState(false);

  function handleMenu() {
    setShowMenu((prevData) => !prevData);
  }

  function handleLogout() {
    removeCookie("user_data");
  }

  return (
    <nav>
      <div className="flex items-center justify-between p-3 border-b border-[rgb(0, 30, 43)]">
        <Link to="/">
          <div className="flex items-center gap-2">
            <BsFillBoxFill className="w-6 h-6 block" />
            <span>New Inventory</span>
          </div>
        </Link>

        <div>
          {!user_data?.token ? (
            <Link to="/login">
              <button className="flex items-center gap-2 py-2 px-3 rounded-full border border-[rgb(0, 30, 43)]">
                <span>Login</span>
                <GoTriangleDown className="block" />
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={handleMenu}
                className="flex items-center gap-2 py-2 px-3 rounded-full border border-[rgb(0, 30, 43)]"
              >
                <span>{user_data?.username}</span>
                <GoTriangleDown className="block" />
              </button>

              {showMenu && (
                <div className="py-4 top-[61px] -left-16 right-0 absolute shadow-xl rounded-lg">
                  <div onClick={handleMenu} className="py-2 px-5 font-medium">
                    <Link to="/profile">
                      <FaUserAlt className="inline mr-2" />
                      <span>Profile</span>
                    </Link>
                  </div>
                  <div className="py-2 px-5 font-medium">
                    <button onClick={handleLogout}>
                      <FiLogOut className="inline mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
