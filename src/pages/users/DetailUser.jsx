import { Tooltip } from "@nextui-org/react";
import { PlusIcon, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEnrollmentModal from "./components/AddEnrollmentModal";

// Data User
const user = {
  fullname: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe123",
  role: "Admin",
  isOnline: true,
  verified: true,
};

const enrolledCourses = [
  {
    id: 1,
    title: "React for Beginners",
    status: "enrolled", // status bisa "enrolled", "completed", atau lainnya
    enrolledAt: "2024-01-15",
    completedAt: null, // jika belum selesai
  },
  {
    id: 2,
    title: "Advanced Node.js",
    status: "completed",
    enrolledAt: "2023-10-20",
    completedAt: "2023-12-01",
  },
  {
    id: 3,
    title: "Tailwind CSS Mastery",
    status: "enrolled",
    enrolledAt: "2024-02-01",
    completedAt: null,
  },
];

const DetailUser = () => {
  const PAGE_SIZE = 5;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(enrolledCourses);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredItems.length / pageSize);

  useEffect(() => {
    // Filter item berdasarkan searchTerm
    const filtered = enrolledCourses.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Set filtered items dan kembali ke halaman pertama jika ada pencarian
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchTerm, enrolledCourses]);

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
      {/* Judul Halaman */}
      <h1 className="text-2xl font-bold mb-6">User Detail</h1>
      {/* Bagian User Information */}
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <div className="flex flex-col">
        {/* Row 1 */}
        <div className="flex bg-gray-100 dark:bg-dark-2 p-4 rounded-lg mb-2">
          <div className="flex-1">
            <label className="font-medium">Fullname</label>
            <p className="text-gray-600 dark:text-gray-300">{user.fullname}</p>
          </div>
          <div className="flex-1">
            <label className="font-medium">Role</label>
            <p className="text-gray-600 dark:text-gray-300">{user.role}</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex bg-white dark:bg-dark-3 p-4 rounded-lg mb-2">
          <div className="flex-1">
            <label className="font-medium">Email Address</label>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>
          <div className="flex-1">
            <label className="font-medium">Is Online</label>
            <p className="text-gray-600 dark:text-gray-300">
              {user.isOnline ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex bg-gray-100 dark:bg-dark-2 p-4 rounded-lg mb-2">
          <div className="flex-1">
            <label className="font-medium">Username</label>
            <p className="text-gray-600 dark:text-gray-300">{user.username}</p>
          </div>
          <div className="flex-1">
            <label className="font-medium">Verified</label>
            <p className="text-gray-600 dark:text-gray-300">
              {user.verified ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      {/* Bagian Enrolled Course */}
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mt-6 mb-4">Enrolled Course</h2>

        <Tooltip showArrow={true} content="Add" delay={500} closeDelay={0}>
          <button
            className="text-success py-2 px-4"
            onClick={() => setModalOpen(true)}
          >
            <PlusIcon size={24} />
          </button>
        </Tooltip>
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-slate-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Enrolled At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Completed At
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
                    //   onClick={() =>
                    //     handleOpenModal({ type: "detail", data: item })
                    //   }
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.enrolledAt}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.completedAt}
                    </td>
                    <td
                      onClick={(e) => e.stopPropagation()}
                      className="px-6 py-4 text-sm font-medium"
                    >
                      {/* <Tooltip
                          showArrow={true}
                          content="Detail"
                          delay={500}
                          closeDelay={0}
                        >
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => navigate(`/enrolledCourses/detail`)}
                          >
                            <FolderOpen size={20} />
                          </button>
                        </Tooltip> */}
                      <Tooltip
                        showArrow={true}
                        content="Delete"
                        delay={500}
                        closeDelay={0}
                      >
                        <button
                          className="text-red-500 hover:text-red-700 ml-4"
                          // onClick={() =>
                          //   handleOpenModal({ type: "delete", data: item })
                          // }
                        >
                          <Trash size={20} />
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
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
      <AddEnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default DetailUser;
