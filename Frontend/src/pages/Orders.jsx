import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div className="card mb-4 shadow" key={order._id}>
            <div className="card-body">

              <h5>
                Order ID :
                <span className="text-primary">
                  {" "}
                  {order._id}
                </span>
              </h5>

              <p>
                <strong>Total Amount :</strong> ₹
                {order.totalAmount}
              </p>

              <p>
                <strong>Payment :</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Payment Status :</strong>{" "}
                {order.paymentStatus}
              </p>

              <p>
                <strong>Order Status :</strong>{" "}
                {order.orderStatus}
              </p>

              <p>
                <strong>Shipping Address :</strong>{" "}
                {order.shippingAddress}
              </p>

              <p>
                <strong>Date :</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <hr />

              <h5>Products</h5>

              {order.products.map((item, index) => (
                <div
                  className="border rounded p-3 mb-2"
                  key={index}
                >
                  <p>
                    <strong>Product :</strong>{" "}
                    {item.product?.name || "Product Deleted"}
                  </p>

                  <p>
                    <strong>Price :</strong> ₹
                    {item.product?.price || 0}
                  </p>

                  <p>
                    <strong>Quantity :</strong>{" "}
                    {item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;