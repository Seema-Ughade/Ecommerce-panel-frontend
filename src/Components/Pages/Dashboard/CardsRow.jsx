import React from "react";

const CardsRow = () => {
  const cardsData = [
    {
      count: 1,
      title: "New Customers",
      description: "Last 30 Days",
      bgClass: "border-blue-500",
    },
    {
      count: 11,
      title: "Total Customers",
      description: "All Time",
      bgClass: "border-green-500",
    },
    {
      count: 0,
      title: "Total Sales",
      description: "Last 30 Days",
      bgClass: "border-orange-500",
    },
    {
      count: 4,
      title: "Total Sales",
      description: "All Time",
      bgClass: "border-purple-500",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-4 mt-8">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6"
        >
          <div className="card shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-center p-6">
              <div className="relative">
                {/* Outer Border */}
                <div
                  className={`absolute inset-0 w-36 h-36 rounded-full border-8 ${card.bgClass} m-auto`}
                ></div>
                {/* Inner Circle */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center bg-white text-black border border-gray-200"
                >
                  <p className="text-2xl font-bold">{card.count}</p>
                </div>
              </div>
            </div>
            <div className="p-4 text-center">
              <h6 className="text-lg font-semibold mb-1">{card.title}</h6>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsRow;
