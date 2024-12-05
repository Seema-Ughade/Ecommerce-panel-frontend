// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TrashIcon } from '@heroicons/react/24/solid';
// import { EditOutlined } from '@ant-design/icons';

// const Withdraws = () => {
//   const [withdraws, setWithdraws] = useState([]);
//   const [filteredWithdraws, setFilteredWithdraws] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     // Fetch withdraws from the backend
//     const fetchWithdraws = async () => {
//       try {
//         const response = await axios.get('https://your-backend-api.com/api/withdraws'); // Replace with your API endpoint
//         setWithdraws(response.data);
//         setFilteredWithdraws(response.data);
//       } catch (error) {
//         console.error('Error fetching withdraws:', error);
//       }
//     };

//     fetchWithdraws();
//   }, []);

//   useEffect(() => {
//     // Filter withdraws based on search term
//     const results = withdraws.filter((withdraw) =>
//       withdraw.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       withdraw.phone.includes(searchTerm)
//     );
//     setFilteredWithdraws(results);
//     setCurrentPage(1); // Reset to the first page whenever the search term changes
//   }, [searchTerm, withdraws]);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://your-backend-api.com/api/withdraws/${id}`); // Replace with your actual API endpoint
//       // Update the withdraws state to remove the deleted withdraw request
//       setWithdraws(withdraws.filter(withdraw => withdraw._id !== id)); // Use _id for filtering
//       setFilteredWithdraws(filteredWithdraws.filter(withdraw => withdraw._id !== id)); // Update filtered withdraws too
//     } catch (error) {
//       console.error('Error deleting withdraw:', error);
//     }
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(filteredWithdraws.length / itemsPerPage);
//   const currentWithdraws = filteredWithdraws.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container">
//       <div className="content-area">
//         <h4 className="heading text-2xl font-semibold mb-4">Withdraws</h4>

//         <div className="flex justify-between mb-4">
//           <input
//             type="text"
//             placeholder="Search by email or phone..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <table className="min-w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-teal-400 text-white font-mono">
//               <th className="border border-gray-300 px-4 py-2">Email</th>
//               <th className="border border-gray-300 px-4 py-2">Phone</th>
//               <th className="border border-gray-300 px-4 py-2">Amount</th>
//               <th className="border border-gray-300 px-4 py-2">Method</th>
//               <th className="border border-gray-300 px-4 py-2">Withdraw Date</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//               <th className="border border-gray-300 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {currentWithdraws.map((withdraw, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 px-4 py-2">{withdraw.email}</td>
//                 <td className="border border-gray-300 px-4 py-2">{withdraw.phone}</td>
//                 <td className="border border-gray-300 px-4 py-2">{withdraw.amount}</td>
//                 <td className="border border-gray-300 px-4 py-2">{withdraw.method}</td>
//                 <td className="border border-gray-300 px-4 py-2">{withdraw.withdrawDate}</td>
//                 <td className="border border-gray-300 px-4 py-2">{withdraw.status}</td>
//                 <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
//                   <button
//                     onClick={() => console.log('Edit Withdraw')}
//                     className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
//                     <EditOutlined className="h-5 w-5 mr-1" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(withdraw._id)} // Use withdraw._id for deletion
//                     className="flex items-center rounded-2xl text-white bg-red-900 hover:bg-red-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
//                     <TrashIcon className="h-5 w-5 mr-1" />
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-between mt-4">
//           <div>
//             <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredWithdraws.length)} of ${filteredWithdraws.length} entries`}</span>
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

// export default Withdraws;





import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const Withdraws = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [filteredWithdraws, setFilteredWithdraws] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Mock data for demonstration purposes
    const mockWithdraws = [
      { _id: '1', email: 'john@example.com', phone: '1234567890', amount: 500, method: 'Bank Transfer', withdrawDate: '2024-12-01', status: 'Pending' },
      { _id: '2', email: 'jane@example.com', phone: '9876543210', amount: 1000, method: 'PayPal', withdrawDate: '2024-12-02', status: 'Approved' },
      { _id: '3', email: 'mark@example.com', phone: '1122334455', amount: 300, method: 'Bank Transfer', withdrawDate: '2024-12-03', status: 'Pending' },
      { _id: '4', email: 'lucy@example.com', phone: '2233445566', amount: 1500, method: 'Bank Transfer', withdrawDate: '2024-12-04', status: 'Rejected' },
      { _id: '5', email: 'paul@example.com', phone: '3344556677', amount: 2000, method: 'PayPal', withdrawDate: '2024-12-05', status: 'Approved' },
      { _id: '6', email: 'anna@example.com', phone: '4455667788', amount: 700, method: 'PayPal', withdrawDate: '2024-12-06', status: 'Pending' },
      { _id: '7', email: 'robert@example.com', phone: '5566778899', amount: 400, method: 'Bank Transfer', withdrawDate: '2024-12-07', status: 'Approved' },
      { _id: '8', email: 'susan@example.com', phone: '6677889900', amount: 1200, method: 'PayPal', withdrawDate: '2024-12-08', status: 'Rejected' }
    ];

    setWithdraws(mockWithdraws);
    setFilteredWithdraws(mockWithdraws);
  }, []);

  useEffect(() => {
    // Filter withdraws based on search term
    const results = withdraws.filter((withdraw) =>
      withdraw.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdraw.phone.includes(searchTerm)
    );
    setFilteredWithdraws(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, withdraws]);

  const handleDelete = async (id) => {
    // Simulate delete action
    setWithdraws(withdraws.filter(withdraw => withdraw._id !== id)); // Use _id for filtering
    setFilteredWithdraws(filteredWithdraws.filter(withdraw => withdraw._id !== id)); // Update filtered withdraws too
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredWithdraws.length / itemsPerPage);
  const currentWithdraws = filteredWithdraws.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Withdraws</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Method</th>
              <th className="border border-gray-300 px-4 py-2">Withdraw Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentWithdraws.map((withdraw, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{withdraw.email}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.method}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.withdrawDate}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.status}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => console.log('Edit Withdraw')}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(withdraw._id)} // Use withdraw._id for deletion
                    className="flex items-center rounded-2xl text-white bg-red-900 hover:bg-red-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredWithdraws.length)} of ${filteredWithdraws.length} entries`}</span>
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

export default Withdraws;
