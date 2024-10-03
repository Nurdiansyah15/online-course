const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const transactions = [
  {
    id: generateUUID(),
    course: "React for Beginners",
    transactionDate: "2024-01-10",
    status: "Completed",
    total: 99.99,
  },
  {
    id: generateUUID(),
    course: "Advanced Node.js",
    transactionDate: "2024-02-15",
    status: "Pending",
    total: 149.99,
  },
  {
    id: generateUUID(),
    course: "JavaScript Essentials",
    transactionDate: "2024-03-05",
    status: "Completed",
    total: 79.99,
  },
  {
    id: generateUUID(),
    course: "Python for Data Science",
    transactionDate: "2024-04-12",
    status: "Cancelled",
    total: 119.99,
  },
  {
    id: generateUUID(),
    course: "CSS Flexbox and Grid",
    transactionDate: "2024-05-20",
    status: "Completed",
    total: 49.99,
  },
];

export default transactions;
