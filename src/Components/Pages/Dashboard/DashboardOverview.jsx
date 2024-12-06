import React from "react";

const DashboardOverview = () => {
  const recentOrders = [
    { orderNumber: "Yaxp1733298601", orderDate: "2024-12-04", detailsUrl: "#" },
    { orderNumber: "WEp61732720066", orderDate: "2024-11-27", detailsUrl: "#" },
    { orderNumber: "xSzy1732708089", orderDate: "2024-11-27", detailsUrl: "#" },
    { orderNumber: "7Wa81731321309", orderDate: "2024-11-11", detailsUrl: "#" },
    { orderNumber: "f7tV1730088313", orderDate: "2024-10-28", detailsUrl: "#" },
  ];

  const recentCustomers = [
    { email: "jerald.spares.au@phinmaed.com", joined: "2024-12-01 02:26:33", detailsUrl: "#" },
    { email: "utest@gmail.com", joined: "2024-11-02 15:02:25", detailsUrl: "#" },
    { email: "stevrodriguez23673@gmail.com", joined: "2024-11-01 17:51:19", detailsUrl: "#" },
    { email: "examplefull56@gmail.com", joined: "2024-10-23 19:35:30", detailsUrl: "#" },
    { email: "dev6.silverlights@gmail.com", joined: "2024-10-17 10:20:29", detailsUrl: "#" },
  ];

  return (
    <div className="flex flex-wrap -mx-4 mt-8">
      {/* Recent Orders */}
      <div className="w-full lg:w-1/2 px-4 mb-6">
        <div className="card shadow-lg rounded-lg overflow-hidden">
          <h5 className="bg-teal-400 text-white p-4 text-lg font-semibold">Recent Order(s)</h5>
          <div className="p-4">
            <div className="table-responsive">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Order Number</th>
                    <th className="p-2">Order Date</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-2">{order.orderNumber}</td>
                      <td className="p-2">{order.orderDate}</td>
                      <td className="p-2">
                        <a
                          href={order.detailsUrl}
                          className="text-white border w-20 rounded-3xl p-1 bg-purple-600 hover:underline flex items-center"
                        >
                          <i className="fas fa-eye mr-2"></i> Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Customers */}
      <div className="w-full lg:w-1/2 px-4 mb-6">
        <div className="card shadow-lg rounded-lg overflow-hidden">
          <h5 className="bg-teal-400 text-white p-4 text-lg font-semibold">Recent Customer(s)</h5>
          <div className="p-4">
            <div className="table-responsive">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Customer Email</th>
                    <th className="p-2">Joined</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCustomers.map((customer, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-2">{customer.email}</td>
                      <td className="p-2">{customer.joined}</td>
                      <td className="p-2">
                        <a
                          href={customer.detailsUrl}
                          className="text-white border rounded-3xl p-1 bg-purple-600 hover:underline flex items-center"
                        >
                          <i className="fas fa-eye mr-2" ></i> Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
