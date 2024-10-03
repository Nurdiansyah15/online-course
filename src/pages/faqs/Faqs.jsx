import { Tooltip } from "@nextui-org/tooltip";
import { Edit, PlusIcon, Search, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import faqData from "../../data/faqs";
import AddEditFAQModal from "./components/AddEditFaqModal";

const Faqs = () => {
  const PAGE_SIZE = 5;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState(faqData);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredItems.length / pageSize);

  useEffect(() => {
    // Filter item berdasarkan searchTerm
    const filtered = faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Set filtered items dan kembali ke halaman pertama jika ada pencarian
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchTerm, faqData]);

  // Ambil item sesuai halaman saat ini
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddFAQ = () => {
    setSelectedFAQ(null);
    setIsModalOpen(true);
  };

  const handleEditFAQ = (faq) => {
    setSelectedFAQ(faq);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-dark-3 rounded-lg shadow-md p-6 text-primary dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      {/* Add Item Button */}
      <div className="mb-5 flex justify-between">
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
          <Tooltip showArrow={true} content="Clear" delay={500} closeDelay={0}>
            <button
              className="p-2 flex justify-center items-center"
              onClick={() => setSearchTerm("")}
            >
              <X />
            </button>
          </Tooltip>
        </div>
        <Tooltip showArrow={true} content="Add" delay={500} closeDelay={0}>
          <button
            className="text-success py-2 px-4"
            onClick={() => handleAddFAQ()}
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
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Answer
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
                    {item.question}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.answer}
                  </td>
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="px-6 py-4 text-sm font-medium"
                  >
                    <Tooltip
                      showArrow={true}
                      content="Detail"
                      delay={500}
                      closeDelay={0}
                    >
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditFAQ(item)}
                      >
                        <Edit size={20} />
                      </button>
                    </Tooltip>
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
      <AddEditFAQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedFAQ}
      />
    </div>
  );
};

export default Faqs;
