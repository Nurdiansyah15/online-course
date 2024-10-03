import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { Eye, PlusIcon, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../data/users"; // Pastikan data ini sesuai dengan struktur Anda

const Users = () => {
  const PAGE_SIZE = 5;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(users);

  // State untuk filter
  const [isOnlineChecked, setIsOnlineChecked] = useState(false);
  const [isVerifiedChecked, setIsVerifiedChecked] = useState(false);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredItems.length / pageSize);

  useEffect(() => {
    // Filter item berdasarkan searchTerm dan checkbox
    const filtered = users.filter((item) => {
      const matchesSearchTerm =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesOnlineStatus = isOnlineChecked ? item.status.online : true;
      const matchesVerifiedStatus = isVerifiedChecked
        ? item.status.verified
        : true;

      return matchesSearchTerm && matchesOnlineStatus && matchesVerifiedStatus;
    });

    // Set filtered items dan kembali ke halaman pertama jika ada pencarian
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, isOnlineChecked, isVerifiedChecked]);

  // Ambil item sesuai halaman saat ini
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white dark:bg-dark-3 rounded-lg shadow-md p-6 text-primary dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {/* Add Item Button */}
      <div className="mb-5 flex justify-between">
        <div className="flex gap-4">
          <div
            id="search-bar"
            className="flex justify-start items-center rounded-lg p-1 overflow-hidden bg-slate-100 dark:border-1 dark:border-slate-500 dark:bg-dark-1"
            style={{
              width: "350px",
              transition: "width 0.5s ease-in-out",
            }}
          >
            <button className="p-2 flex justify-center items-center dark:bg-dark-1">
              <Search />
            </button>
            <input
              placeholder="Search"
              type="text"
              className="w-full bg-transparent dark:bg-dark-1 outline-none p-1"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Tooltip
              showArrow={true}
              content="Clear"
              delay={500}
              closeDelay={0}
            >
              <button
                className="p-2 flex justify-center items-center"
                onClick={() => setSearchTerm("")}
              >
                <X />
              </button>
            </Tooltip>
          </div>
          <Popover placement="right-start">
            <PopoverTrigger>
              <Button className="bg-slate-100 text-slate-600 h-12 rounded-lg">
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="rounded-md ">
              <div className="px-1 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="online"
                    className="mr-2"
                    checked={isOnlineChecked}
                    onChange={(e) => setIsOnlineChecked(e.target.checked)}
                  />
                  Online
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="verified"
                    className="mr-2"
                    checked={isVerifiedChecked}
                    onChange={(e) => setIsVerifiedChecked(e.target.checked)}
                  />
                  Verified
                </label>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Tooltip showArrow={true} content="Add" delay={500} closeDelay={0}>
          <button
            className="text-success py-2 px-4"
            onClick={() => navigate("/users/create")}
          >
            <PlusIcon size={24} />
          </button>
        </Tooltip>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-slate-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-100 dark:bg-dark-3 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.email}
                  </td>
                  <td className="flex gap-2 px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div
                      className={`flex items-center px-4 rounded-full text-white ${
                        item.status.online ? "bg-success" : "bg-default"
                      }`}
                    >
                      {item.status.online ? "Online" : "Offline"}
                    </div>
                    <div
                      className={`flex items-center px-4 rounded-full text-white ${
                        item.status.verified ? "bg-primary" : "bg-default"
                      }`}
                    >
                      {item.status.verified ? "Verified" : "Unverified"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.role}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <Tooltip
                      showArrow={true}
                      content="Detail"
                      delay={500}
                      closeDelay={0}
                    >
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => navigate(`/users/detail`)}
                      >
                        <Eye size={20} />
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav className="relative inline-flex rounded-md shadow-sm">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Users;
