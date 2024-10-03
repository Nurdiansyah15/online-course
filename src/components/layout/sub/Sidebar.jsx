import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import {
  AppWindow,
  Book,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileQuestion,
  HomeIcon,
  LogOutIcon,
  Ticket,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const getFirstPath = () => {
    if (location.pathname === "/") {
      return "dashboard";
    }
    const path = location.pathname.split("/")[1];
    return path;
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <HomeIcon size={20} />, name: "Dashboard", path: "/" },
    { icon: <Book size={20} />, name: "Courses", path: "/courses" },
    { icon: <UsersIcon size={20} />, name: "Users", path: "/users" },
    { icon: <Ticket size={20} />, name: "Transactions", path: "/transactions" },
  ];
  const settingItems = [
    {
      icon: <AppWindow size={20} />,
      name: "Application",
      path: "/settings",
    },
    { icon: <FileQuestion size={20} />, name: "Faqs", path: "/faqs" },
  ];

  return (
    <aside
      className={`bg-white text-black transition-all duration-500 flex-shrink-0 ${
        isOpen ? "w-56" : "w-14 items-center"
      } flex flex-col px-2 relative shadow-lg z-50`}
    >
      <div className="p-4 flex items-center justify-between">
        {isOpen && (
          <img src="/src/assets/react.svg" alt="Logo" className="h-8" />
        )}
        <Tooltip
          content={isOpen ? "Close Sidebar" : "Open Sidebar"}
          placement="right"
        >
          <Button
            isIconOnly
            className=" bg-white text-black hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <ChevronLeftIcon size={20} />
            ) : (
              <ChevronRightIcon size={20} />
            )}
          </Button>
        </Tooltip>
      </div>
      <nav className="flex-grow">
        {/* Menu Header */}
        <div
          className={`mb-2 px-4 py-2 text-sm font-semibold ${
            isOpen ? "" : "hidden"
          }`}
        >
          MENU
        </div>

        {/* Menu Items */}
        <div>
          {menuItems.map((item, index) =>
            isOpen ? (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `w-full text-left mb-2 p-2 hover:text-white hover:bg-primary transition-colors flex justify-start items-center rounded-lg ${
                    isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </NavLink>
            ) : (
              <Tooltip content={item.name} placement="right" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full text-left mb-2 p-2 hover:text-white hover:bg-primary transition-colors flex justify-center items-center rounded-lg ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  {item.icon}
                </NavLink>
              </Tooltip>
            )
          )}
        </div>

        {/* Settings Header */}
        <div
          className={`mb-2 px-4 py-2 text-sm font-semibold ${
            isOpen ? "" : "hidden"
          }`}
        >
          SETTINGS
        </div>

        {/* Settings Items */}
        <div>
          {settingItems.map((item, index) =>
            isOpen ? (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `w-full text-left mb-2 p-2 hover:text-white hover:bg-primary transition-colors flex justify-start items-center rounded-lg ${
                    isActive ? "bg-primary text-white" : ""
                  }`
                }
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </NavLink>
            ) : (
              <Tooltip content={item.name} placement="right" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full text-left mb-2 p-2 hover:text-white hover:bg-primary transition-colors flex justify-center items-center rounded-lg ${
                      isActive ? "bg-primary text-white" : ""
                    }`
                  }
                >
                  {item.icon}
                </NavLink>
              </Tooltip>
            )
          )}
        </div>
      </nav>

      <div className="py-4">
        {isOpen ? (
          <button
            className={`w-full bg-danger text-white p-2 rounded-lg flex items-center justify-center hover:opacity-80 transition-colors `}
          >
            <LogOutIcon size={20} />
            <span className="ml-2 overflow-hidden">Logout</span>
          </button>
        ) : (
          <Tooltip content="Logout" placement="right">
            <button
              className={`w-full bg-danger text-white p-2 rounded-lg flex items-center justify-center hover:opacity-80 transition-colors `}
            >
              <LogOutIcon size={20} />
            </button>
          </Tooltip>
        )}
      </div>
    </aside>
  );
}
