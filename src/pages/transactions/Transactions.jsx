import { Tooltip } from "@nextui-org/tooltip";
import { Eye, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import transactions from "../../data/transactions";
import TransactionDetailModal from "./components/TransactionDetailModal";

const Transactions = () => {
  const PAGE_SIZE = 5; // Define your page size
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(PAGE_SIZE); // Fixed page size

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  useEffect(() => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchTerm]);

  // Get paginated transactions
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-dark-3 rounded-lg shadow-md p-6 text-primary dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Search Bar */}
      <div
        id="search-bar"
        className="flex justify-start items-center rounded-lg p-1 overflow-hidden bg-slate-100 dark:border-1 dark:border-slate-500 dark:bg-dark-1 mb-5"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-slate-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Transaction Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-slate-100 dark:bg-dark-3 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {transaction.course}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {transaction.transactionDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {transaction.status}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    ${transaction.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <Tooltip
                      showArrow={true}
                      content="View Detail"
                      delay={500}
                      closeDelay={0}
                    >
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleViewDetail(transaction)}
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
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Transaction Detail Modal */}
        <TransactionDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={selectedTransaction}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav className="relative inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
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
              setCurrentPage(Math.min(currentPage + 1, totalPages))
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

export default Transactions;
