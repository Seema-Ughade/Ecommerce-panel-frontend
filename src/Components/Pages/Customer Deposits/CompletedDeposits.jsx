// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CompletedDeposits = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [filteredDeposits, setFilteredDeposits] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     // Fetch completed deposits from the backend
//     const fetchDeposits = async () => {
//       try {
//         const response = await axios.get('https://your-api-endpoint.com/api/deposits'); // Replace with your API endpoint
//         setDeposits(response.data);
//         setFilteredDeposits(response.data);
//       } catch (error) {
//         console.error('Error fetching deposits:', error);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   useEffect(() => {
//     // Filter deposits based on search term
//     const results = deposits.filter((deposit) =>
//       deposit.customerName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredDeposits(results);
//     setCurrentPage(1); // Reset to the first page whenever the search term changes
//   }, [searchTerm, deposits]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
//   const currentDeposits = filteredDeposits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container">
//       <div className="content-area">
//         <h4 className="heading text-2xl font-semibold mb-4">Completed Deposits</h4>

//         <div className="flex justify-between mb-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <table className="min-w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-teal-400 text-white font-mono">
//               <th className="border border-gray-300 px-4 py-2">Customer Name</th>
//               <th className="border border-gray-300 px-4 py-2">Amount</th>
//               <th className="border border-gray-300 px-4 py-2">Payment Method</th>
//               <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {currentDeposits.map((deposit, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 px-4 py-2">{deposit.customerName}</td>
//                 <td className="border border-gray-300 px-4 py-2">{deposit.amount}</td>
//                 <td className="border border-gray-300 px-4 py-2">{deposit.paymentMethod}</td>
//                 <td className="border border-gray-300 px-4 py-2">{deposit.transactionId}</td>
//                 <td className="border border-gray-300 px-4 py-2">{deposit.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-between mt-4">
//           <div>
//             <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredDeposits.length)} of ${filteredDeposits.length} entries`}</span>
//           </div>
//           <div>
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="btn px-4 py-1 rounded border focus:outline-none"
//             >
//               Previous
//             </button>
//             {/* Page Number Indicators */}
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200 focus:outline-none`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="btn ml-2 px-4 py-1 rounded border focus:outline-none"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompletedDeposits;



import React, { useEffect, useState } from 'react';

const CompletedDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Use hardcoded demo data instead of fetching from an API
    const demoData = [
      {
        customerName: 'User',
        amount: '500$',
        paymentMethod: 'Paypal',
        transactionId: '4SB88894FL364091M',
        status: 'Completed',
      },
      {
        customerName: 'User',
        amount: '20.00$',
        paymentMethod: 'Razorpay',
        transactionId: 'pay_OIFiUHQnvbmZ75',
        status: 'Completed',
      },
      {
        customerName: 'User',
        amount: '20$',
        paymentMethod: 'Flutterwave',
        transactionId: '5812410',
        status: 'Completed',
      },
      {
        customerName: 'User',
        amount: '20$',
        paymentMethod: 'Authorize.net',
        transactionId: '80019532304',
        status: 'Completed',
      },
      {
        customerName: 'User',
        amount: '20$',
        paymentMethod: 'Stripe',
        transactionId: 'pi_3PNXkBJlIV5dN9n7083YGBB0',
        status: 'Completed',
      },
      {
        customerName: 'User',
        amount: '20$',
        paymentMethod: 'Paypal',
        transactionId: '5HB63541N9371622P',
        status: 'Completed',
      },
    ];
    setDeposits(demoData);
    setFilteredDeposits(demoData);
  }, []);

  useEffect(() => {
    // Filter deposits based on search term
    const results = deposits.filter((deposit) =>
      deposit.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDeposits(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, deposits]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
  const currentDeposits = filteredDeposits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Completed Deposits</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Payment Method</th>
              <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentDeposits.map((deposit, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{deposit.customerName}</td>
                <td className="border border-gray-300 px-4 py-2">{deposit.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{deposit.paymentMethod}</td>
                <td className="border border-gray-300 px-4 py-2">{deposit.transactionId}</td>
                <td className="border border-gray-300 px-4 py-2">{deposit.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredDeposits.length)} of ${filteredDeposits.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn px-4 py-1 rounded border focus:outline-none"
            >
              Previous
            </button>
            {/* Page Number Indicators */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1 rounded border focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedDeposits;
