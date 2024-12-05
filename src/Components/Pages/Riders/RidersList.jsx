// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TrashIcon } from '@heroicons/react/24/solid';
// import { EditOutlined } from '@ant-design/icons';

// const RidersList = () => {
//   const [riders, setRiders] = useState([]);
//   const [filteredRiders, setFilteredRiders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     // Fetch riders from the backend
//     const fetchRiders = async () => {
//       try {
//         const response = await axios.get('https://your-api-endpoint.com/api/riders'); // Replace with your API endpoint
//         setRiders(response.data);
//         setFilteredRiders(response.data);
//       } catch (error) {
//         console.error('Error fetching riders:', error);
//       }
//     };

//     fetchRiders();
//   }, []);

//   useEffect(() => {
//     // Filter riders based on search term
//     const results = riders.filter((rider) =>
//       rider.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredRiders(results);
//     setCurrentPage(1); // Reset to the first page whenever the search term changes
//   }, [searchTerm, riders]);

//   const handleStatusChange = async (riderId, newStatus) => {
//     try {
//       await axios.put(`https://your-api-endpoint.com/api/riders/${riderId}/status`, { status: newStatus });
//       setRiders(prev =>
//         prev.map(rider => (rider._id === riderId ? { ...rider, status: newStatus } : rider))
//       );
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const handleEdit = (rider) => {
//     setNewRider({ name: rider.name, phone: rider.phone, email: rider.email });
//     setIsOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Make sure to use the correct _id parameter for deletion
//       await axios.delete(`https://your-api-endpoint.com/api/riders/${id}`); // Replace with your actual API endpoint
//       // Update the riders state to remove the deleted rider
//       setRiders(riders.filter(rider => rider._id !== id));
//       setFilteredRiders(filteredRiders.filter(rider => rider._id !== id)); // Update filtered riders too
//     } catch (error) {
//       console.error('Error deleting rider:', error);
//     }
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(filteredRiders.length / itemsPerPage);
//   const currentRiders = filteredRiders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container">
//       <div className="content-area">
//         <h4 className="heading text-2xl font-semibold mb-4">Riders</h4>

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
//               <th className="border border-gray-300 px-4 py-2">Name</th>
//               <th className="border border-gray-300 px-4 py-2">Phone</th>
//               <th className="border border-gray-300 px-4 py-2">Email</th>
//               <th className="border border-gray-300 px-4 py-2">Total Delivery</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//               <th className="border border-gray-300 px-4 py-2">Options</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {currentRiders.map((rider, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 px-4 py-2">{rider.name}</td>
//                 <td className="border border-gray-300 px-4 py-2">{rider.phone}</td>
//                 <td className="border border-gray-300 px-4 py-2">{rider.email}</td>
//                 <td className="border border-gray-300 px-4 py-2">{rider.totalDelivery}</td>
//                 <td className="py-2 px-4 border">
//                   <select
//                     value={rider.status}
//                     onChange={(e) => handleStatusChange(rider._id, e.target.value)}
//                     className="border bg-sky-300 text-white rounded px-2 py-1"
//                     style={{
//                       backgroundColor: rider.status === "active" ? "#1e7e34" : "#bd2130",
//                       color: "white", // Text color for visibility
//                     }}
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
//                   <button
//                     onClick={() => handleEdit(rider)}
//                     className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
//                     <EditOutlined className="h-5 w-5 mr-1" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(rider._id)}
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
//             <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredRiders.length)} of ${filteredRiders.length} entries`}</span>
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

// export default RidersList;




import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const RidersList = () => {
  const [riders, setRiders] = useState([]);
  const [filteredRiders, setFilteredRiders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Replace this with static demo data
    const demoRiders = [
      { _id: '1', name: 'John Doe', phone: '1234567890', email: 'john@example.com', totalDelivery: 10, status: 'active' },
      { _id: '2', name: 'Jane Smith', phone: '2345678901', email: 'jane@example.com', totalDelivery: 5, status: 'inactive' },
      { _id: '3', name: 'Michael Johnson', phone: '3456789012', email: 'michael@example.com', totalDelivery: 7, status: 'active' },
      { _id: '4', name: 'Emily Davis', phone: '4567890123', email: 'emily@example.com', totalDelivery: 12, status: 'inactive' },
      { _id: '5', name: 'David Wilson', phone: '5678901234', email: 'david@example.com', totalDelivery: 15, status: 'active' },
      { _id: '6', name: 'Sarah Brown', phone: '6789012345', email: 'sarah@example.com', totalDelivery: 8, status: 'inactive' },
      { _id: '7', name: 'James Taylor', phone: '7890123456', email: 'james@example.com', totalDelivery: 20, status: 'active' },
      { _id: '8', name: 'Jessica Lee', phone: '8901234567', email: 'jessica@example.com', totalDelivery: 3, status: 'inactive' },
    ];
    
    setRiders(demoRiders);
    setFilteredRiders(demoRiders);
  }, []);

  useEffect(() => {
    // Filter riders based on search term
    const results = riders.filter((rider) =>
      rider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRiders(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, riders]);

  const handleStatusChange = async (riderId, newStatus) => {
    // Simulate status change logic here
    setRiders(prev =>
      prev.map(rider => (rider._id === riderId ? { ...rider, status: newStatus } : rider))
    );
  };

  const handleEdit = (rider) => {
    alert(`Edit rider: ${rider.name}`);
  };

  const handleDelete = async (id) => {
    // Simulate deletion logic here
    setRiders(riders.filter(rider => rider._id !== id));
    setFilteredRiders(filteredRiders.filter(rider => rider._id !== id));
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRiders.length / itemsPerPage);
  const currentRiders = filteredRiders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Riders</h4>

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
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Total Delivery</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentRiders.map((rider, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{rider.name}</td>
                <td className="border border-gray-300 px-4 py-2">{rider.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{rider.email}</td>
                <td className="border border-gray-300 px-4 py-2">{rider.totalDelivery}</td>
                <td className="py-2 px-4 border">
                  <select
                    value={rider.status}
                    onChange={(e) => handleStatusChange(rider._id, e.target.value)}
                    className="border bg-sky-300 text-white rounded px-2 py-1"
                    style={{
                      backgroundColor: rider.status === "active" ? "#1e7e34" : "#bd2130",
                      color: "white", // Text color for visibility
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(rider)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
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
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredRiders.length)} of ${filteredRiders.length} entries`}</span>
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

export default RidersList;
