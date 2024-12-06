import React from "react";
import { DollarOutlined, TruckOutlined, CheckCircleOutlined, ShoppingCartOutlined, UsergroupAddOutlined, FileTextOutlined } from '@ant-design/icons';

const AdminDashboardCards = () => {
  const data = [
    {
      title: "Orders Pending!",
      number: 36,
      link: "/admin/orders?status=pending",
      icon: <DollarOutlined />, // Ant Design Icon
      gradient: "bg-gradient-to-r from-blue-500 to-blue-700", // Lighter to Darker Blue
    },
    {
      title: "Orders Processing!",
      number: 0,
      link: "/admin/orders?status=processing",
      icon: <TruckOutlined />, // Ant Design Icon
      gradient: "bg-gradient-to-r from-green-500 to-green-700", // Lighter to Darker Green
    },
    {
      title: "Orders Completed!",
      number: 4,
      link: "/admin/orders?status=completed",
      icon: <CheckCircleOutlined />, // Ant Design Icon
      gradient: "bg-gradient-to-r from-cyan-500 to-cyan-700", // Lighter to Darker Cyan
    },
    {
      title: "Total Products!",
      number: 45,
      link: "/admin/products",
      icon: <ShoppingCartOutlined />, // Ant Design Icon
      gradient: "bg-gradient-to-r from-orange-500 to-orange-700", // Lighter to Darker Orange
    },
    {
      title: "Total Customers!",
      number: 11,
      link: "/admin/users",
      icon: <UsergroupAddOutlined />, // Ant Design Icon
      gradient: "bg-gradient-to-r from-purple-500 to-purple-700", // Lighter to Darker Purple
    },
    {
      title: "Total Posts!",
      number: 12,
      link: "/admin/blog",
      icon: <FileTextOutlined />, // Ant Design Icon
      gradient: "bg-gradient-to-r from-red-500 to-red-700", // Lighter to Darker Red
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-10 shadow-lg text-white transition-transform duration-300 ease-in-out transform hover:scale-105 ${item.gradient} hover:shadow-xl hover:shadow-lg`}
            style={{
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Adds shadow for a glowing effect
              textShadow: "0 0 15px rgba(255, 255, 255, 0.6)", // Glowing text shadow
            }}
          >
            <div>
              <h5 className="text-lg font-semibold mb-2">{item.title}</h5>
              <span className="text-3xl font-bold">{item.number}</span>
              <a
                href={item.link}
                className="block mt-2 text-sm border text-black p-2 w-20 rounded-2xl text-center bg-white  "
              >
                View All
              </a>
            </div>
            <div className="text-7xl ml-4">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardCards;
