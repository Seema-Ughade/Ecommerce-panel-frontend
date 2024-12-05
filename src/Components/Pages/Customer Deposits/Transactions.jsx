import React, { useState } from 'react';

const Transactions = () => {
  const [transactionDetails, setTransactionDetails] = useState(null);

  // Sample data for transactions
  const transactions = [
    {
      customerName: 'User',
      amount: '+15$',
      transactionId: '9o723826yB',
      date: '2024-11-05',
      details: 'Reward Point Convert',
      transactionDate: '2024-11-05 10:30:00',
    },
    {
      customerName: 'User',
      amount: '+15$',
      transactionId: '9227488c8O',
      date: '2024-08-25',
      details: 'Purchase',
      transactionDate: '2024-08-25 08:15:00',
    },
    {
      customerName: 'User',
      amount: '+500$',
      transactionId: 'YPq2189Rza',
      date: '2024-08-25',
      details: 'Refund',
      transactionDate: '2024-08-25 09:30:00',
    },
    {
      customerName: 'User',
      amount: '+22.50$',
      transactionId: 'sdk6136y6v',
      date: '2024-08-20',
      details: 'Reward Point Convert',
      transactionDate: '2024-08-20 06:42:16',
    },
  ];

  // Function to handle the details button click
  const handleDetailsClick = (transaction) => {
    setTransactionDetails(transaction);
  };

  // Function to close the details modal
  const handleCloseDetails = () => {
    setTransactionDetails(null);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Transactions</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{transaction.customerName}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transactionId}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.date}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.details}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDetailsClick(transaction)}
                    className="text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 rounded-2xl"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Transaction Details Modal */}
        {transactionDetails && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-2xl font-semibold mb-4">Transaction Details</h3>
              <div>
                <p><strong>Customer Name:</strong> {transactionDetails.customerName}</p>
                <p><strong>Amount:</strong> {transactionDetails.amount}</p>
                <p><strong>Transaction ID:</strong> {transactionDetails.transactionId}</p>
                <p><strong>Details:</strong> {transactionDetails.details}</p>
                <p><strong>Transaction Date:</strong> {transactionDetails.transactionDate}</p>
              </div>
              <button
                onClick={handleCloseDetails}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
