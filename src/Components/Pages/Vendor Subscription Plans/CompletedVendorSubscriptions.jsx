import React, { useState } from 'react';

const CompletedVendorSubscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Sample data for completed vendor subscriptions
  const subscriptions = [
    {
      vendorName: 'User',
      plan: 'Basic',
      method: 'Free',
      transactionId: 'Free',
      purchaseTime: '1 month ago',
      details: {
        customerId: 13,
        name: 'Vendor',
        email: 'vendor@gmail.com',
        phone: '3453453345453411',
        fax: '23123121',
        zip: '1234',
        vendorPhone: '43543534',
        vendorShopAddress: 'Space Needle 400 Broad St, Seattle',
        vendorRegistrationNumber: 'asdasd',
        vendorMessage: 'sdf',
        subscriptionPlan: 'Basic',
        currencyCode: 'USD',
        cost: '0$',
        duration: '30 Days',
        method: 'Free',
      },
    },
    {
      vendorName: 'Sopoline Winters',
      plan: 'Basic',
      method: 'Free',
      transactionId: 'Free',
      purchaseTime: '1 month ago',
      details: {
        customerId: 14,
        name: 'Vendor',
        email: 'vendor2@gmail.com',
        phone: '3453453345453411',
        fax: '23123121',
        zip: '1234',
        vendorPhone: '43543534',
        vendorShopAddress: 'Space Needle 400 Broad St, Seattle',
        vendorRegistrationNumber: 'asdasd',
        vendorMessage: 'sdf',
        subscriptionPlan: 'Basic',
        currencyCode: 'USD',
        cost: '0$',
        duration: '30 Days',
        method: 'Free',
      },
    },
    {
      vendorName: 'Sopoline Winters',
      plan: 'Unlimited',
      method: 'Paypal',
      transactionId: '1EF267754X530482W',
      purchaseTime: '1 year ago',
      details: {
        customerId: 15,
        name: 'Vendor',
        email: 'vendor3@gmail.com',
        phone: '3453453345453411',
        fax: '23123121',
        zip: '1234',
        vendorPhone: '43543534',
        vendorShopAddress: 'Space Needle 400 Broad St, Seattle',
        vendorRegistrationNumber: 'asdasd',
        vendorMessage: 'sdf',
        subscriptionPlan: 'Unlimited',
        currencyCode: 'USD',
        cost: '100$',
        duration: '1 Year',
        method: 'Paypal',
      },
    },
    // Add more sample data here...
  ];

  // Filter subscriptions based on search term (by vendor name)
  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (subscription) => {
    setSelectedSubscription(subscription);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSubscription(null);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Completed Vendor Subscriptions</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Vendor Name or Transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Vendor Name</th>
              <th className="border border-gray-300 px-4 py-2">Plan</th>
              <th className="border border-gray-300 px-4 py-2">Method</th>
              <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 px-4 py-2">Purchase Time</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
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
                  <button
                    onClick={() => handleViewDetails(subscription)}
                    className="text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 rounded-2xl"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Subscription Details */}
        {modalVisible && selectedSubscription && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
              <h3 className="text-2xl font-semibold mb-4">Subscription Details</h3>
              <div className="mb-4">
                <strong>Customer ID#:</strong> {selectedSubscription.details.customerId}
              </div>
              <div className="mb-4">
                <strong>Name:</strong> {selectedSubscription.details.name}
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {selectedSubscription.details.email}
              </div>
              <div className="mb-4">
                <strong>Phone:</strong> {selectedSubscription.details.phone}
              </div>
              <div className="mb-4">
                <strong>Fax:</strong> {selectedSubscription.details.fax}
              </div>
              <div className="mb-4">
                <strong>Vendor Name:</strong> {selectedSubscription.details.vendorName}
              </div>
              <div className="mb-4">
                <strong>Vendor Phone Number:</strong> {selectedSubscription.details.vendorPhone}
              </div>
              <div className="mb-4">
                <strong>Vendor Shop Address:</strong> {selectedSubscription.details.vendorShopAddress}
              </div>
              <div className="mb-4">
                <strong>Vendor Registration Number:</strong> {selectedSubscription.details.vendorRegistrationNumber}
              </div>
              <div className="mb-4">
                <strong>Vendor Message:</strong> {selectedSubscription.details.vendorMessage}
              </div>
              <div className="mb-4">
                <strong>Subscription Plan:</strong> {selectedSubscription.details.subscriptionPlan}
              </div>
              <div className="mb-4">
                <strong>Currency Code:</strong> {selectedSubscription.details.currencyCode}
              </div>
              <div className="mb-4">
                <strong>Cost:</strong> {selectedSubscription.details.cost}
              </div>
              <div className="mb-4">
                <strong>Duration:</strong> {selectedSubscription.details.duration}
              </div>
              <div className="mb-4">
                <strong>Method:</strong> {selectedSubscription.details.method}
              </div>
              <div className="mb-4">
                <strong>Purchase Time:</strong> {selectedSubscription.details.purchaseTime}
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-4 text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
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

export default CompletedVendorSubscriptions;
