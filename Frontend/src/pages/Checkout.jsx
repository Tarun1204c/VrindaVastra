import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shippingAddress, setShippingAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ================= COD ===================

  const placeCODOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const products = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      await api.post(
        "/orders",
        {
          products,
          totalAmount,
          shippingAddress,
          paymentMethod: "COD",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Placed Successfully");

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  // ================= Razorpay ===================

  const razorpayPayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.post(
        "/payment/create-order",
        {
          amount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "VrindaVastra",

        description: "Cotton Textile Store",

        handler: async function (response) {
          try {
            const products = cart.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
            }));

            await api.post(
              "/orders",
              {
                products,
                totalAmount,
                shippingAddress,
                paymentMethod: "Razorpay",

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_signature:
                  response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("Payment Successful");

            navigate("/orders");
          } catch (error) {
            console.log(error);
          }
        },

        theme: {
          color: "#198754",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    if (!shippingAddress) {
      return alert("Please Enter Shipping Address");
    }

    if (paymentMethod === "COD") {
      placeCODOrder();
    } else {
      razorpayPayment();
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">

      <div className="row">

        <div className="col-lg-8">

          <div className="card shadow p-4">

            <h2 className="mb-4">
              Checkout
            </h2>

            <div className="mb-3">

              <label className="form-label">
                Shipping Address
              </label>

              <textarea
                className="form-control"
                rows="4"
                value={shippingAddress}
                onChange={(e) =>
                  setShippingAddress(e.target.value)
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Payment Method
              </label>

              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              >
                <option value="COD">
                  Cash On Delivery
                </option>

                <option value="Razorpay">
                  Razorpay
                </option>

              </select>

            </div>

          </div>

        </div>

        <div className="col-lg-4">

          <div className="card shadow p-4">

            <h3>
              Order Summary
            </h3>

            <hr />

            {cart.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>

                <span>
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <h4 className="text-success">
              Total ₹{totalAmount}
            </h4>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleCheckout}
            >
              {paymentMethod === "COD"
                ? "Place Order"
                : "Pay with Razorpay"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}