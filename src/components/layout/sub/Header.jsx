import { Tooltip } from "@nextui-org/tooltip";
import { BellIcon } from "lucide-react";
import Breadcrumb from "../../global/Breadcrumb";

export default function Header() {
  return (
    <header className="bg-white h-16 flex flex-shrink-0 items-center justify-between px-4 relative z-30 shadow-md">
      <h1 className="text-xl font-bold">
        <Breadcrumb />
      </h1>
      <div className="flex items-center space-x-4">
        <Tooltip content="Notifications">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <BellIcon size={20} />
          </button>
        </Tooltip>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
