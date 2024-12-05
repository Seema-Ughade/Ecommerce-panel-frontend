import React, { useState } from 'react';

const PendingVendorSubscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriptions] = useState([
    {
      vendorName: 'User',
      plan: 'Basic',
      method: 'Free',
      transactionId: 'Free',
      purchaseTime: '2 days ago',
    },
    {
      vendorName: 'Sopoline Winters',
      plan: 'Unlimited',
      method: 'Paypal',
      transactionId: '1EF267754X530482W',
      purchaseTime: '1 week ago',
    },
    {
      vendorName: 'Sopoline Winters',
      plan: 'Basic',
      method: 'Stripe',
      transactionId: 'pi_3O4yQGJlIV5dN9n70ZOHLiQb',
      purchaseTime: '1 month ago',
    },
    // Add more demo data here if needed
  ]);

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Pending Vendor Subscriptions</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Vendor Name or Transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredSubscriptions.length === 0 ? (
          <p className="text-center text-gray-500">No data available in table</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-teal-400 text-white font-mono">
                <th className="border border-gray-300 px-4 py-2">Vendor Name</th>
                <th className="border border-gray-300 px-4 py-2">Plan</th>
                <th className="border border-gray-300 px-4 py-2">Method</th>
                <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                <th className="border border-gray-300 px-4 py-2">Purchase Time</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredSubscriptions.map((subscription, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{subscription.vendorName}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.plan}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.method}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.transactionId}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.purchaseTime}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 rounded-2xl">
                      Accept
                    </button>
                    <button className="ml-2 text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded-2xl">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex justify-between">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Previous</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PendingVendorSubscriptions;
