import { getUrl } from "@/utils/getImageUrl";
import { useMeQuery } from "@/utils/user";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";

const links = [
  { icon: HiOutlineUsers, path: "/feed/friends", title: "Friends" },
  { icon: FaBookmark, path: "/feed/saved", title: "Saved" },
];

export default function LeftSidebar() {
  const { user } = useMeQuery();
  return (
    <aside className="left-sidebar lg:block hidden">
      <ul className="grid gap-4 panel">
        <li className="hover:bg-gray-100 p-2 rounded-md">
          <Link to={`/profile/${user?.id}`} className="center-y gap-x-3">
            <img
              src={user ? getUrl(user.image) : ""}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-600 text-sm font-bold">
              Your Profile
            </span>
          </Link>
        </li>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="center-y hover:bg-gray-100 p-2 rounded-md"
            >
              <div className="p-3 rounded-full mr-2 bg-gray-200">
                <link.icon className="text-blue-600 text-xl" />
              </div>
              <span className="text-gray-600 text-sm font-bold">
                {link.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
