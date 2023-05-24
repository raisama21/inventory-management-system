import { Link } from "react-router-dom";

/* react icons */
import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineLogin, AiOutlinePlus } from "react-icons/ai";
import { HiTemplate } from "react-icons/hi";
import { AiFillFileAdd, AiFillFileText } from "react-icons/ai";

export default function SideNavigationBar() {
  return (
    <nav className="min-w-[320px] min-h-screen shadow-lg flex flex-col relative">
      <Link to="/">
        <div className="flex items-center gap-2 py-3 pl-4 border-b-2 border-neutral-1/20">
          <MdDashboard className="w-6 h-6 block" />
          <span className="text-neutral-1 font-medium">Dashboard</span>
        </div>
      </Link>

      <Link to="product">
        <div className="flex items-center gap-2 py-3 pl-4 border-b-2 border-neutral-1/20">
          <HiTemplate className="w-6 h-6 block" />
          <span className="text-neutral-1 font-medium">Product List</span>
        </div>
      </Link>

      <Link to="add-product">
        <div className="py-3 pl-4 border-b-2 border-neutral-1/20">
          <div className="mr-5 flex item-center gap-2 border border-neutral-1 p-2 rounded-full">
            <AiOutlinePlus className="w-6 h-6 block" />
            <span className="text-neutral-1 font-medium">Add Product</span>
          </div>
        </div>
      </Link>

      <Link to="invoice">
        <div className="flex items-center gap-2 py-3 pl-4 border-b-2 border-neutral-1/20">
          <AiFillFileText className="w-6 h-6 block" />
          <span className="text-neutral-1 font-medium">Invoice</span>
        </div>
      </Link>

      <Link to="create_invoice">
        <div className="flex items-center gap-2 py-3 pl-4 border-b-2 border-neutral-1/20">
          <AiFillFileAdd className="w-6 h-6 block" />
          <span className="text-neutral-1 font-medium capitalize">
            create invoice
          </span>
        </div>
      </Link>

      <Link to="profile">
        <div className="flex items-center gap-2 py-3 pl-4 border-b-2 border-neutral-1/20">
          <FaUserAlt className="w-6 h-6 block" />
          <span className="text-neutral-1 font-medium">User Profile</span>
        </div>
      </Link>
    </nav>
  );
}
