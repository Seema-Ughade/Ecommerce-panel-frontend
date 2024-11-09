import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-panel-backend.onrender.com/api/customers"
        );
        setCustomer(response.data.customer || {}); // Safely handle missing customer data
        setOrders(response.data.orders || []); // Set an empty array if orders are missing
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <div style={{ padding: "30px 100px 0 30px", fontFamily: "Open Sans, sans-serif", fontSize: "14px", color: "#465541", lineHeight: "1.5" }}>
      <div className="body-area">
        <div className="row">
          <div className="col-md-4">
            <div className="user-image">
              <img
                src={customer?.profileImage || "https://demo.geniusocean.com/ecommerce-king1/assets/images/1567655174profile.jpg"}
                alt="No Image"
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <a
                href="#"
                className="mybtn1 send"
                data-email={customer?.email || ""}
                data-toggle="modal"
                data-target="#vendorform"
                style={{ display: "inline-block", marginTop: "10px", padding: "10px 15px", color: "#fff", backgroundColor: "#007bff", borderRadius: "5px" }}
              >
                Send Message
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="table-responsive show-table">
              <table className="table">
                <tbody>
                  <tr>
                    <th>ID#</th>
                    <td>{customer?.id || "Loading..."}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{customer?.name || "Loading..."}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{customer?.email || "Loading..."}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{customer?.phone || "Loading..."}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{customer?.address || "Loading..."}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4">
            <div className="table-responsive show-table">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Joined</th>
                    <td>{customer?.joined || "Loading..."}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="order-table-wrap">
        <div className="order-details-table">
          <h4 className="title" style={{ color: "#343a40", marginTop: "20px" }}>Products Ordered</h4>
          <div className="table-responsive">
            <table className="table table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Purchase Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.purchaseDate}</td>
                      <td>{order.amount}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
