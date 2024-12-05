import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EditOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";

const VendorSubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [newPlan, setNewPlan] = useState({
    title: "",
    cost: "",
    duration: "",
    productLimitations: "",
    details: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-panel-backend.onrender.com/api/subscription-plans"
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Failed to load subscription plans.");
      }
    };
    fetchPlans();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ecommerce-panel-backend.onrender.com/api/subscription-plans",
        newPlan
      );
      setPlans([...plans, response.data]);
      setNewPlan({
        title: "",
        cost: "",
        duration: "",
        productLimitations: "",
        details: "",
      });
      setIsModalOpen(false);
      toast.success("Subscription Plan added successfully!");
    } catch (error) {
      console.error("Error creating plan:", error);
      toast.error("Failed to add subscription plan.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://ecommerce-panel-backend.onrender.com/api/subscription-plans/${id}`
      );
      setPlans(plans.filter((plan) => plan._id !== id));
      toast.success("Subscription Plan deleted successfully!");
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error("Failed to delete subscription plan.");
    }
  };

  const handleEdit = (plan) => {
    setNewPlan({
      title: plan.title,
      cost: plan.cost,
      duration: plan.duration,
      productLimitations: plan.productLimitations,
      details: plan.details,
    });
    setEditingPlanId(plan._id);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://ecommerce-panel-backend.onrender.com/api/subscription-plans/${editingPlanId}`,
        newPlan
      );
      setPlans(
        plans.map((plan) => (plan._id === editingPlanId ? response.data : plan))
      );
      setIsModalOpen(false);
      toast.success("Subscription Plan updated successfully!");
    } catch (error) {
      console.error("Error updating plan:", error);
      toast.error("Failed to update subscription plan.");
    }
  };

  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="content-area ">
        <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">Vendor Subscription Plans</h4>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              setEditingPlanId(null);
              setNewPlan({
                title: "",
                cost: "",
                duration: "",
                productLimitations: "",
                details: "",
              });
              setIsModalOpen(true);
            }}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
          >
            + Add New Subscription Plan
          </button>
        </div>

        {/* Plans Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-teal-400 text-white font-mono">
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Cost</th>
                <th className="py-2 px-4 border">Duration (Days)</th>
                <th className="py-2 px-4 border">Product Limitations</th>
                {/* <th className="py-2 px-4 border">Details</th> */}
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white border divide-gray-200">
              {filteredPlans.map((plan) => (
                <tr key={plan._id} className="hover:bg-gray-100 text-center">
                  <td className="px-6 py-4 border">{plan.title}</td>
                  <td className="px-6 py-4 border">{plan.cost}</td>
                  <td className="px-6 py-4 border">{plan.duration}</td>
                  <td className="px-6 py-4 border">{plan.productLimitations}</td>
                  {/* <td className="px-6 py-4 border">{plan.details}</td> */}
                  <td className="py-2 flex justify-center px-4">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none"
                    >
                      <EditOutlined className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="flex items-center rounded-2xl text-white bg-red-600 hover:bg-red-700 ml-2 px-3 py-1 focus:outline-none"
                    >
                      <TrashIcon className="h-5 w-5 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Plan Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {editingPlanId ? "Edit Subscription Plan" : "Add New Subscription Plan"}
              </h2>
              <form onSubmit={editingPlanId ? handleUpdate : handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newPlan.title}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cost" className="block text-sm font-medium mb-1">Cost *</label>
                  <input
                    type="text"
                    id="cost"
                    name="cost"
                    value={newPlan.cost}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (Days) *</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={newPlan.duration}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
  <label htmlFor="productLimitations" className="block text-sm font-medium mb-1">
    Product Limitations *
  </label>
  <select
    id="productLimitations"
    name="productLimitations"
    value={newPlan.productLimitations}
    onChange={handleInputChange}
    required
    className="border rounded px-4 py-2 w-full"
  >
    <option value="">Select limitation</option>
    <option value="limited">Limited</option>
    <option value="unlimited">Unlimited</option>
  </select>
</div>
                <div className="mb-4">
                  <label htmlFor="details" className="block text-sm font-medium mb-1">Details *</label>
                  <textarea
                    id="details"
                    name="details"
                    value={newPlan.details}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-4 py-2 w-full"
                  ></textarea>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 mr-2  border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded"
                  >
                    {editingPlanId ? "Update Plan" : "Add Plan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default VendorSubscriptionPlans;
